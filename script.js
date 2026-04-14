// /* ============================================================
//    UMA KUMBHANIYA – SCRIPT.JS
//    ============================================================ */

// document.addEventListener('DOMContentLoaded', () => {

//   /* ──────────────────────────────────────────
//      NAVBAR: Sticky scroll effect & active link
//   ────────────────────────────────────────── */
//   const navbar = document.getElementById('navbar');
//   const navLinks = document.querySelectorAll('.nav-link');
//   const sections = document.querySelectorAll('section[id]');

//   window.addEventListener('scroll', () => {
//     // Add scrolled shadow
//     if (window.scrollY > 50) {
//       navbar.classList.add('scrolled');
//     } else {
//       navbar.classList.remove('scrolled');
//     }

//     // Active link highlight
//     let current = '';
//     sections.forEach(sec => {
//       const sectionTop = sec.offsetTop - 90;
//       if (window.scrollY >= sectionTop) {
//         current = sec.getAttribute('id');
//       }
//     });
//     navLinks.forEach(link => {
//       link.classList.remove('active');
//       if (link.getAttribute('href') === '#' + current) {
//         link.classList.add('active');
//       }
//     });

//     // Scroll-to-top visibility
//     const scrollBtn = document.getElementById('scrollTop');
//     if (window.scrollY > 400) {
//       scrollBtn.classList.add('visible');
//     } else {
//       scrollBtn.classList.remove('visible');
//     }

//     // Reveal animations
//     revealOnScroll();
//   });

//   /* ──────────────────────────────────────────
//      HAMBURGER MENU
//   ────────────────────────────────────────── */
//   const hamburger = document.getElementById('hamburger');
//   const navMenu = document.getElementById('navLinks');

//   hamburger.addEventListener('click', () => {
//     hamburger.classList.toggle('open');
//     navMenu.classList.toggle('open');
//     document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
//   });

//   // Close on nav link click
//   navLinks.forEach(link => {
//     link.addEventListener('click', () => {
//       hamburger.classList.remove('open');
//       navMenu.classList.remove('open');
//       document.body.style.overflow = '';
//     });
//   });

//   /* ──────────────────────────────────────────
//      SMOOTH SCROLL (for older browsers)
//   ────────────────────────────────────────── */
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//       const target = document.querySelector(this.getAttribute('href'));
//       if (target) {
//         e.preventDefault();
//         const offset = 72;
//         const top = target.getBoundingClientRect().top + window.scrollY - offset;
//         window.scrollTo({ top, behavior: 'smooth' });
//       }
//     });
//   });

//   /* ──────────────────────────────────────────
//      SCROLL TO TOP
//   ────────────────────────────────────────── */
//   document.getElementById('scrollTop').addEventListener('click', () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   });

//   /* ──────────────────────────────────────────
//      MENU TABS (Category Filter)
//   ────────────────────────────────────────── */
//   const tabBtns = document.querySelectorAll('.tab-btn');
//   const menuCards = document.querySelectorAll('.menu-card');

//   tabBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//       // Active tab styling
//       tabBtns.forEach(b => b.classList.remove('active'));
//       btn.classList.add('active');

//       const cat = btn.dataset.cat;
//       menuCards.forEach(card => {
//         if (cat === 'all' || card.dataset.cat === cat) {
//           card.classList.remove('hidden');
//           // Small stagger animation
//           card.style.opacity = '0';
//           card.style.transform = 'translateY(16px)';
//           requestAnimationFrame(() => {
//             setTimeout(() => {
//               card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
//               card.style.opacity = '1';
//               card.style.transform = 'translateY(0)';
//             }, 30);
//           });
//         } else {
//           card.classList.add('hidden');
//         }
//       });
//     });
//   });

//   /* ──────────────────────────────────────────
//      FULL MENU MODAL
//   ────────────────────────────────────────── */
//   const fullMenuData = {
//     'Snacks': [
//       { name: 'Samosa (2 pcs)', desc: 'Crispy pastry filled with spiced potatoes & peas', price: '₹20' },
//       { name: 'Kachori (2 pcs)', desc: 'Deep-fried pockets filled with lentil stuffing', price: '₹20' },
//       { name: 'Bhajiya Plate', desc: 'Assorted fritters with green chutney', price: '₹30' },
//       { name: 'Dabeli', desc: 'Spiced potato filling in buttered bun with chutneys', price: '₹25' },
//       { name: 'Pani Puri (6 pcs)', desc: 'Crispy puris with tangy tamarind water', price: '₹30' },
//       { name: 'Sev Puri (4 pcs)', desc: 'Flat puris topped with chutneys and sev', price: '₹30' },
//       { name: 'Ragda Pattice', desc: 'Potato patty with white pea curry and toppings', price: '₹45' },
//       { name: 'Vada Pav', desc: 'Spiced potato dumpling in bun with dry garlic chutney', price: '₹20' },
//     ],
//     'Meals': [
//       { name: 'Gujarati Thali', desc: 'Dal, sabzi, roti, rice, kadhi, papad, pickle & more', price: '₹120' },
//       { name: 'Dal Khichdi', desc: 'Comforting rice & lentil mix served with ghee', price: '₹80' },
//       { name: 'Pav Bhaji', desc: 'Spiced vegetable mash with buttered pav', price: '₹70' },
//       { name: 'Chole Bhature', desc: 'Spiced chickpea curry with fried bread', price: '₹90' },
//       { name: 'Kadhi Chawal', desc: 'Yogurt-based curry with steamed rice', price: '₹70' },
//       { name: 'Undhiyu', desc: 'Traditional Gujarati winter vegetable medley', price: '₹100' },
//     ],
//     'Drinks': [
//       { name: 'Masala Chaas', desc: 'Spiced buttermilk with roasted cumin', price: '₹25' },
//       { name: 'Mango Lassi', desc: 'Thick yogurt mango blend with cardamom', price: '₹50' },
//       { name: 'Sugarcane Juice', desc: 'Fresh pressed with ginger & lemon', price: '₹30' },
//       { name: 'Rose Sharbat', desc: 'Chilled rose syrup drink with basil seeds', price: '₹30' },
//       { name: 'Thandai', desc: 'Spiced milk drink with nuts and saffron', price: '₹55' },
//       { name: 'Cold Coffee', desc: 'Blended with milk and ice cream', price: '₹60' },
//     ],
//     'Ice Cream': [
//       { name: 'Kulfi (Malai)', desc: 'Traditional frozen dessert with saffron', price: '₹40' },
//       { name: 'Falooda', desc: 'Rose milk, basil seeds & vermicelli delight', price: '₹60' },
//       { name: 'Ice Cream Soda', desc: 'Chilled soda topped with creamy ice cream', price: '₹45' },
//       { name: 'Cassata Slice', desc: 'Layered multi-flavour ice cream classic', price: '₹50' },
//     ],
//     'Sweets': [
//       { name: 'Gulab Jamun (2 pcs)', desc: 'Soft milk-solid balls in rose sugar syrup', price: '₹30' },
//       { name: 'Jalebi (100g)', desc: 'Crispy spiral sweets drenched in sugar syrup', price: '₹40' },
//       { name: 'Shrikhand', desc: 'Strained yogurt dessert with cardamom & saffron', price: '₹50' },
//       { name: 'Halwa', desc: 'Semolina sweet with ghee, nuts and cardamom', price: '₹45' },
//       { name: 'Kheer', desc: 'Creamy rice pudding with saffron and pistachios', price: '₹55' },
//       { name: 'Mohanthal', desc: 'Dense gram flour fudge – a Gujarati classic', price: '₹60/100g' },
//     ],
//   };

//   const categoryIcons = {
//     'Snacks': 'fas fa-pepper-hot',
//     'Meals': 'fas fa-bowl-food',
//     'Drinks': 'fas fa-glass-water',
//     'Ice Cream': 'fas fa-ice-cream',
//     'Sweets': 'fas fa-candy-cane',
//   };

//   function buildModal() {
//     const container = document.getElementById('modalMenuContent');
//     container.innerHTML = '';
//     Object.entries(fullMenuData).forEach(([cat, items]) => {
//       const section = document.createElement('div');
//       section.className = 'modal-category';
//       section.innerHTML = `<h4><i class="${categoryIcons[cat] || 'fas fa-utensils'}"></i> ${cat}</h4>`;
//       items.forEach(item => {
//         const row = document.createElement('div');
//         row.className = 'modal-item';
//         row.innerHTML = `
//           <div class="modal-item-name">${item.name}</div>
//           <div class="modal-item-price">${item.price}</div>
//         `;
//         section.appendChild(row);
//       });
//       container.appendChild(section);
//     });
//   }

//   const menuModal = document.getElementById('menuModal');
//   const closeModal = document.getElementById('closeModal');

//   document.getElementById('viewFullMenu').addEventListener('click', () => {
//     buildModal();
//     menuModal.classList.add('open');
//     document.body.style.overflow = 'hidden';
//   });

//   closeModal.addEventListener('click', closeMenuModal);
//   menuModal.addEventListener('click', (e) => {
//     if (e.target === menuModal) closeMenuModal();
//   });
//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape') closeMenuModal();
//   });

//   function closeMenuModal() {
//     menuModal.classList.remove('open');
//     document.body.style.overflow = '';
//   }

//   /* ──────────────────────────────────────────
//      DOWNLOAD MENU AS PDF
//      Uses browser print-to-PDF with a styled popup
//   ────────────────────────────────────────── */
//   document.getElementById('downloadMenu').addEventListener('click', () => {
//     const pdfContent = generateMenuPDF();
//     const printWin = window.open('', '_blank');
//     if (!printWin) {
//       alert('Please allow popups to download the menu.');
//       return;
//     }
//     printWin.document.write(pdfContent);
//     printWin.document.close();
//     printWin.onload = () => {
//       setTimeout(() => {
//         printWin.print();
//       }, 400);
//     };
//   });

//   function generateMenuPDF() {
//     // Build sections HTML
//     let sections = '';
//     Object.entries(fullMenuData).forEach(([cat, items]) => {
//       const icon = { 'Snacks': '🌶', 'Meals': '🍛', 'Drinks': '🥛', 'Ice Cream': '🍦', 'Sweets': '🍮' }[cat] || '✦';
//       let itemRows = '';
//       items.forEach(item => {
//         itemRows += `
//           <div class="menu-row">
//             <div class="menu-row-left">
//               <span class="item-name">${item.name}</span>
//               <span class="item-desc">${item.desc}</span>
//             </div>
//             <div class="menu-row-dots"></div>
//             <span class="item-price">${item.price}</span>
//           </div>`;
//       });
//       sections += `
//         <div class="menu-section-block">
//           <div class="section-head">
//             <span class="ornament">❧</span>
//             <h3>${icon}  ${cat}  ${icon}</h3>
//             <span class="ornament">❧</span>
//           </div>
//           ${itemRows}
//         </div>`;
//     });

//     return `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="UTF-8">
//   <title>UMA Kumbhaniya – Menu</title>
//   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
//   <style>
//     * { margin:0; padding:0; box-sizing:border-box; }
//     body {
//       font-family: 'Nunito', sans-serif;
//       background: #FFFDF7;
//       color: #2E1B0E;
//       padding: 0;
//     }
//     .page-wrap {
//       max-width: 680px;
//       margin: 0 auto;
//       padding: 40px 48px;
//       background: #FFFDF7;
//       border: 1px solid #e8d8b0;
//       position: relative;
//     }

//     /* Decorative corner borders */
//     .page-wrap::before, .page-wrap::after {
//       content: '';
//       position: absolute;
//       width: 60px; height: 60px;
//       border-color: #D4A017;
//       border-style: solid;
//       opacity: 0.6;
//     }
//     .page-wrap::before { top: 14px; left: 14px; border-width: 2px 0 0 2px; }
//     .page-wrap::after  { bottom: 14px; right: 14px; border-width: 0 2px 2px 0; }
//     .corner-tr, .corner-bl {
//       position: absolute;
//       width: 60px; height: 60px;
//       border-color: #D4A017;
//       border-style: solid;
//       opacity: 0.6;
//     }
//     .corner-tr { top: 14px; right: 14px; border-width: 2px 2px 0 0; }
//     .corner-bl { bottom: 14px; left: 14px; border-width: 0 0 2px 2px; }

//     /* Header */
//     .menu-header {
//       text-align: center;
//       padding-bottom: 24px;
//       margin-bottom: 24px;
//     }
//     .top-ornament {
//       font-size: 1.1rem;
//       color: #D4A017;
//       letter-spacing: 0.4em;
//       display: block;
//       margin-bottom: 12px;
//     }
//     .resto-name {
//       font-family: 'Playfair Display', serif;
//       font-size: 3rem;
//       font-weight: 700;
//       color: #5C3D1E;
//       line-height: 1;
//       letter-spacing: 0.04em;
//     }
//     .resto-name em {
//       display: block;
//       font-style: italic;
//       color: #D4A017;
//       font-size: 2.2rem;
//       margin-top: 4px;
//     }
//     .tagline-text {
//       font-family: 'Cormorant Garamond', serif;
//       font-style: italic;
//       font-size: 1.1rem;
//       color: #8B5E2F;
//       margin-top: 14px;
//       letter-spacing: 0.06em;
//     }
//     .header-divider {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       margin: 18px 0 0;
//     }
//     .header-divider span { color: #D4A017; font-size: 1.1rem; flex-shrink: 0; }
//     .header-divider .line { flex: 1; height: 1.5px; background: linear-gradient(to right, transparent, #D4A017, transparent); }

//     /* Info bar */
//     .info-bar {
//       display: flex;
//       justify-content: center;
//       gap: 24px;
//       font-size: 0.78rem;
//       color: #8B5E2F;
//       margin-top: 14px;
//       letter-spacing: 0.04em;
//       flex-wrap: wrap;
//     }
//     .info-bar span { display: flex; align-items: center; gap: 5px; }

//     /* Menu sections */
//     .menu-section-block { margin-bottom: 28px; }

//     .section-head {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//       margin-bottom: 14px;
//       margin-top: 4px;
//     }
//     .section-head h3 {
//       font-family: 'Playfair Display', serif;
//       font-size: 1.15rem;
//       font-weight: 700;
//       color: #5C3D1E;
//       letter-spacing: 0.12em;
//       text-transform: uppercase;
//       white-space: nowrap;
//       background: #FDF6EC;
//       padding: 0 12px;
//     }
//     .section-head .ornament {
//       color: #D4A017;
//       font-size: 1rem;
//       flex-shrink: 0;
//     }
//     .section-head::before, .section-head::after {
//       display: none;
//     }
//     /* Lines around the section title */
//     .section-head {
//       position: relative;
//     }
//     .section-head::before {
//       content: '';
//       display: block;
//       flex: 1;
//       height: 1px;
//       background: linear-gradient(to right, transparent, #D4A017 40%, #D4A017);
//     }
//     .section-head::after {
//       content: '';
//       display: block;
//       flex: 1;
//       height: 1px;
//       background: linear-gradient(to left, transparent, #D4A017 40%, #D4A017);
//     }

//     /* Menu rows */
//     .menu-row {
//       display: flex;
//       align-items: baseline;
//       gap: 8px;
//       padding: 9px 0 7px;
//       border-bottom: 1px dotted rgba(212,160,23,0.35);
//     }
//     .menu-row:last-child { border-bottom: none; }
//     .menu-row-left {
//       display: flex;
//       flex-direction: column;
//       min-width: 0;
//       flex: 1;
//     }
//     .item-name {
//       font-family: 'Playfair Display', serif;
//       font-weight: 600;
//       font-size: 0.97rem;
//       color: #2E1B0E;
//       line-height: 1.3;
//     }
//     .item-desc {
//       font-size: 0.75rem;
//       color: #8B5E2F;
//       font-style: italic;
//       margin-top: 2px;
//       line-height: 1.4;
//     }
//     .menu-row-dots {
//       flex: 0 0 auto;
//       width: 40px;
//       border-bottom: 1.5px dotted rgba(212,160,23,0.4);
//       margin-bottom: 5px;
//       align-self: flex-end;
//     }
//     .item-price {
//       font-family: 'Playfair Display', serif;
//       font-weight: 700;
//       font-size: 1rem;
//       color: #A07810;
//       white-space: nowrap;
//       flex-shrink: 0;
//     }

//     /* Footer */
//     .menu-footer {
//       text-align: center;
//       margin-top: 28px;
//       padding-top: 16px;
//     }
//     .footer-divider {
//       display: flex;
//       align-items: center;
//       gap: 12px;
//       margin-bottom: 14px;
//     }
//     .footer-divider span { color: #D4A017; font-size: 1.1rem; flex-shrink: 0; }
//     .footer-divider .line { flex: 1; height: 1.5px; background: linear-gradient(to right, transparent, #D4A017, transparent); }
//     .footer-note {
//       font-size: 0.75rem;
//       color: #8B5E2F;
//       font-style: italic;
//       line-height: 1.8;
//       letter-spacing: 0.02em;
//     }
//     .footer-brand {
//       font-family: 'Playfair Display', serif;
//       font-size: 0.85rem;
//       color: #5C3D1E;
//       margin-top: 8px;
//       letter-spacing: 0.08em;
//     }

//     @media print {
//       body { background: white; }
//       .page-wrap { border: none; padding: 20px 32px; max-width: 100%; }
//     }
//   </style>
// </head>
// <body>
//   <div class="page-wrap">
//     <div class="corner-tr"></div>
//     <div class="corner-bl"></div>

//     <div class="menu-header">
//       <span class="top-ornament">✦ &nbsp; ✦ &nbsp; ✦</span>
//       <div class="resto-name">UMA <em>Kumbhaniya</em></div>
//       <div class="tagline-text">Where Every Bite Tells a Story of Tradition & Love</div>
//       <div class="header-divider">
//         <div class="line"></div>
//         <span>✦</span>
//         <div class="line"></div>
//       </div>
//       <div class="info-bar">
//         <span>📍 Rajkot, Gujarat</span>
//         <span>📞 +91 98765 43210</span>
//         <span>🕐 Mon–Sat: 8AM–10PM</span>
//         <span>☀ Sun: 9AM–9PM</span>
//       </div>
//     </div>

//     ${sections}

//     <div class="menu-footer">
//       <div class="footer-divider">
//         <div class="line"></div>
//         <span>❧</span>
//         <div class="line"></div>
//       </div>
//       <div class="footer-note">
//         All prices are inclusive of applicable taxes &nbsp;·&nbsp; Subject to seasonal availability<br>
//         Prices may change without prior notice
//       </div>
//       <div class="footer-brand">— UMA Kumbhaniya, Rajkot —</div>
//     </div>
//   </div>
// </body>
// </html>`;
//   }

//   /* ──────────────────────────────────────────
//    CONTACT FORM – VALIDATION + EMAILJS
// ────────────────────────────────────────── */

//   const EMAILJS_SERVICE_ID = 'service_ln8kean';
//   const EMAILJS_TEMPLATE_ID = 'template_kxdzbj4';

//   const contactForm = document.getElementById('contactForm');

//   contactForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     let valid = true;

//     const nameEl = document.getElementById('name');
//     const phoneEl = document.getElementById('phone');
//     const messageEl = document.getElementById('message');

//     clearError('name');
//     clearError('phone');
//     clearError('message');

//     if (!nameEl.value.trim() || nameEl.value.trim().length < 2) {
//       setError('name', 'Please enter your full name (min 2 characters)');
//       valid = false;
//     }

//     const phoneRegex = /^[+]?[\d\s\-()]{7,15}$/;
//     if (!phoneEl.value.trim() || !phoneRegex.test(phoneEl.value.trim())) {
//       setError('phone', 'Please enter a valid phone number');
//       valid = false;
//     }

//     if (!messageEl.value.trim() || messageEl.value.trim().length < 10) {
//       setError('message', 'Please write a message (min 10 characters)');
//       valid = false;
//     }

//     if (!valid) return;

//     const btn = contactForm.querySelector('button[type="submit"]');
//     btn.disabled = true;
//     btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

//     // ✅ CORRECT TEMPLATE PARAMS
//     const templateParams = {
//       from_name: nameEl.value.trim(),
//       from_phone: phoneEl.value.trim(),
//       message: messageEl.value.trim(),
//       to_name: 'UMA Kumbhaniya'
//     };

//     try {
//       console.log("Sending...", templateParams);

//       const response = await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         templateParams
//       );

//       console.log("SUCCESS:", response);

//       alert("✅ Message Sent Successfully!");

//       contactForm.reset();

//     } catch (err) {
//       console.error("ERROR:", err);

//       alert("❌ Error: " + (err.text || err.message));
//     } finally {
//       btn.disabled = false;
//       btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
//     }
//   });

//   function setError(fieldId, msg) {
//     document.getElementById(fieldId).classList.add('error');
//     document.getElementById(fieldId + 'Error').textContent = msg;
//   }
//   function clearError(fieldId) {
//     document.getElementById(fieldId).classList.remove('error');
//     document.getElementById(fieldId + 'Error').textContent = '';
//   }

//   // Real-time clear on input
//   ['name', 'phone', 'message'].forEach(id => {
//     document.getElementById(id).addEventListener('input', () => clearError(id));
//   });

//   /* ──────────────────────────────────────────
//      SCROLL REVEAL ANIMATIONS
//   ────────────────────────────────────────── */
//   function addRevealClasses() {
//     const targets = [
//       '.about-grid',
//       '.highlight-card',
//       '.menu-card',
//       '.gallery-item',
//       '.info-card',
//       '.contact-form-wrap',
//       '.section-header',
//       '.map-wrap',
//     ];
//     targets.forEach(sel => {
//       document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
//     });
//   }

//   function revealOnScroll() {
//     document.querySelectorAll('.reveal').forEach((el) => {
//       const rect = el.getBoundingClientRect();
//       if (rect.top < window.innerHeight - 60) {
//         el.classList.add('visible');
//       }
//     });
//   }

//   addRevealClasses();
//   // Run immediately - no scroll needed for elements already in view
//   requestAnimationFrame(() => {
//     revealOnScroll();
//   });

//   /* ──────────────────────────────────────────
//      LAZY LOADING IMAGES (native + IntersectionObserver)
//   ────────────────────────────────────────── */
//   if ('IntersectionObserver' in window) {
//     const lazyImages = document.querySelectorAll('img[data-src]');
//     const imgObserver = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           const img = entry.target;
//           img.src = img.dataset.src;
//           img.removeAttribute('data-src');
//           imgObserver.unobserve(img);
//         }
//       });
//     }, { rootMargin: '200px' });
//     lazyImages.forEach(img => imgObserver.observe(img));
//   }

//   /* ──────────────────────────────────────────
//      GALLERY: Entrance animation on scroll
//   ────────────────────────────────────────── */
//   const galleryItems = document.querySelectorAll('.gallery-item');
//   const galleryObserver = new IntersectionObserver((entries) => {
//     entries.forEach((entry, i) => {
//       if (entry.isIntersecting) {
//         setTimeout(() => {
//           entry.target.style.opacity = '1';
//           entry.target.style.transform = 'scale(1)';
//         }, i * 80);
//         galleryObserver.unobserve(entry.target);
//       }
//     });
//   }, { threshold: 0.1 });

//   galleryItems.forEach(item => {
//     item.style.opacity = '0';
//     item.style.transform = 'scale(0.92)';
//     item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
//     galleryObserver.observe(item);
//   });

//   /* ──────────────────────────────────────────
//      HIGHLIGHT CARDS: Count-up for badge
//   ────────────────────────────────────────── */
//   const badgeNum = document.querySelector('.badge-num');
//   if (badgeNum) {
//     const target = 14;
//     let count = 0;
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         const interval = setInterval(() => {
//           count++;
//           badgeNum.textContent = count + '+';
//           if (count >= target) clearInterval(interval);
//         }, 80);
//         observer.disconnect();
//       }
//     }, { threshold: 0.5 });
//     observer.observe(badgeNum);
//   }

// });

/* ============================================================
   UMA KUMBHANIYA – SCRIPT.JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     NAVBAR: Sticky scroll effect & active link
  ────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });

    // Scroll-to-top visibility
    const scrollBtn = document.getElementById('scrollTop');
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }

    // Reveal animations
    revealOnScroll();
  });

  /* ──────────────────────────────────────────
     SMOOTH SCROLL
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ──────────────────────────────────────────
     SCROLL TO TOP
  ────────────────────────────────────────── */
  document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ──────────────────────────────────────────
     MENU TABS (Category Filter)
  ────────────────────────────────────────── */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.cat;
      menuCards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ──────────────────────────────────────────
     FULL MENU MODAL
  ────────────────────────────────────────── */
  const fullMenuData = {
    'Snacks': [
      { name: 'Samosa (2 pcs)', desc: 'Crispy pastry filled with spiced potatoes & peas', price: '₹20' },
      { name: 'Kachori (2 pcs)', desc: 'Deep-fried pockets filled with lentil stuffing', price: '₹20' },
      { name: 'Bhajiya Plate', desc: 'Assorted fritters with green chutney', price: '₹30' },
      { name: 'Dabeli', desc: 'Spiced potato filling in buttered bun with chutneys', price: '₹25' },
      { name: 'Pani Puri (6 pcs)', desc: 'Crispy puris with tangy tamarind water', price: '₹30' },
      { name: 'Sev Puri (4 pcs)', desc: 'Flat puris topped with chutneys and sev', price: '₹30' },
      { name: 'Ragda Pattice', desc: 'Potato patty with white pea curry and toppings', price: '₹45' },
      { name: 'Vada Pav', desc: 'Spiced potato dumpling in bun with dry garlic chutney', price: '₹20' },
    ],
    'Meals': [
      { name: 'Gujarati Thali', desc: 'Dal, sabzi, roti, rice, kadhi, papad, pickle & more', price: '₹120' },
      { name: 'Dal Khichdi', desc: 'Comforting rice & lentil mix served with ghee', price: '₹80' },
      { name: 'Pav Bhaji', desc: 'Spiced vegetable mash with buttered pav', price: '₹70' },
      { name: 'Chole Bhature', desc: 'Spiced chickpea curry with fried bread', price: '₹90' },
      { name: 'Kadhi Chawal', desc: 'Yogurt-based curry with steamed rice', price: '₹70' },
      { name: 'Undhiyu', desc: 'Traditional Gujarati winter vegetable medley', price: '₹100' },
    ],
    'Drinks': [
      { name: 'Masala Chaas', desc: 'Spiced buttermilk with roasted cumin', price: '₹25' },
      { name: 'Mango Lassi', desc: 'Thick yogurt mango blend with cardamom', price: '₹50' },
      { name: 'Sugarcane Juice', desc: 'Fresh pressed with ginger & lemon', price: '₹30' },
      { name: 'Rose Sharbat', desc: 'Chilled rose syrup drink with basil seeds', price: '₹30' },
      { name: 'Thandai', desc: 'Spiced milk drink with nuts and saffron', price: '₹55' },
      { name: 'Cold Coffee', desc: 'Blended with milk and ice cream', price: '₹60' },
    ],
    'Ice Cream': [
      { name: 'Kulfi (Malai)', desc: 'Traditional frozen dessert with saffron', price: '₹40' },
      { name: 'Falooda', desc: 'Rose milk, basil seeds & vermicelli delight', price: '₹60' },
      { name: 'Ice Cream Soda', desc: 'Chilled soda topped with creamy ice cream', price: '₹45' },
      { name: 'Cassata Slice', desc: 'Layered multi-flavour ice cream classic', price: '₹50' },
    ],
    'Sweets': [
      { name: 'Gulab Jamun (2 pcs)', desc: 'Soft milk-solid balls in rose sugar syrup', price: '₹30' },
      { name: 'Jalebi (100g)', desc: 'Crispy spiral sweets drenched in sugar syrup', price: '₹40' },
      { name: 'Shrikhand', desc: 'Strained yogurt dessert with cardamom & saffron', price: '₹50' },
      { name: 'Halwa', desc: 'Semolina sweet with ghee, nuts and cardamom', price: '₹45' },
      { name: 'Kheer', desc: 'Creamy rice pudding with saffron and pistachios', price: '₹55' },
      { name: 'Mohanthal', desc: 'Dense gram flour fudge – a Gujarati classic', price: '₹60/100g' },
    ],
  };

  const categoryIcons = {
    'Snacks': 'fas fa-pepper-hot',
    'Meals': 'fas fa-bowl-food',
    'Drinks': 'fas fa-glass-water',
    'Ice Cream': 'fas fa-ice-cream',
    'Sweets': 'fas fa-candy-cane',
  };

  function buildModal() {
    const container = document.getElementById('modalMenuContent');
    container.innerHTML = '';
    Object.entries(fullMenuData).forEach(([cat, items]) => {
      const section = document.createElement('div');
      section.className = 'modal-category';
      section.innerHTML = `<h4><i class="${categoryIcons[cat] || 'fas fa-utensils'}"></i> ${cat}</h4>`;
      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'modal-item';
        row.innerHTML = `
          <div class="modal-item-name">${item.name}</div>
          <div class="modal-item-price">${item.price}</div>
        `;
        section.appendChild(row);
      });
      container.appendChild(section);
    });
  }

  const menuModal = document.getElementById('menuModal');
  const closeModal = document.getElementById('closeModal');

  document.getElementById('viewFullMenu').addEventListener('click', () => {
    buildModal();
    menuModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeModal.addEventListener('click', closeMenuModal);
  menuModal.addEventListener('click', (e) => {
    if (e.target === menuModal) closeMenuModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenuModal();
  });

  function closeMenuModal() {
    menuModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ──────────────────────────────────────────
     DOWNLOAD MENU AS PDF
  ────────────────────────────────────────── */
  document.getElementById('downloadMenu').addEventListener('click', () => {
    const pdfContent = generateMenuPDF();
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Please allow popups to download the menu.');
      return;
    }
    printWin.document.write(pdfContent);
    printWin.document.close();
    printWin.onload = () => {
      setTimeout(() => {
        printWin.print();
      }, 400);
    };
  });

  function generateMenuPDF() {
    let sections = '';
    Object.entries(fullMenuData).forEach(([cat, items]) => {
      const icon = { 'Snacks': '🌶', 'Meals': '🍛', 'Drinks': '🥛', 'Ice Cream': '🍦', 'Sweets': '🍮' }[cat] || '✦';
      let itemRows = '';
      items.forEach(item => {
        itemRows += `
          <div class="menu-row">
            <div class="menu-row-left">
              <span class="item-name">${item.name}</span>
              <span class="item-desc">${item.desc}</span>
            </div>
            <div class="menu-row-dots"></div>
            <span class="item-price">${item.price}</span>
          </div>`;
      });
      sections += `
        <div class="menu-section-block">
          <div class="section-head">
            <span class="ornament">❧</span>
            <h3>${icon}  ${cat}  ${icon}</h3>
            <span class="ornament">❧</span>
          </div>
          ${itemRows}
        </div>`;
    });

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>UMA Kumbhaniya – Menu</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family: 'DM Sans', sans-serif; background: #FAF6EF; color: #2A1508; }
    .page-wrap { max-width: 680px; margin: 0 auto; padding: 40px 48px; background: #FAF6EF; border: 1px solid #e8d0a0; position: relative; }
    .page-wrap::before, .page-wrap::after { content:''; position:absolute; width:60px; height:60px; border-color:#E8932A; border-style:solid; opacity:0.6; }
    .page-wrap::before { top:14px; left:14px; border-width:2px 0 0 2px; }
    .page-wrap::after  { bottom:14px; right:14px; border-width:0 2px 2px 0; }
    .corner-tr, .corner-bl { position:absolute; width:60px; height:60px; border-color:#E8932A; border-style:solid; opacity:0.6; }
    .corner-tr { top:14px; right:14px; border-width:2px 2px 0 0; }
    .corner-bl { bottom:14px; left:14px; border-width:0 0 2px 2px; }
    .menu-header { text-align:center; padding-bottom:24px; margin-bottom:24px; }
    .top-ornament { font-size:1.1rem; color:#E8932A; letter-spacing:0.4em; display:block; margin-bottom:12px; }
    .resto-name { font-family:'Cormorant Garamond',serif; font-size:3rem; font-weight:700; color:#6B2D0E; line-height:1; letter-spacing:0.04em; }
    .resto-name em { display:block; font-style:italic; color:#C0522B; font-size:2.2rem; margin-top:4px; }
    .tagline-text { font-family:'Cormorant Garamond',serif; font-style:italic; font-size:1.1rem; color:#8B5E3C; margin-top:14px; letter-spacing:0.06em; }
    .header-divider { display:flex; align-items:center; gap:12px; margin:18px 0 0; }
    .header-divider span { color:#E8932A; font-size:1.1rem; flex-shrink:0; }
    .header-divider .line { flex:1; height:1.5px; background:linear-gradient(to right, transparent, #E8932A, transparent); }
    .info-bar { display:flex; justify-content:center; gap:24px; font-size:0.78rem; color:#8B5E3C; margin-top:14px; letter-spacing:0.04em; flex-wrap:wrap; }
    .menu-section-block { margin-bottom:28px; }
    .section-head { display:flex; align-items:center; gap:10px; margin-bottom:14px; margin-top:4px; }
    .section-head h3 { font-family:'Cormorant Garamond',serif; font-size:1.15rem; font-weight:700; color:#6B2D0E; letter-spacing:0.12em; text-transform:uppercase; white-space:nowrap; background:#FAF6EF; padding:0 12px; }
    .section-head .ornament { color:#E8932A; font-size:1rem; flex-shrink:0; }
    .section-head::before { content:''; display:block; flex:1; height:1px; background:linear-gradient(to right, transparent, #E8932A 40%, #E8932A); }
    .section-head::after { content:''; display:block; flex:1; height:1px; background:linear-gradient(to left, transparent, #E8932A 40%, #E8932A); }
    .menu-row { display:flex; align-items:baseline; gap:8px; padding:9px 0 7px; border-bottom:1px dotted rgba(232,147,42,0.35); }
    .menu-row:last-child { border-bottom:none; }
    .menu-row-left { display:flex; flex-direction:column; min-width:0; flex:1; }
    .item-name { font-family:'Cormorant Garamond',serif; font-weight:600; font-size:0.97rem; color:#2A1508; line-height:1.3; }
    .item-desc { font-size:0.75rem; color:#8B5E3C; font-style:italic; margin-top:2px; line-height:1.4; }
    .menu-row-dots { flex:0 0 auto; width:40px; border-bottom:1.5px dotted rgba(232,147,42,0.4); margin-bottom:5px; align-self:flex-end; }
    .item-price { font-family:'Cormorant Garamond',serif; font-weight:700; font-size:1rem; color:#C0522B; white-space:nowrap; flex-shrink:0; }
    .menu-footer { text-align:center; margin-top:28px; padding-top:16px; }
    .footer-divider { display:flex; align-items:center; gap:12px; margin-bottom:14px; }
    .footer-divider span { color:#E8932A; font-size:1.1rem; flex-shrink:0; }
    .footer-divider .line { flex:1; height:1.5px; background:linear-gradient(to right, transparent, #E8932A, transparent); }
    .footer-note { font-size:0.75rem; color:#8B5E3C; font-style:italic; line-height:1.8; }
    .footer-brand { font-family:'Cormorant Garamond',serif; font-size:0.85rem; color:#6B2D0E; margin-top:8px; letter-spacing:0.08em; }
    @media print { body { background:white; } .page-wrap { border:none; padding:20px 32px; max-width:100%; } }
  </style>
</head>
<body>
  <div class="page-wrap">
    <div class="corner-tr"></div>
    <div class="corner-bl"></div>
    <div class="menu-header">
      <span class="top-ornament">✦ &nbsp; ✦ &nbsp; ✦</span>
      <div class="resto-name">UMA <em>Kumbhaniya</em></div>
      <div class="tagline-text">Where Every Bite Tells a Story of Tradition & Love</div>
      <div class="header-divider"><div class="line"></div><span>✦</span><div class="line"></div></div>
      <div class="info-bar">
        <span>📍 Rajkot, Gujarat</span>
        <span>📞 +91 98765 43210</span>
        <span>🕐 Mon–Sat: 8AM–10PM</span>
        <span>☀ Sun: 9AM–9PM</span>
      </div>
    </div>
    ${sections}
    <div class="menu-footer">
      <div class="footer-divider"><div class="line"></div><span>❧</span><div class="line"></div></div>
      <div class="footer-note">All prices are inclusive of applicable taxes · Subject to seasonal availability<br>Prices may change without prior notice</div>
      <div class="footer-brand">— UMA Kumbhaniya, Rajkot —</div>
    </div>
  </div>
</body>
</html>`;
  }

  /* ──────────────────────────────────────────
     CONTACT FORM – EMAILJS (no mailto, no form submit)
     Button is type="button" so no default action fires.
     EmailJS sends the message directly in background.
  ────────────────────────────────────────── */

  const EMAILJS_SERVICE_ID  = 'service_ln8kean';
  const EMAILJS_TEMPLATE_ID = 'template_kxdzbj4';

  const nameEl    = document.getElementById('name');
  const phoneEl   = document.getElementById('phone');
  const messageEl = document.getElementById('message');
  const formSuccess = document.getElementById('formSuccess');
  const sendBtn   = document.getElementById('sendMsgBtn');

  // Prevent any accidental form submit (e.g. Enter key)
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  sendBtn.addEventListener('click', async () => {
    // Clear previous errors
    clearError('name');
    clearError('phone');
    clearError('message');
    formSuccess.classList.remove('show');

    let valid = true;

    if (!nameEl.value.trim() || nameEl.value.trim().length < 2) {
      setError('name', 'Please enter your full name (min 2 characters)');
      valid = false;
    }

    const phoneRegex = /^[+]?[\d\s\-()]{7,15}$/;
    if (!phoneEl.value.trim() || !phoneRegex.test(phoneEl.value.trim())) {
      setError('phone', 'Please enter a valid phone number');
      valid = false;
    }

    if (!messageEl.value.trim() || messageEl.value.trim().length < 10) {
      setError('message', 'Please write a message (min 10 characters)');
      valid = false;
    }

    if (!valid) return;

    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const templateParams = {
      from_name:  nameEl.value.trim(),
      from_phone: phoneEl.value.trim(),
      message:    messageEl.value.trim(),
      to_name:    'UMA Kumbhaniya'
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      // Show inline success message – no mail client opened
      formSuccess.classList.add('show');
      nameEl.value = '';
      phoneEl.value = '';
      messageEl.value = '';

      // Auto-hide success after 5s
      setTimeout(() => formSuccess.classList.remove('show'), 5000);

    } catch (err) {
      console.error('EmailJS error:', err);
      // Show error inline rather than alert
      formSuccess.style.background = '#fdecea';
      formSuccess.style.borderColor = '#ef9a9a';
      formSuccess.style.color = '#c62828';
      formSuccess.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again or call us directly.';
      formSuccess.classList.add('show');
      setTimeout(() => {
        formSuccess.classList.remove('show');
        formSuccess.style = '';
        formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll get back to you soon.';
      }, 6000);
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  });

  function setError(fieldId, msg) {
    document.getElementById(fieldId).classList.add('error');
    document.getElementById(fieldId + 'Error').textContent = msg;
  }
  function clearError(fieldId) {
    document.getElementById(fieldId).classList.remove('error');
    document.getElementById(fieldId + 'Error').textContent = '';
  }

  ['name', 'phone', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => clearError(id));
  });

  /* ──────────────────────────────────────────
     SCROLL REVEAL ANIMATIONS
  ────────────────────────────────────────── */
  function addRevealClasses() {
    const targets = [
      '.about-grid', '.highlight-card', '.menu-card',
      '.gallery-item', '.info-card', '.contact-form-wrap',
      '.section-header', '.map-wrap',
    ];
    targets.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
    });
  }

  function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }

  addRevealClasses();
  requestAnimationFrame(() => revealOnScroll());

  /* ──────────────────────────────────────────
     GALLERY: Entrance animation on scroll
  ────────────────────────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        }, i * 80);
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.92)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    galleryObserver.observe(item);
  });

});
