/**
 * Netlify Serverless Function for UMA TasteAI Chat
 */
const { search_menu, get_contact_info } = require('../../server/tools');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const userQuery = (body.message || '').trim().toLowerCase();

    // Check grounded restaurant database first
    const menuResult = search_menu(userQuery);
    const contactInfo = get_contact_info();

    let answer = '';
    let sourceType = 'grounded';

    if (userQuery.includes('kumbhaniya') || userQuery.includes('કુંભણીયા') || userQuery.includes('bhajiya')) {
      answer = 'કુંભણીયા / ભજીયા (100 gm) is ₹50. Made fresh to order continuously!';
    } else if (userQuery.includes('hour') || userQuery.includes('time') || userQuery.includes('open') || userQuery.includes('સમય')) {
      answer = `UMA Kumbhaniya is Open All Days: ${contactInfo.hours.daily} in Babra, Gujarat.`;
    } else if (userQuery.includes('phone') || userQuery.includes('contact') || userQuery.includes('call') || userQuery.includes('નંબર')) {
      answer = `You can call us directly at ${contactInfo.phone} for takeaways or inquiries.`;
    } else if (userQuery.includes('location') || userQuery.includes('address') || query.includes('સરનામું')) {
      answer = `We are located in Babra, Gujarat, India. Tap "Get Directions" on the site for live GPS navigation!`;
    } else if (menuResult && menuResult.count > 0) {
      const itemsList = menuResult.items.map(i => `${i.name} (${i.price})`).join(', ');
      answer = `Matching dishes: ${itemsList}. All prepared fresh daily!`;
    } else {
      answer = '🙏 Welcome to UMA Kumbhaniya in Babra! We serve fresh hot Kumbhaniya, Patti Marcha, artisanal Ice Creams, and chilled drinks daily from 4:00 PM to 11:45 PM.';
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
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
