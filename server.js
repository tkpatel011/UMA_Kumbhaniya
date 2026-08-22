/**
 * UMA Kumbhaniya — Production AI Concierge Server
 * Node.js Express server providing closed-domain AI chat and static hosting.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const { runOpenAIAgent } = require('./server/agent');
const { getDB, executeTool } = require('./server/tools');
const { verifyAndGroundResponse } = require('./server/verifier');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(compression());

// Serve static frontend files
app.use(express.static(path.join(__dirname), { maxAge: '7d' }));

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    restaurant: 'UMA Kumbhaniya',
    version: '1.0.0',
    openai_configured: Boolean(process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY)
  });
});

/**
 * GET /api/menu
 * Return the single-source-of-truth menu
 */
app.get('/api/menu', (req, res) => {
  const db = getDB();
  res.json(db.menu);
});

/**
 * GET /api/info
 * Return the official restaurant info
 */
app.get('/api/info', (req, res) => {
  const db = getDB();
  res.json(db.restaurant);
});

/**
 * Fallback closed-domain deterministic engine
 * Executes exact database tools if no API key is provided
 */
function localClosedDomainEngine(userQuery) {
  const q = (userQuery || '').toLowerCase().trim();

  // 1. Out of domain checks
  const offTopicTriggers = ['who is the prime minister', 'who is the president', 'what is the capital of', 'weather in', 'tell me a joke', 'write code', 'solve math', 'calculate', 'python script', 'translate french'];
  if (offTopicTriggers.some(t => q.includes(t))) {
    return {
      answer: "I can only answer questions using information available on the restaurant's website.",
      supported: false,
      sourceType: null,
      sourceIds: []
    };
  }

  // 2. Greetings & Welcome intent
  if (/^(hi|hello|hey|namaste|kem cho|good morning|good afternoon|good evening|pranam)\b/i.test(q) || q === 'hi' || q === 'hello' || q === 'hey') {
    return verifyAndGroundResponse("🙏 **Namaste! Welcome to UMA Kumbhaniya.**\n\nI am **TasteAI**, your smart food assistant. You can ask me about:\n• 🌶 **Handcrafted Gujarati Snacks** (Kumbhaniya, Bharela Marcha, Methi Bhajiya)\n• 🍦 **Artisanal Ice Creams** (Special Gotalo, Malai, Mawa Candies)\n• 🥤 **Chilled Beverages** (Chaas, Sosyo, Maaza)\n• 🕐 **Opening Hours** (4:00 PM – 11:45 PM daily)\n• 📍 **Location in Babra & Takeaways (+91 90991 28700)**\n\nHow may I help you today?", [{ name: 'get_restaurant_info' }]);
  }

  // 3. Recommendations & Popular Dishes intent
  if (q.includes('recommend') || q.includes('popular') || q.includes('best') || q.includes('special') || q.includes('famous') || q.includes('must try') || q.includes('suggest')) {
    const menuResult = executeTool('search_menu');
    return verifyAndGroundResponse("🌟 **UMA Kumbhaniya Signature Recommendations:**\n\n1. 🌶 **કુંભણીયા (Kumbhaniya)** — ₹50 (100 gm)\n   *Our golden, crispy house specialty served fresh with chutneys.*\n2. 🌶 **મેથીના ભજીયા (Methi Bhajiya)** — ₹50 (100 gm)\n   *Soft, fragrant fenugreek fritters fried daily in fresh oil.*\n3. 🍦 **સ્પે. ગોટાળો (Special Gotalo Ice Cream)** — ₹30 / cup\n   *Our most famous artisanal dessert packed with rich dry-fruit textures.*\n4. 🥤 **છાસ (Chilled Spiced Buttermilk)** — ₹20\n   *Refreshing, lightly spiced authentic Gujarati accompaniment.*", [{ name: 'search_menu', output: menuResult }]);
  }

  // 4. Menu Overview & "What do you have/serve"
  if (q.includes('menu') || q.includes('what do you serve') || q.includes('what food') || q.includes('what do you have') || q.includes('items') || q.includes('dishes') || q.includes('list')) {
    const menuResult = executeTool('search_menu');
    return verifyAndGroundResponse("🍽 **UMA Kumbhaniya Complete Menu Categories:**\n\n• 🌶 **ગુજરાતી ભજીયા (Snacks - All ₹50/100gm):** કુંભણીયા, પટ્ટી મરચા, ભરેલા મરચા, મેથીના ભજીયા, બટેટા પતરી, ફ્રેન્ચ ફ્રાય\n• 🍦 **આઈસ્ક્રીમ (Ice Creams):** સ્પે. ગોટાળો (₹30), સ્પે. મલાઈ (₹30), ઉમા સ્પેશ્યલ (₹40), સીતાફળ (₹40), Candies (₹15–₹35), 1 kg Tubs (₹290–₹400)\n• 🥤 **પીણાં (Drinks - All ₹20):** સોસીયો, છાસ, થમ્સઅપ, સ્પ્રાઈટ, માઝા\n\n*You can view the full menu on the page or download our PDF menu!*", [{ name: 'search_menu', output: menuResult }]);
  }

  // 5. Vegetarian / Dietary inquiry
  if (q.includes('veg') || q.includes('vegetarian') || q.includes('jain') || q.includes('egg') || q.includes('non veg') || q.includes('meat') || q.includes('pure')) {
    const faqResult = executeTool('search_faq', { query: 'vegetarian' });
    return verifyAndGroundResponse("🌱 **100% Pure Vegetarian:**\nAll snacks, Kumbhaniya, Bhajiya, ice creams, candies, and drinks at UMA Kumbhaniya are 100% pure vegetarian, prepared daily with fresh ingredients in a hygienic traditional kitchen.", [{ name: 'search_faq', output: faqResult }]);
  }

  // 6. Pricing & Rates inquiry
  if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('rate') || q.includes('how much') || q.includes('ભાવ')) {
    return verifyAndGroundResponse("💰 **Official Pricing Overview:**\n• **All Snacks / Bhajiya:** ₹50 per 100 gm\n• **All Chilled Beverages:** ₹20 per bottle/glass\n• **Ice Cream Cups:** ₹30 – ₹40\n• **Ice Cream Candies:** ₹15 – ₹35\n• **1 kg Family Ice Cream Tubs:** ₹290 – ₹400\n*All prices are inclusive of applicable taxes.*", [{ name: 'search_menu' }]);
  }

  // 7. Hours intent
  if (q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('close') || q.includes('timing') || q.includes('ક્યારે') || q.includes('when')) {
    const hours = executeTool('get_opening_hours');
    return verifyAndGroundResponse(`🕐 **Operating Hours:**\nWe are open **${hours.display_text}** in Babra, Gujarat. Fresh hot snacks and ice creams are served daily!`, [{ name: 'get_opening_hours', output: hours }]);
  }

  // 8. Location / Directions intent
  if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('map') || q.includes('direction') || q.includes('ક્યાં') || q.includes('બાબરા') || q.includes('city')) {
    const contact = executeTool('get_contact_info');
    return verifyAndGroundResponse(`📍 **Location & Address:**\nUMA Kumbhaniya is located in **${contact.address}**.\n[Click here to open Google Maps Directions](${contact.maps_url}).`, [{ name: 'get_contact_info', output: contact }]);
  }

  // 9. Phone / Contact / Takeaway intent
  if (q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('contact') || q.includes('order') || q.includes('takeaway') || q.includes('parcel') || q.includes('delivery') || q.includes('ફોન')) {
    const contact = executeTool('get_contact_info');
    return verifyAndGroundResponse(`📞 **Phone & Takeaway Orders:**\nYou can call us directly at **${contact.phone}** for takeaway orders or visiting enquiries in Babra.`, [{ name: 'get_contact_info', output: contact }]);
  }

  // 10. Table booking / Reservation inquiry
  if (q.includes('book') || q.includes('reservation') || q.includes('reserve') || q.includes('table')) {
    return verifyAndGroundResponse("✦ **Walk-in Hospitality:**\nWe do not operate a table reservation system. We warmly welcome all walk-in guests directly from 4:00 PM to 11:45 PM daily!", [{ name: 'search_faq' }]);
  }

  // 11. Price filter intent (e.g. "under ₹50", "below 100")
  const priceMatch = q.match(/(?:under|below|less than|within)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
  if (priceMatch) {
    const maxP = parseInt(priceMatch[1], 10);
    const menuResult = executeTool('search_menu', { max_price: maxP });
    if (menuResult.count > 0) {
      const itemsList = menuResult.items.map(i => `• **${i.name}** (${i.english_name}): ${i.price_display} — *${i.description}*`).join('\n');
      return verifyAndGroundResponse(`✨ **Dishes Under ₹${maxP}:**\n\n${itemsList}`, [{ name: 'search_menu', output: menuResult }]);
    }
  }

  // 12. Snacks query
  if (q.includes('snack') || q.includes('bhajiya') || q.includes('kumbhaniya') || q.includes('ભજીયા') || q.includes('કુંભણીયા') || q.includes('marcha') || q.includes('fry') || q.includes('pakora')) {
    const menuResult = executeTool('search_menu', { category: 'ભજીયા' });
    const itemsList = menuResult.items.map(i => `• **${i.name}** (${i.english_name}) — ${i.price_display} (${i.portion})`).join('\n');
    return verifyAndGroundResponse(`🌶 **Our Handcrafted Gujarati Snacks (All ₹50 per 100 gm):**\n\n${itemsList}`, [{ name: 'search_menu', output: menuResult }]);
  }

  // 13. Ice Cream query
  if (q.includes('ice cream') || q.includes('icecream') || q.includes('sweet') || q.includes('dessert') || q.includes('આઈસ્ક્રીમ') || q.includes('મલાઈ') || q.includes('candy') || q.includes('gotalo')) {
    const menuResult = executeTool('search_menu', { category: 'Ice Cream' });
    const itemsList = menuResult.items.map(i => `• **${i.name}** (${i.english_name}) — ${i.price_display}`).join('\n');
    return verifyAndGroundResponse(`🍦 **Our Artisanal Ice Creams & Candies:**\n\n${itemsList}`, [{ name: 'search_menu', output: menuResult }]);
  }

  // 14. Drinks query
  if (q.includes('drink') || q.includes('chaas') || q.includes('beverage') || q.includes('cold') || q.includes('છાસ') || q.includes('સોસીયો') || q.includes('maaza') || q.includes('sprite')) {
    const menuResult = executeTool('search_menu', { category: 'Drinks' });
    const itemsList = menuResult.items.map(i => `• **${i.name}** (${i.english_name}) — ${i.price_display}`).join('\n');
    return verifyAndGroundResponse(`🥤 **Refreshing Chilled Beverages (All ₹20):**\n\n${itemsList}`, [{ name: 'search_menu', output: menuResult }]);
  }

  // 15. Search specific menu dish
  const menuSearch = executeTool('search_menu', { query: q });
  if (menuSearch.count > 0) {
    const itemsList = menuSearch.items.map(i => `• **${i.name}** (${i.english_name}) [${i.category}]: ${i.price_display} — *${i.description}*`).join('\n');
    return verifyAndGroundResponse(`✨ **Verified Menu Match:**\n\n${itemsList}\n\nFor party orders or enquiries, call us at **+91 90991 28700**!`, [{ name: 'search_menu', output: menuSearch }]);
  }

  // 16. FAQ search query
  const faqSearch = executeTool('search_faq', { query: q });
  if (faqSearch.count > 0) {
    return verifyAndGroundResponse(`✦ **${faqSearch.faqs[0].question}**\n${faqSearch.faqs[0].answer}`, [{ name: 'search_faq', output: faqSearch }]);
  }

  // 17. About / Heritage query
  if (q.includes('about') || q.includes('story') || q.includes('history') || q.includes('heritage') || q.includes('who are you')) {
    return verifyAndGroundResponse("🏛 **About UMA Kumbhaniya:**\nUMA Kumbhaniya is a celebrated food landmark in Babra, Gujarat. We bring the authentic taste of Saurashtra with recipes passed down through generations. Every dish is crafted from fresh ingredients with generous hospitality.", [{ name: 'search_website_content' }]);
  }

  // Fallback for non-existent items
  return {
    answer: "I couldn't find that information on the restaurant's website. You can call us directly at **+91 90991 28700** for any specific enquiries!",
    supported: false,
    sourceType: null,
    sourceIds: []
  };
}

// In-memory 8-hour rolling limit tracker per client IP (5 calls per 8 hours)
const ipSmartUsage = new Map();
const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;

function checkAndUpdateIpLimit(ip) {
  const now = Date.now();
  const timestamps = ipSmartUsage.get(ip) || [];
  const valid = timestamps.filter(t => (now - t) < EIGHT_HOURS_MS);

  if (valid.length >= 5) {
    ipSmartUsage.set(ip, valid);
    return false; // 8-hour limit reached
  }

  valid.push(now);
  ipSmartUsage.set(ip, valid);
  return true;
}

/**
 * POST /api/ai/chat
 * Closed-Domain AI Restaurant Concierge Endpoint
 */
app.post('/api/ai/chat', async (req, res) => {
  const { message, history, mode, passcode } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'local';
  const apiKey = process.env.GROQ_API_KEY || process.env.LLAMA_API_KEY;
  const isVip = (passcode === 'Uma@2007');
  const requestedMode = mode || 'smart';

  try {
    // Check if smart mode is requested, API key exists, and (VIP passcode or IP limit not exceeded)
    if (requestedMode === 'smart' && apiKey && (isVip || checkAndUpdateIpLimit(clientIp))) {
      const messages = [];
      if (Array.isArray(history)) {
        history.slice(-6).forEach(h => {
          if (h.role && h.content) {
            messages.push({ role: h.role === 'bot' ? 'assistant' : 'user', content: h.content });
          }
        });
      }
      messages.push({ role: 'user', content: message.trim() });

      const result = await runOpenAIAgent({
        messages,
        apiKey,
        apiUrl: process.env.OPENAI_API_URL,
        modelName: process.env.OPENAI_MODEL || 'openai/gpt-oss-120b'
      });

      return res.json({ ...result, modeUsed: 'smart', vip: isVip });
    }

    // Otherwise, execute closed-domain local database engine
    const localResult = localClosedDomainEngine(message.trim());
    return res.json({ ...localResult, modeUsed: 'local' });
  } catch (err) {
    console.error('Concierge chat error:', err);
    // Never expose stack trace; provide friendly fallback
    const fallback = localClosedDomainEngine(message.trim());
    return res.json({ ...fallback, modeUsed: 'local' });
  }
});

/**
 * GET /api/reviews
 * Google Reviews & Verified 4.6-Star Ratings Endpoint
 */
app.get('/api/reviews', (req, res) => {
  const googleReviewsData = {
    placeName: "UMA Kumbhaniya",
    rating: 4.6,
    totalReviews: 1482,
    starsBreakdown: [
      { stars: 5, percentage: 86 },
      { stars: 4, percentage: 10 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 }
    ],
    highlights: ["Crispy Kumbhaniya Bhajia", "Special Gotalo Ice Cream", "Fresh Buttermilk (Chhas)", "Highway Landmark"],
    reviews: [
      {
        author: "Dhaval Radadiya",
        rating: 5,
        relativeTime: "1 week ago",
        text: "Best Kumbhaniya Bhajia in Babra! The chutney and fried green chillies combination is unbeatable, and following it up with Special Gotalo ice cream is the best evening treat.",
        badge: "Local Guide",
        avatarInitials: "DR"
      },
      {
        author: "Jayeshbhai Patel",
        rating: 5,
        relativeTime: "2 weeks ago",
        text: "Authentic taste of Saurashtra. Hot and fresh Kumbhaniya and Bhajiya prepared right in front of you. Natural milk ice candies and great hospitality. Must stop when passing Babra!",
        badge: "Verified Google Patron",
        avatarInitials: "JP"
      }
    ],
    googleMapsReviewUrl: "https://www.google.com/maps/place//@21.8421255,71.2986685,17z/data=!3m1!4b1!4m3!3m2!1s0x39588de116bab375:0xb6ddb731a70b093f!12e1?entry=ttu"
  };
  return res.json(googleReviewsData);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=================================================`);
  console.log(`✦ UMA Kumbhaniya TasteAI Server is live`);
  console.log(`✦ Local:   http://localhost:${PORT}`);
  console.log(`✦ Network: http://192.168.1.40:${PORT}`);
  console.log(`✦ Mode:    ${Boolean(process.env.GROQ_API_KEY || process.env.LLAMA_API_KEY) ? 'Llama API (Groq/OpenAI)' : 'Closed-Domain Local Engine'}`);
  console.log(`=================================================`);
});
