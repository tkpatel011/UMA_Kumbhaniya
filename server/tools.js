/**
 * UMA Kumbhaniya — Closed-Domain Restaurant Tools
 * Executes verified database queries against data/restaurant_db.json
 */

const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/restaurant_db.json');

function getDB() {
  try {
    const raw = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading restaurant_db.json:', err);
    return { restaurant: {}, menu: [], faqs: [], website_content: [] };
  }
}

/**
 * 1. search_menu
 * Search the official restaurant menu with exact database filtering
 */
function search_menu({ query, category, max_price, min_price, vegetarian, spicy } = {}) {
  const db = getDB();
  let results = [...db.menu];

  if (category) {
    const catLower = category.toLowerCase().trim();
    results = results.filter(item => 
      item.category.toLowerCase().includes(catLower) || 
      item.category_key.toLowerCase().includes(catLower)
    );
  }

  if (typeof max_price === 'number') {
    results = results.filter(item => item.price <= max_price);
  }

  if (typeof min_price === 'number') {
    results = results.filter(item => item.price >= min_price);
  }

  if (typeof vegetarian === 'boolean') {
    results = results.filter(item => item.vegetarian === vegetarian);
  }

  if (typeof spicy === 'boolean') {
    results = results.filter(item => item.spicy === spicy);
  }

  if (query) {
    const q = query.toLowerCase().trim();
    results = results.filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.english_name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }

  return {
    count: results.length,
    items: results.map(item => ({
      id: item.id,
      name: item.name,
      english_name: item.english_name,
      category: item.category,
      price: item.price,
      price_display: item.price_display,
      portion: item.portion,
      description: item.description
    }))
  };
}

/**
 * 2. get_menu_item
 * Retrieve exact information for one menu item by id or exact name
 */
function get_menu_item({ item_id } = {}) {
  if (!item_id) return { error: 'Missing item_id parameter' };
  const db = getDB();
  const target = item_id.toLowerCase().trim();
  const item = db.menu.find(m => 
    m.id.toLowerCase() === target || 
    m.name.toLowerCase() === target || 
    m.english_name.toLowerCase() === target
  );

  if (!item) {
    return { found: false, message: 'Item not found in official menu' };
  }

  return {
    found: true,
    item: {
      id: item.id,
      name: item.name,
      english_name: item.english_name,
      category: item.category,
      price: item.price,
      price_display: item.price_display,
      portion: item.portion,
      description: item.description,
      vegetarian: item.vegetarian,
      spicy: item.spicy
    }
  };
}

/**
 * 3. get_restaurant_info
 * Retrieve official restaurant information
 */
function get_restaurant_info() {
  const db = getDB();
  const r = db.restaurant;
  return {
    name: r.name,
    tagline: r.tagline,
    cuisine: r.cuisine,
    address: r.address,
    city: r.city,
    state: r.state,
    country: r.country,
    phone: r.phone,
    rating: `${r.rating} / ${r.max_rating} (${r.rating_source})`,
    opening_hours: r.opening_hours.display_text,
    policies: r.policies
  };
}

/**
 * 4. get_opening_hours
 * Return the official opening hours
 */
function get_opening_hours() {
  const db = getDB();
  return {
    restaurant_name: db.restaurant.name,
    days: db.restaurant.opening_hours.days,
    display_text: db.restaurant.opening_hours.display_text,
    open_time: db.restaurant.opening_hours.open_time_ist,
    close_time: db.restaurant.opening_hours.close_time_ist,
    note: db.restaurant.opening_hours.note
  };
}

/**
 * 5. get_contact_info
 * Return official phone, address, and maps links
 */
function get_contact_info() {
  const db = getDB();
  const r = db.restaurant;
  return {
    name: r.name,
    phone: r.phone,
    address: r.address,
    city: r.city,
    state: r.state,
    maps_url: r.maps_url,
    reviews_url: r.review_url,
    ordering_note: 'Call +91 90991 28700 directly for takeaway orders and quick enquiries.'
  };
}

/**
 * 6. search_faq
 * Search official restaurant FAQs
 */
function search_faq({ query } = {}) {
  const db = getDB();
  if (!query) return { faqs: db.faqs };

  const q = query.toLowerCase().trim();
  const matched = db.faqs.filter(f => 
    f.question.toLowerCase().includes(q) || 
    f.answer.toLowerCase().includes(q)
  );

  return {
    count: matched.length,
    faqs: matched
  };
}

/**
 * 7. search_website_content
 * Search official restaurant website textual content
 */
function search_website_content({ query } = {}) {
  const db = getDB();
  if (!query) return { content: db.website_content };

  const q = query.toLowerCase().trim();
  const matched = db.website_content.filter(c => 
    c.topic.toLowerCase().includes(q) || 
    c.content.toLowerCase().includes(q)
  );

  return {
    count: matched.length,
    content: matched.length > 0 ? matched : db.website_content
  };
}

/**
 * Tool definitions formatted for OpenAI / Groq tool calling schemas
 */
const TOOLS_DEFINITIONS = [
  {
    type: 'function',
    function: {
      name: 'search_menu',
      description: 'Search official UMA Kumbhaniya menu items by category, keyword, price filters, or dietary attributes.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keyword to search in dish names or descriptions (e.g. "Kumbhaniya", "Malai", "Chaas")' },
          category: { type: 'string', description: 'Category filter: "ભજીયા" (bhajiya/snacks), "Ice Cream", or "Drinks"' },
          max_price: { type: 'number', description: 'Maximum price limit in INR (e.g. 50, 100)' },
          min_price: { type: 'number', description: 'Minimum price limit in INR' },
          vegetarian: { type: 'boolean', description: 'Whether the item is vegetarian (all items are true)' },
          spicy: { type: 'boolean', description: 'Filter for spicy dishes' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_menu_item',
      description: 'Retrieve exact information for a specific single menu item by ID or name.',
      parameters: {
        type: 'object',
        properties: {
          item_id: { type: 'string', description: 'Dish ID (e.g. "dish_1") or dish name (e.g. "કુંભણીયા", "Special Gotalo")' }
        },
        required: ['item_id']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_restaurant_info',
      description: 'Retrieve official general restaurant info, policies, rating, and address.',
      parameters: { type: 'object', properties: {} }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_opening_hours',
      description: 'Retrieve verified opening and closing hours for UMA Kumbhaniya.',
      parameters: { type: 'object', properties: {} }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_contact_info',
      description: 'Retrieve official phone number, location, and takeaway ordering contact details.',
      parameters: { type: 'object', properties: {} }
    }
  },
  {
    type: 'function',
    function: {
      name: 'search_faq',
      description: 'Search official restaurant FAQs for policies, takeaway process, and preparation.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Question or topic keyword' }
        }
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'search_website_content',
      description: 'Retrieve textual information from the official website about the heritage, ingredients, and story.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search term for website content' }
        }
      }
    }
  }
];

function executeTool(name, args = {}) {
  switch (name) {
    case 'search_menu': return search_menu(args);
    case 'get_menu_item': return get_menu_item(args);
    case 'get_restaurant_info': return get_restaurant_info();
    case 'get_opening_hours': return get_opening_hours();
    case 'get_contact_info': return get_contact_info();
    case 'search_faq': return search_faq(args);
    case 'search_website_content': return search_website_content(args);
    default: return { error: `Tool ${name} not found` };
  }
}

module.exports = {
  getDB,
  search_menu,
  get_menu_item,
  get_restaurant_info,
  get_opening_hours,
  get_contact_info,
  search_faq,
  search_website_content,
  executeTool,
  TOOLS_DEFINITIONS
};
