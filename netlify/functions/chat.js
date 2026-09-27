/**
 * Netlify Serverless Function for UMA TasteAI Chat
 * Supports Groq API Key & OpenAI API Key
 */

const RESTAURANT_DATA = {
  name: "UMA Kumbhaniya & Ice Cream",
  location: "Babra, Gujarat, India",
  phone: "+91 90991 28700",
  hours: "All Days: 04:00 PM – 11:45 PM",
  menu: [
    { name: "કુંભણીયા / ભજીયા (Kumbhaniya)", price: "₹50 (100 gm)", category: "bhajiya" },
    { name: "પટ્ટી મરચા (Patti Marcha)", price: "₹50 (100 gm)", category: "bhajiya" },
    { name: "ભરેલા મરચા (Bharela Marcha)", price: "₹50 (100 gm)", category: "bhajiya" },
    { name: "મેથીના ભજીયા (Methi Bhajiya)", price: "₹50 (100 gm)", category: "bhajiya" },
    { name: "બટેટા પતરી (Bateta Patri)", price: "₹50 (100 gm)", category: "bhajiya" },
    { name: "ફ્રેન્ચ ફ્રાય (French Fries)", price: "₹50 (100 gm)", category: "bhajiya" },
    { name: "સ્પે. ગોટાળો (Special Gotalo Ice Cream)", price: "₹30 cup / ₹290 1kg", category: "ice-cream" },
    { name: "સ્પે. મલાઈ (Special Malai Ice Cream)", price: "₹30 cup / ₹290 1kg", category: "ice-cream" },
    { name: "માવા બદામ (Mawa Badam Ice Cream)", price: "₹30 cup / ₹290 1kg", category: "ice-cream" },
    { name: "અમેરિકન ડ્રાયફ્રુટ (American Dryfruit)", price: "₹30 cup / ₹290 1kg", category: "ice-cream" },
    { name: "ચોકલેટ (Chocolate Ice Cream)", price: "₹30 cup / ₹290 1kg", category: "ice-cream" },
    { name: "અનેનાસ (Pineapple Ice Cream)", price: "₹30 cup / ₹290 1kg", category: "ice-cream" },
    { name: "સીતાફળ (Sitafal Ice Cream)", price: "₹30 cup / ₹290 1kg", category: "ice-cream" },
    { name: "ફ્રોસ્ટીક (Frostik)", price: "₹35", category: "ice-cream" },
    { name: "ચોકલેટ કોન (Chocolate Cone)", price: "₹35", category: "ice-cream" },
    { name: "માવા મલાઈ કેન્ડી (Mawa Malai Candy)", price: "₹20", category: "ice-cream" },
    { name: "માવા તોપરા કેન્ડી (Mawa Topra Candy)", price: "₹20", category: "ice-cream" },
    { name: "જાંબુ કેન્ડી (Jamun Candy)", price: "₹20", category: "ice-cream" },
    { name: "ઓરીયો કેન્ડી (Oreo Candy)", price: "₹20", category: "ice-cream" },
    { name: "રાસ્પબેરી કેન્ડી (Raspberry Candy)", price: "₹15", category: "ice-cream" },
    { name: "સ્ટ્રોબેરી કેન્ડી (Strawberry Candy)", price: "₹15", category: "ice-cream" },
    { name: "સોશ્યો (Sosyo)", price: "₹20", category: "drinks" },
    { name: "મસાલા છાસ (Spiced Chaas / Buttermilk)", price: "₹20", category: "drinks" },
    { name: "થમ્સ અપ (Thums Up)", price: "₹20", category: "drinks" },
    { name: "સ્પ્રાઈટ (Sprite)", price: "₹20", category: "drinks" },
    { name: "માઝા (Maaza)", price: "₹20", category: "drinks" },
    { name: "ઉમા સ્પે. ડિલક્ષ (UMA Special Deluxe Ice Cream)", price: "₹40 cup / ₹380 1kg", category: "ice-cream" }
  ]
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const userMessage = (body.message || '').trim();
    const q = userMessage.toLowerCase();
    
    // Check all possible environment variable names
    const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || process.env.AI_KEY || '';

    // 1. Try Groq API or OpenAI API call if key is present
    if (apiKey) {
      const isGroq = apiKey.startsWith('gsk_') || Boolean(process.env.GROQ_API_KEY);
      const endpoint = isGroq 
        ? 'https://api.groq.com/openai/v1/chat/completions' 
        : 'https://api.openai.com/v1/chat/completions';
      const model = isGroq 
        ? (process.env.GROQ_MODEL || 'qwen/qwen3.8-27b')
        : (process.env.OPENAI_MODEL || 'gpt-4o-mini');

      try {
        const aiRes = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: 'system',
                content: `You are TasteAI, the official smart restaurant concierge for UMA Kumbhaniya & Ice Cream in Babra, Gujarat. Ground your answers strictly in this menu and restaurant information: ${JSON.stringify(RESTAURANT_DATA)}. Keep answers warm, concise, and helpful with markdown formatting. CRITICAL: Output ONLY the final customer-facing answer directly. NEVER output internal thoughts, reasoning steps, or 'Here's a thinking process:'.`
              },
              { role: 'user', content: userMessage }
            ],
            max_tokens: 500,
            temperature: 0.3
          })
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          let aiAnswer = aiData.choices?.[0]?.message?.content || '';
          
          // Strip thinking traces and chain-of-thought blocks
          aiAnswer = aiAnswer
            .replace(/<think>[\s\S]*?<\/think>/gi, '')
            .replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '')
            .trim();

          if (aiAnswer.includes('<think>') || /^Here(?:'s| is) a thinking process/i.test(aiAnswer)) {
            const parts = aiAnswer.split(/\n\s*\n+/);
            const filtered = parts.filter(p => 
              !p.includes('<think>') && 
              !/^Here(?:'s| is) a thinking process/i.test(p.trim()) && 
              !/^\d+\.\s*\*\*(?:Analyze|Check|Extract|Synthesize|Draft|Product|Store)/i.test(p.trim()) &&
              !/^\d+\.\s*(?:Analyze|Check|Extract|Synthesize|Draft|Product|Store)/i.test(p.trim()) &&
              !/^\*\*(?:Analyze|Check|Extract|Synthesize|Draft|Product|Store)/i.test(p.trim())
            );
            aiAnswer = filtered.length > 0 ? filtered.join('\n\n').trim() : '';
          }

          if (aiAnswer) {
            return {
              statusCode: 200,
              headers: CORS_HEADERS,
              body: JSON.stringify({
                answer: aiAnswer,
                sourceType: 'smart_ai'
              })
            };
          }
        } else {
          const errText = await aiRes.text();
          console.error('AI API Error Response:', aiRes.status, errText);
        }
      } catch (aiErr) {
        console.error('AI Fetch Exception:', aiErr);
      }
    }

    // 2. Grounded Database Response
    let answer = '';
    if (q.includes('why') || q.includes('choose') || q.includes('unique') || q.includes('speciality') || q.includes('feature') || q.includes('reason') || q.includes('કેમ') || q.includes('શા માટે')) {
      answer = '🌟 **Why Food Lovers Choose UMA Kumbhaniya:**\n\n1. 🌶 **Authentic Saurashtra Heritage:** Traditional Kathiyawadi recipes passed down through generations.\n2. 🫒 **Fried Fresh to Order:** Hot golden Kumbhaniya (₹50 / 100g) & Bhajiya fried continuously in fresh oil.\n3. 🍦 **Iconic Artisanal Ice Creams:** Special Gotalo (₹30), Special Malai (₹30), and pure milk mawa candies.\n4. 🌱 **100% Pure Vegetarian:** Prepared with locally sourced produce and premium spices.\n5. ⭐ **4.6★ Google Rating (1400+ Reviews):** Celebrated food landmark in Babra, Gujarat!\n\n📍 *Visit us daily from 4:00 PM to 11:45 PM in Babra!*';
    } else if (q.includes('kumbhaniya') || q.includes('કુંભણીયા') || q.includes('bhajiya') || q.includes('ભજીયા')) {
      answer = 'કુંભણીયા / ભજીયા (100 gm) is ₹50. Made fresh to order continuously!';
    } else if (q.includes('patti') || q.includes('પટ્ટી')) {
      answer = 'પટ્ટી મરચા (100 gm) is ₹50. Spicy, crispy fried Gujarati chili bhajiya!';
    } else if (q.includes('gotalo') || q.includes('ગોટાળો')) {
      answer = 'સ્પે. ગોટાળો Ice Cream is ₹30 per cup or ₹290 per 1 kg. Very rich and popular!';
    } else if (q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('સમય')) {
      answer = `UMA Kumbhaniya is Open ${RESTAURANT_DATA.hours} in Babra, Gujarat.`;
    } else if (q.includes('phone') || q.includes('contact') || q.includes('call') || q.includes('નંબર')) {
      answer = `You can call us directly at ${RESTAURANT_DATA.phone} for takeaways or inquiries.`;
    } else if (q.includes('location') || q.includes('address') || q.includes('સરનામું')) {
      answer = `We are located in Babra, Gujarat, India. Tap "Get Directions" on the website for live GPS navigation!`;
    } else if (q.includes('price') || q.includes('cost') || q.includes('ભાવ')) {
      answer = 'Our menu starts at ₹15 for candies, ₹20 for drinks/chaas, ₹30 for artisanal ice creams, and ₹50 for fresh hot Kumbhaniya (100g)!';
    } else {
      const matches = RESTAURANT_DATA.menu.filter(item => 
        item.name.toLowerCase().includes(q) || item.category.includes(q)
      );

      if (matches.length > 0) {
        const itemNames = matches.slice(0, 3).map(i => `${i.name}: ${i.price}`).join(' | ');
        answer = `Found matching items: ${itemNames}. All made fresh daily!`;
      } else {
        answer = '🙏 Welcome to UMA Kumbhaniya in Babra! We serve fresh hot Kumbhaniya, Patti Marcha, artisanal Ice Creams, and chilled drinks daily from 4:00 PM to 11:45 PM.';
      }
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        answer,
        sourceType: 'grounded'
      })
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        answer: '🙏 Welcome to UMA Kumbhaniya in Babra! We serve fresh hot Kumbhaniya, Patti Marcha, artisanal Ice Creams, and chilled drinks daily from 4:00 PM to 11:45 PM. Call +91 90991 28700.',
        sourceType: 'fallback'
      })
    };
  }
};
