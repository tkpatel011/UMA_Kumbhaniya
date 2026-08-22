/**
 * Netlify Serverless Function for UMA TasteAI Chat
 * Self-contained for 100% reliability on Netlify Functions (No 500 errors)
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

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const q = (body.message || '').trim().toLowerCase();

    let answer = '';
    let sourceType = 'grounded';

    if (q.includes('kumbhaniya') || q.includes('કુંભણીયા') || q.includes('bhajiya') || q.includes('ભજીયા')) {
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
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        answer,
        sourceType
      })
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        answer: '🙏 Welcome to UMA Kumbhaniya in Babra! We serve fresh hot Kumbhaniya, Patti Marcha, artisanal Ice Creams, and chilled drinks daily from 4:00 PM to 11:45 PM. Call +91 90991 28700.',
        sourceType: 'fallback'
      })
    };
  }
};
