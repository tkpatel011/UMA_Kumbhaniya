/**
 * UMA Kumbhaniya — Closed-Domain AI Concierge Agent
 * Connects to Groq OpenAI-compatible endpoints with full database grounding.
 */

const { getDB } = require('./tools');
const { verifyAndGroundResponse } = require('./verifier');

function buildSystemPrompt() {
  return `You are TasteAI, the official restaurant concierge for UMA Kumbhaniya & Ice Cream in Babra, Gujarat.

OFFICIAL RESTAURANT TRUTH:
- Name: UMA Kumbhaniya
- Location: Babra, Gujarat, India
- Hours: All Days 04:00 PM – 11:45 PM IST
- Phone: +91 90991 28700 (Takeaways & Enquiries)
- Google Rating: 4.6★ (1,400+ Verified Reviews)
- Food Type: 100% Pure Vegetarian Authentic Gujarati Snacks & Artisanal Ice Creams

MENU & PRICING:
- Hot Gujarati Snacks (ALL ₹50 / 100g): કુંભણીયા (Kumbhaniya), પટ્ટી મરચા (Patti Marcha), ભરેલા મરચા (Bharela Marcha), મેથીના ભજીયા (Methi Bhajiya), બટેટા પતરી (Bateta Patri), ફ્રેન્ચ ફ્રાય (French Fries).
- Artisanal Ice Creams (₹30–₹40 cups / ₹290–₹400 1kg tubs): સ્પે. ગોટાળો (Special Gotalo ₹30), સ્પે. મલાઈ (Special Malai ₹30), ઉમા સ્પેશ્યલ (₹40), સીતાફળ (₹40), Candies (₹15–₹20).
- Chilled Beverages (ALL ₹20): મસાલા છાસ (Chaas), સોશ્યો (Sosyo), Thums Up, Sprite, Maaza.

WHY CHOOSE UMA KUMBHANIYA:
1. Generations of authentic Kathiyawadi / Saurashtra family recipes.
2. Fried piping hot fresh to order in pure oil with spicy green chutney.
3. Iconic house-special desserts (Famous Special Gotalo & Malai).
4. 100% Pure Vegetarian with local Gujarat spices.
5. Honest, affordable pricing for the whole family.

GUIDELINES:
- Output ONLY the final customer-facing answer directly with markdown formatting.
- NEVER output internal thoughts, reasoning steps, or 'Here's a thinking process:'.
- Respond in the language asked (English, Gujarati, Hindi).`;
}

function cleanThinkingTraces(text) {
  if (!text || typeof text !== 'string') return '';
  let cleaned = text;

  // 1. Remove closed tags
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '').trim();

  // 2. Strip thinking preambles and constraint checklists
  cleaned = cleaned
    .replace(/^Here(?:'s| is) a thinking process:?[\s\S]*?(?=\n\s*\n|#|\*\*)/i, '')
    .replace(/^(?:All constraints met|All points check out|Response is ready|Ready to respond)\.?\s*/i, '')
    .trim();

  // 3. If contains unclosed <think> or reasoning blocks
  if (cleaned.includes('<think>') || /^Here(?:'s| is) a thinking process/i.test(cleaned)) {
    const paragraphs = cleaned.split(/\n\s*\n+/);
    const content = paragraphs.filter(p => 
      !p.includes('<think>') && 
      !/^Here(?:'s| is) a thinking process/i.test(p.trim()) && 
      !/^\d+\.\s*\*\*(?:Analyze|Check|Extract|Synthesize|Draft|Product|Store)/i.test(p.trim()) &&
      !/^\d+\.\s*(?:Analyze|Check|Extract|Synthesize|Draft|Product|Store)/i.test(p.trim()) &&
      !/^(?:All constraints met|All points check out|Response is ready)/i.test(p.trim())
    );
    cleaned = content.length > 0 ? content.join('\n\n').trim() : '';
  }

  // Final cleanup of constraint header remnants
  cleaned = cleaned.replace(/^(?:All constraints met|All points check out|Response is ready)\.?\s*/i, '').trim();

  if (!cleaned) {
    cleaned = "🌟 **Why Food Lovers Choose UMA Kumbhaniya in Babra:**\n\n1. 🌶 **Authentic Saurashtra Heritage:** Traditional Kathiyawadi family recipes passed down through generations.\n2. 🫒 **Fried Fresh to Order:** Hot golden Kumbhaniya (₹50 / 100g) & Bhajiya fried continuously in fresh oil.\n3. 🍦 **Iconic Artisanal Ice Creams:** Famous for our rich **Special Gotalo (₹30)**, **Special Malai (₹30)**, and pure milk candies.\n4. 🌱 **100% Pure Vegetarian:** Prepared with locally sourced produce and authentic Gujarat spices.\n5. ⭐ **4.6★ Google Rating (1400+ Reviews):** Celebrated food landmark in Babra with heartfelt hospitality.\n\n📍 *Visit us in Babra daily from 4:00 PM to 11:45 PM!*";
  }

  return cleaned.trim();
}

/**
 * Executes agent turn against OpenAI or Groq model endpoint
 */
async function runOpenAIAgent({ messages, apiKey, apiUrl, modelName }) {
  const isOpenAI = Boolean(process.env.OPENAI_API_KEY && (!apiKey || apiKey === process.env.OPENAI_API_KEY));
  const defaultEndpoint = isOpenAI ? 'https://api.openai.com/v1/chat/completions' : 'https://api.groq.com/openai/v1/chat/completions';
  const defaultModel = isOpenAI ? (process.env.OPENAI_MODEL || 'gpt-4o-mini') : (process.env.GROQ_MODEL || process.env.OPENAI_MODEL || 'qwen/qwen3.8-27b');

  const endpoint = apiUrl || defaultEndpoint;
  const model = modelName || defaultModel;
  const key = apiKey || process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY;

  const systemPrompt = buildSystemPrompt();

  const conversation = [
    { role: 'system', content: systemPrompt },
    ...(messages || [])
  ];

  const payload = {
    model: model,
    messages: conversation,
    temperature: 0.2,
    max_tokens: 700
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.warn(`[TasteAI] Model API key returned status ${response.status}. Using grounded DB fallback.`);
    return {
      answer: "🙏 Welcome to UMA Kumbhaniya in Babra! We serve fresh hot કુંભણીયા / ભજીયા (₹50 / 100g), Patti Marcha, artisanal Ice Creams, and chilled beverages daily from 4:00 PM to 11:45 PM. Call us at +91 90991 28700.",
      sourceType: "grounded"
    };
  }

  const result = await response.json();
  const choice = result.choices && result.choices[0];
  if (!choice) throw new Error('Empty response from model API');

  let rawAnswer = choice.message?.content || "I couldn't find that information on the restaurant's website.";

  // Strip all thinking tokens and internal chain-of-thought traces
  rawAnswer = cleanThinkingTraces(rawAnswer);

  const lastUserMsg = messages && messages.length > 0 ? messages[messages.length - 1].content : '';
  return verifyAndGroundResponse(rawAnswer, [{ name: 'search_menu', output: { items: getDB().menu } }], lastUserMsg);
}

module.exports = {
  runOpenAIAgent,
  runLlamaAgent: runOpenAIAgent, // Backward compatibility
  buildSystemPrompt
};
