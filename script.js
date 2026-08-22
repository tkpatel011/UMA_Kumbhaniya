/* ==========================================================================
   UMA KUMBHANIYA — WORLD-CLASS INTERACTIVE & INTELLIGENT PLATFORM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let scrollTicking = false;

  // ------------------------------------------------------------------------
  // Lightweight Analytics Architecture
  // ------------------------------------------------------------------------
  const UMAAnalytics = {
    track(eventName, eventData = {}) {
      const payload = {
        event: eventName,
        data: eventData,
        timestamp: new Date().toISOString(),
      };
      try {
        window.dispatchEvent(new CustomEvent('uma_analytics', { detail: payload }));
        const events = JSON.parse(sessionStorage.getItem('uma_analytics_events') || '[]');
        events.push(payload);
        if (events.length > 50) events.shift();
        sessionStorage.setItem('uma_analytics_events', JSON.stringify(events));
      } catch (e) {
        // Safe fail
      }
    }
  };

  UMAAnalytics.track('page_view', { path: window.location.pathname });

  // ------------------------------------------------------------------------
  // Language Switcher Engine (English ↔ Gujarati)
  // ------------------------------------------------------------------------
  const langTranslations = {
    en: {
      navHome: 'Home',
      navOfferings: 'Offerings',
      navMenu: 'Menu',
      navVisit: 'Visit',
      navContact: 'Contact',
      navGallery: 'Gallery',
      navCta: '<i class="fas fa-utensils"></i> Explore Menu',
      btnShareNav: '<i class="fas fa-share-nodes"></i> Share Website',

      // Hero
      heroSub: 'An Experience Worth Tasting',
      heroTagline: 'Where Every Bite Tells a Story of Tradition &amp; Love',
      heroCtaMenu: '<i class="fas fa-utensils"></i> Explore Menu',
      heroCtaVisit: '<i class="fas fa-compass"></i> Visit Us',
      heroCtaAi: '<i class="fas fa-sparkles"></i> Ask TasteAI',

      // Quick Actions
      qaCall: 'Call Directly',
      qaHours: 'Opening Hours',
      qaDirections: 'Get Directions',
      qaReview: 'Google Reviews',
      qaReviewSub: 'Rate &amp; Review Us',
      qaShare: 'Share Website',
      qaShareSub: 'WhatsApp &amp; Socials',

      // Share Modal
      shareTitle: '<i class="fas fa-share-nodes" style="color: var(--gold-primary);"></i> Share UMA Kumbhaniya',
      shareSub: 'Spread the word about authentic Gujarati Kumbhaniya &amp; Ice Cream in Babra!',
      copyLinkBtn: 'Copy Link',

      // Quote Section
      quoteText: 'Hot snacks, cool treats, and warm smiles — where every bite brings you back for more.',
      quoteAuthor: '✦ The Legacy of UMA Kumbhaniya • Babra ✦',

      // Offerings Section
      eyebrowStory: '✦ Signature Offerings ✦',
      titleStory: 'The UMA <em>Experience</em>',
      subtitleStory: 'Explore our core culinary offerings made fresh daily',
      card1Badge: '01 • Specialty',
      card1Title: 'કુંભણીયા / ભજીયા',
      card1Desc: 'Crispy, spiced Gujarati Kumbhaniya, Patti Marcha, &amp; Stuffed Chili Fry made fresh to order.',
      card1Price: 'Starting at ₹50',
      card2Badge: '02 • Artisanal',
      card2Title: 'Artisanal Ice Creams',
      card2Desc: 'Rich, creamy house-crafted cups including Special Gotalo, Malai, Mawa Badam, and American Dryfruit.',
      card2Price: '₹30 – ₹40 / cup',
      card3Badge: '03 • On The Go',
      card3Title: 'Candies &amp; Cones',
      card3Desc: 'Authentic Mawa Malai, Mawa Topra, Jamun, Oreo, Raspberry sticks and crispy Chocolate Cones.',
      card3Price: '₹15 – ₹35 each',
      card4Badge: '04 • Chilled',
      card4Title: 'Chilled Beverages',
      card4Desc: 'Cool off with authentic Gujarati Sosyo, chilled Spiced Chaas (Buttermilk), Thums Up, Sprite, &amp; Maaza.',
      card4Price: 'All at ₹20',

      // Menu Section
      eyebrowMenu: '✦ What We Serve ✦',
      titleMenu: 'Our Signature <em>Menu</em>',
      subtitleMenu: 'Handcrafted authentic Gujarati snacks, rich ice creams, and refreshing beverages',
      tabAll: '<i class="fas fa-th"></i> All Items <span class="tab-count">27</span>',
      tabBhajiya: '<i class="fas fa-pepper-hot"></i> કુંભણીયા / ભજીયા <span class="tab-count">6</span>',
      tabIcecream: '<i class="fas fa-ice-cream"></i> Ice Cream <span class="tab-count">16</span>',
      tabDrinks: '<i class="fas fa-glass-water"></i> Drinks <span class="tab-count">5</span>',
      searchPlaceholder: 'Search menu (e.g. કુંભણીયા, મલાઈ, છાસ)...',
      btnViewMore: '<i class="fas fa-chevron-down"></i> View More Items',
      btnFullMenu: '<i class="fas fa-book-open"></i> Complete Menu',
      btnDownloadPdf: '<i class="fas fa-download"></i> Download Menu PDF',

      // Visit Section
      eyebrowVisit: '✦ Welcome to Babra ✦',
      titleVisit: 'Plan Your <em>Visit</em>',
      subtitleVisit: 'Everything you need for an authentic culinary experience',
      visitCard1Title: 'Operating Hours',
      visitCard1Lead: 'Freshly prepared evening snacks and desserts every day.',
      visitList1: '<i class="fas fa-check"></i> Fresh batch fried continuously',
      visitList2: '<i class="fas fa-check"></i> Chilled handcrafted ice creams',
      visitList3: '<i class="fas fa-check"></i> Takeaway &amp; dine-in available',
      visitCard2Title: 'Live Distance',
      visitCard2Lead: 'Calculate your exact driving distance to UMA Kumbhaniya.',
      btnFindDistance: '<i class="fas fa-map-pin"></i> Find My Distance',
      btnOpenNav: '<i class="fas fa-diamond-turn-right"></i> Open Navigation',
      visitCard3Title: 'Authentic Hospitality',
      visitCard3Lead: 'Experience true Saurashtra warmth and freshly prepared traditional recipes.',
      btnCallUs: '<i class="fas fa-phone-alt"></i> Call +91 90991 28700',

      // Contact Section
      eyebrowContact: '✦ Connect With Us ✦',
      titleContact: 'Visit Us in <em>Babra</em>',
      subtitleContact: 'We look forward to serving you with warmth and tradition',
      contactAddrTitle: 'Location &amp; Address',
      contactPhoneTitle: 'Phone Number',
      contactHoursTitle: 'Operating Hours',
      contactFormTitle: 'Send Us a Message',
      contactFormSub: 'Have a question or feedback? Drop us a note below.',
      lblFormName: 'Your Name <span class="required">*</span>',
      lblFormPhone: 'Phone Number <span class="required">*</span>',
      lblFormMsg: 'Your Message <span class="required">*</span>',
      phFormName: 'Enter your full name',
      phFormPhone: 'Enter 10-digit mobile number',
      phFormMsg: 'Tell us how we can help...',
      btnSendMsg: '<i class="fas fa-paper-plane"></i> Send Message',
      reviewBannerTitle: 'Loved Our Gujarati Food?',
      reviewBannerText: 'Share your experience and leave a 5-star review on our official Google Maps page!',
      btnWriteReview: '<i class="fab fa-google"></i> Write a Google Review',

      // Gallery Section
      eyebrowGallery: '✦ Visual Feast ✦',
      titleGallery: 'Moments &amp; <em>Tradition</em>',
      subtitleGallery: 'A glimpse into the craft, ingredients, and warmth at UMA Kumbhaniya',

      // Footer
      footerText: 'Authentic Gujarati taste, handcrafted Kumbhaniya &amp; Bhajiya, pure artisanal ice creams, and chilled refreshments in Babra.',
      footerNavTitle: 'Quick Navigation',
      footerContactTitle: 'Contact Details',
      footerCopyright: '© 2025 UMA Kumbhaniya. All Rights Reserved. | Crafted with <i class="fas fa-heart" style="color: #C9A227;"></i> in Babra'
    },

    gu: {
      navHome: 'હોમ',
      navOfferings: 'સ્પેશિયાલિટી',
      navMenu: 'મેનુ',
      navVisit: 'મુલાકાત',
      navContact: 'સંપર્ક',
      navGallery: 'ગેલેરી',
      navCta: '<i class="fas fa-utensils"></i> મેનુ જુઓ',
      btnShareNav: '<i class="fas fa-share-nodes"></i> વેબસાઇટ શેર કરો',

      // Hero
      heroSub: 'અસલી સ્વાદ અને પરંપરાનો અનુભવ',
      heroTagline: 'જ્યાં દરેક બાઈટમાં સૌરાષ્ટ્રની પરંપરા અને પ્રેમનો અસલી સ્વાદ છે',
      heroCtaMenu: '<i class="fas fa-utensils"></i> મેનુ જુઓ',
      heroCtaVisit: '<i class="fas fa-compass"></i> મુલાકાત લો',
      heroCtaAi: '<i class="fas fa-sparkles"></i> પૂછો TasteAI',

      // Quick Actions
      qaCall: 'સીધો કોલ કરો',
      qaHours: 'સમયપત્રક',
      qaDirections: 'રસ્તો મેળવો',
      qaReview: 'ગૂગલ રિવ્યુ',
      qaReviewSub: 'અમને રેટિંગ આપો',
      qaShare: 'વેબસાઇટ શેર કરો',
      qaShareSub: 'વોટ્સએપ અને સોશ્યલ',

      // Share Modal
      shareTitle: '<i class="fas fa-share-nodes" style="color: var(--gold-primary);"></i> ઉમા કુંભણીયા શેર કરો',
      shareSub: 'બાબરાના અસલી ગરમાગરમ કુંભણીયા ભજીયા અને આઈસ્ક્રીમ તમારા મિત્રો સાથે શેર કરો!',
      copyLinkBtn: 'લિંક કોપી કરો',

      // Quote Section
      quoteText: 'ગરમાગરમ ભજીયા, ઠંડા આઈસ્ક્રીમ અને ભાવભર્યું સ્વાગત — જેનો અસલી સ્વાદ તમને વારંવાર યાદ આવશે.',
      quoteAuthor: '✦ ઉમા કુંભણીયા • બાબરા ની વિરાસત ✦',

      // Offerings Section
      eyebrowStory: '✦ મુખ્ય સ્પેશિયાલિટી ✦',
      titleStory: 'ઉમા નો <em>અનુભવ</em>',
      subtitleStory: 'દરરોજ સાંજે ઓર્ડર મુજબ તાજી બનાવાતી આપણી ખાસ વાનગીઓ',
      card1Badge: '૦૧ • કુંભણીયા સ્પેશિયલ',
      card1Title: 'કુંભણીયા / ભજીયા',
      card1Desc: 'ગરમાગરમ કુંભણીયા, પટ્ટી મરચા અને ભરેલા મરચા ઓર્ડર મુજબ તાજા ફ્રાય કરાય છે.',
      card1Price: 'માત્ર ₹50 થી શરૂ',
      card2Badge: '૦૨ • હસ્તનિર્મિત આઈસ્ક્રીમ',
      card2Title: 'સ્પેશિયલ આઈસ્ક્રીમ',
      card2Desc: 'સ્પે. ગોટાળો, મલાઈ, માવા બદામ અને અમેરિકન ડ્રાયફ્રુટ જેવા સમૃદ્ધ આઈસ્ક્રીમ કપ.',
      card2Price: '₹30 – ₹40 / કપ',
      card3Badge: '૦૩ • કેન્ડી અને કોન',
      card3Title: 'માવા કેન્ડી અને કોન',
      card3Desc: 'અસલી માવા મલાઈ, તોપરા, જાંબુ, ઓરીયો, રાસ્પબેરી અને ચોકલેટ કોન.',
      card3Price: '₹15 – ₹35 પ્રતિ નંગ',
      card4Badge: '૦૪ • ઠંડા પીણાં',
      card4Title: 'ઠંડા પીણાં અને છાસ',
      card4Desc: 'અસલી સૌરાષ્ટ્રીયન સોશ્યો, મસાલા છાસ, થમ્સ અપ, સ્પ્રાઈટ અને માઝા.',
      card4Price: 'માત્ર ₹20 માં',

      // Menu Section
      eyebrowMenu: '✦ અમારી વાનગીઓ ✦',
      titleMenu: 'અમારું સ્વાદિષ્ટ <em>મેનુ</em>',
      subtitleMenu: 'શુદ્ધ સામગ્રી અને પરંપરાગત પદ્ધતિથી બનાવેલ તાજું ભોજન અને આઈસ્ક્રીમ',
      tabAll: '<i class="fas fa-th"></i> બધી વાનગીઓ <span class="tab-count">27</span>',
      tabBhajiya: '<i class="fas fa-pepper-hot"></i> કુંભણીયા / ભજીયા <span class="tab-count">6</span>',
      tabIcecream: '<i class="fas fa-ice-cream"></i> આઈસ્ક્રીમ <span class="tab-count">16</span>',
      tabDrinks: '<i class="fas fa-glass-water"></i> ઠંડા પીણાં <span class="tab-count">5</span>',
      searchPlaceholder: 'મેનુ શોધો (દા.ત. કુંભણીયા, મલાઈ, છાસ)...',
      btnViewMore: '<i class="fas fa-chevron-down"></i> વધુ વાનગીઓ જુઓ',
      btnFullMenu: '<i class="fas fa-book-open"></i> પૂરેપૂરું મેનુ જુઓ',
      btnDownloadPdf: '<i class="fas fa-download"></i> ડાઉનલોડ મેનુ PDF',

      // Visit Section
      eyebrowVisit: '✦ બાબરામાં જી આયા નૂ ✦',
      titleVisit: 'અમારી <em>મુલાકાત લો</em>',
      subtitleVisit: 'અસલી કુંભણીયા નો સ્વાદ માણવા માટે જરૂરી બધી જ માહિતી',
      visitCard1Title: 'સમયપત્રક',
      visitCard1Lead: 'દરરોજ સાંજે તાજી બનાવાતી ગરમાગરમ વાનગીઓ અને આઈસ્ક્રીમ.',
      visitList1: '<i class="fas fa-check"></i> સતત ગરમાગરમ ફ્રાય બેચ',
      visitList2: '<i class="fas fa-check"></i> ઠંડા હસ્તનિર્મિત આઈસ્ક્રીમ',
      visitList3: '<i class="fas fa-check"></i> પાર્સલ અને જમવાની ઉત્તમ સુવિધા',
      visitCard2Title: 'લાઇવ અંતર (GPS)',
      visitCard2Lead: 'તમારા લોકેશનથી ઉમા કુંભણીયા સુધીનું ડ્રાઇવિંગ અંતર શોધો.',
      btnFindDistance: '<i class="fas fa-map-pin"></i> મારું અંતર શોધો',
      btnOpenNav: '<i class="fas fa-diamond-turn-right"></i> નેવિગેશન શરૂ કરો',
      visitCard3Title: 'અસલી અતિથિ સત્કાર',
      visitCard3Lead: 'સૌરાષ્ટ્રના અસલી પ્રેમ અને ગરમાગરમ વાનગીઓનો અનુભવ કરો.',
      btnCallUs: '<i class="fas fa-phone-alt"></i> કોલ કરો +91 90991 28700',

      // Contact Section
      eyebrowContact: '✦ સંપર્ક કરો ✦',
      titleContact: 'બાબરા માં <em>પધારો</em>',
      subtitleContact: 'અમે ભાવપૂર્વક તમારું સ્વાગત કરવા માટે આતુર છીએ',
      contactAddrTitle: 'સરનામું અને લોકેશન',
      contactPhoneTitle: 'ફોન નંબર',
      contactHoursTitle: 'સમયપત્રક',
      contactFormTitle: 'અમને સંદેશ મોકલો',
      contactFormSub: 'કોઈ પ્રશ્ન કે પ્રતિભાવ છે? નીચે મેસેજ કરો.',
      lblFormName: 'તમારું નામ <span class="required">*</span>',
      lblFormPhone: 'મોબાઈલ નંબર <span class="required">*</span>',
      lblFormMsg: 'તમારો સંદેશ <span class="required">*</span>',
      phFormName: 'તમારું પૂરું નામ લખો',
      phFormPhone: '૧૦ આંકડાનો મોબાઈલ નંબર લખો',
      phFormMsg: 'તમારો મેસેજ અહીં લખો...',
      btnSendMsg: '<i class="fas fa-paper-plane"></i> મેસેજ મોકલો',
      reviewBannerTitle: 'અમારો સ્વાદ ગમ્યો?',
      reviewBannerText: 'અમારા ગૂગલ મેપ્સ પેજ પર તમારો ૫-સ્ટાર રિવ્યુ અને પ્રતિભાવ શેર કરો!',
      btnWriteReview: '<i class="fab fa-google"></i> ગૂગલ રિવ્યુ લખો',

      // Gallery Section
      eyebrowGallery: '✦ યાદગાર પળો ✦',
      titleGallery: 'પળો અને <em>પરંપરા</em>',
      subtitleGallery: 'ઉમા કુંભણીયાની પરંપરા અને તાજી વાનગીઓની એક ઝલક',

      // Footer
      footerText: 'અસલી કાઠિયાવાડી સ્વાદ, ગરમાગરમ કુંભણીયા ભજીયા, શુદ્ધ માવા આઈસ્ક્રીમ અને ઠંડા પીણાં — બાબરા, ગુજરાત.',
      footerNavTitle: 'ઝડપી નેવિગેશન',
      footerContactTitle: 'સંપર્ક વિગત',
      footerCopyright: '© 2025 ઉમા કુંભણીયા. સર્વાધિકાર સુરક્ષિત. | બાબરા માં પ્રેમપૂર્વક નિર્મિત <i class="fas fa-heart" style="color: #C9A227;"></i>'
    }
  };

  let currentLang = localStorage.getItem('uma_lang') || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('uma_lang', lang);

    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (langTranslations[lang] && langTranslations[lang][key]) {
        el.innerHTML = langTranslations[lang][key];
      }
    });

    // Update input placeholders
    const searchInput = document.getElementById('menuSearchInput');
    if (searchInput && langTranslations[lang].searchPlaceholder) {
      searchInput.placeholder = langTranslations[lang].searchPlaceholder;
    }
    const formName = document.getElementById('name');
    if (formName && langTranslations[lang].phFormName) {
      formName.placeholder = langTranslations[lang].phFormName;
    }
    const formPhone = document.getElementById('phone');
    if (formPhone && langTranslations[lang].phFormPhone) {
      formPhone.placeholder = langTranslations[lang].phFormPhone;
    }
    const formMsg = document.getElementById('message');
    if (formMsg && langTranslations[lang].phFormMsg) {
      formMsg.placeholder = langTranslations[lang].phFormMsg;
    }

    const engOpts = document.querySelectorAll('#langOptEng, #mobileLangOptEng');
    const gujOpts = document.querySelectorAll('#langOptGuj, #mobileLangOptGuj');

    engOpts.forEach(opt => opt.classList.toggle('active', lang === 'en'));
    gujOpts.forEach(opt => opt.classList.toggle('active', lang === 'gu'));
  }

  const langToggleBtn = document.getElementById('langToggleBtn');
  const mobileLangToggleBtn = document.getElementById('mobileLangToggleBtn');

  function toggleLanguage() {
    const nextLang = currentLang === 'en' ? 'gu' : 'en';
    applyLanguage(nextLang);
    UMAAnalytics.track('lang_toggle', { language: nextLang });
  }

  if (langToggleBtn) langToggleBtn.addEventListener('click', toggleLanguage);
  if (mobileLangToggleBtn) mobileLangToggleBtn.addEventListener('click', toggleLanguage);

  applyLanguage(currentLang);



  // ------------------------------------------------------------------------
  // Top Reading / Scroll Progress Bar
  // ------------------------------------------------------------------------
  const scrollProgress = document.getElementById('scrollProgress');
  // Scroll handler combined below


  // ------------------------------------------------------------------------
  // 2. Intelligent Custom Cursor (Desktop Only)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 2. Intelligent Professional Luxury Custom Cursor System
  // ------------------------------------------------------------------------
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const isTouchDevice = window.matchMedia('(hover: none) or (pointer: coarse)').matches;

  if (!isTouchDevice && cursorDot && cursorRing) {
    let mouseX = -100;
    let mouseY = -100;
    let prevMouseX = -100;
    let prevMouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let currentDotScale = 1;
    let targetDotScale = 1;
    let isInitialized = false;
    let cursorIdleTimer;
    let isAnimating = true;

    document.body.classList.add('cursor-active');

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isInitialized) {
        ringX = mouseX;
        ringY = mouseY;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        isInitialized = true;
      }

      clearTimeout(cursorIdleTimer);
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(animateCursorSystem);
      }
      cursorIdleTimer = setTimeout(() => {
        isAnimating = false;
      }, 2000);
    }, { passive: true });

    // Start initial timer
    cursorIdleTimer = setTimeout(() => {
      isAnimating = false;
    }, 2000);

    // Smooth physics loop for inertia trailing ring & expanding moving dot
    function animateCursorSystem() {
      if (!isAnimating) return;
      if (isInitialized) {
        // 1. Calculate movement velocity
        const dx = mouseX - prevMouseX;
        const dy = mouseY - prevMouseY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        // Dot scales up when moving (from 1.0x up to 2.4x)
        targetDotScale = 1 + Math.min(speed * 0.08, 1.4);
        currentDotScale += (targetDotScale - currentDotScale) * 0.18;

        // Apply dynamic scale and position to dot
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${currentDotScale.toFixed(3)})`;

        // Update previous mouse position smoothly
        prevMouseX = mouseX;
        prevMouseY = mouseY;

        // 2. Smooth trailing outer ring (0.16 lerp)
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      requestAnimationFrame(animateCursorSystem);
    }
    requestAnimationFrame(animateCursorSystem);

    const interactiveSelector = 'a, button, input, textarea, select, .menu-card, .highlight-card, .info-card, .story-card, .gallery-card, .quick-action-item, .visit-card, .review-cta-banner, .tab-btn, .portion-btn, .theme-toggle, .concierge-floating-toggle, .mobile-nav-toggle, #sendMsgBtn, .dish-modal, .menu-price, .item-tag, .badge, .nav-link, .drawer-link, .btn-sticky-call, .btn-sticky-menu, .btn-sticky-concierge';

    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(interactiveSelector);
      if (target) {
        cursorRing.classList.add('cursor-hidden');
        cursorDot.classList.add('cursor-hidden');
        document.body.classList.add('cursor-item-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(interactiveSelector);
      if (target) {
        cursorRing.classList.remove('cursor-hidden');
        cursorDot.classList.remove('cursor-hidden');
        document.body.classList.remove('cursor-item-hover');
      }
    });

    document.addEventListener('mousedown', () => {
      cursorRing.classList.add('clicking');
      cursorDot.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
      cursorRing.classList.remove('clicking');
      cursorDot.classList.remove('clicking');
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }

  // ------------------------------------------------------------------------
  // Magnetic Buttons Effect
  // ------------------------------------------------------------------------
  if (!isTouchDevice) {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // ------------------------------------------------------------------------
  // Scroll-Triggered Reveals
  // ------------------------------------------------------------------------
  const revealItems = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('revealed'));
  }

  // ------------------------------------------------------------------------
  // Smart Open / Closed Status Calculation
  // ------------------------------------------------------------------------
  function checkRestaurantStatus() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (3600000 * 5.5));
    
    const hours = ist.getHours();
    const minutes = ist.getMinutes();
    const currentTimeVal = hours * 60 + minutes;
    
    const openTimeVal = 16 * 60;
    const closeTimeVal = 23 * 60 + 45;
    
    const isOpen = currentTimeVal >= openTimeVal && currentTimeVal <= closeTimeVal;

    const navStatusText = document.getElementById('navStatusText');
    const navStatusIndicator = document.getElementById('navStatusIndicator');
    const heroLiveStatus = document.getElementById('heroLiveStatus');
    const heroStatusLabel = document.getElementById('heroStatusLabel');
    const visitHoursStatus = document.getElementById('visitHoursStatus');
    const visitDetailBadge = document.getElementById('visitDetailBadge');
    const visitStatusDot = document.getElementById('visitStatusDot');
    const contactStatusPill = document.getElementById('contactStatusPill');

    if (isOpen) {
      if (navStatusText) navStatusText.textContent = 'Open Now (Till 11:45 PM)';
      if (navStatusIndicator) navStatusIndicator.classList.remove('closed');
      if (heroLiveStatus) heroLiveStatus.classList.remove('closed');
      if (heroStatusLabel) heroStatusLabel.textContent = 'OPEN NOW • Serving Fresh Daily (Till 11:45 PM)';
      if (visitHoursStatus) visitHoursStatus.textContent = 'OPEN NOW — All Days: 04:00 PM – 11:45 PM';
      if (visitDetailBadge) visitDetailBadge.classList.remove('closed');
      if (visitStatusDot) visitStatusDot.classList.remove('closed');
      if (contactStatusPill) {
        contactStatusPill.classList.remove('closed');
        contactStatusPill.innerHTML = '<i class="fas fa-circle status-pulse-dot"></i> Open Now (Till 11:45 PM)';
      }
    } else {
      if (navStatusText) navStatusText.textContent = 'Opens at 4:00 PM';
      if (navStatusIndicator) navStatusIndicator.classList.add('closed');
      if (heroLiveStatus) heroLiveStatus.classList.add('closed');
      if (heroStatusLabel) heroStatusLabel.textContent = 'CLOSED NOW • Opens Today at 04:00 PM';
      if (visitHoursStatus) visitHoursStatus.textContent = 'CLOSED NOW — Opens at 04:00 PM Daily';
      if (visitDetailBadge) visitDetailBadge.classList.add('closed');
      if (visitStatusDot) visitStatusDot.classList.add('closed');
      if (contactStatusPill) {
        contactStatusPill.classList.add('closed');
        contactStatusPill.innerHTML = '<i class="fas fa-circle status-pulse-dot"></i> CLOSED NOW • Opens at 4:00 PM';
      }
    }
  }

  checkRestaurantStatus();
  setInterval(checkRestaurantStatus, 60000);

  // ------------------------------------------------------------------------
  // Navbar & Mobile Drawer Controls
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const scrollBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        // Top Reading / Scroll Progress Bar
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight || 1)) * 100;
        if (scrollProgress) {
          scrollProgress.style.width = scrollPercent + '%';
        }

        // Scrollspy logic
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
        
        let currentSection = '';
        sections.forEach(sec => {
          if (window.scrollY >= sec.offsetTop - 90) currentSection = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
        });

        if (scrollBtn) scrollBtn.classList.toggle('visible', window.scrollY > 350);

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (mobileDrawer && mobileNavToggle) {
      mobileDrawer.classList.add('open');
      mobileNavToggle.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer && mobileNavToggle) {
      mobileDrawer.classList.remove('open');
      mobileNavToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileNavToggle) mobileNavToggle.addEventListener('click', () => {
    if (mobileDrawer && mobileDrawer.classList.contains('open')) closeDrawer();
    else openDrawer();
  });

  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeDrawer();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });

  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------------------
  // Story Scroll Dots Indicator & Interactive Nav
  // ------------------------------------------------------------------------
  const storyScrollWrapper = document.getElementById('storyScrollWrapper');
  const storyDots = document.querySelectorAll('#storyDots .dot');
  const storyCards = document.querySelectorAll('#storyScrollTrack .story-card');

  if (storyScrollWrapper && storyDots.length > 0) {
    storyScrollWrapper.addEventListener('scroll', () => {
      const scrollLeft = storyScrollWrapper.scrollLeft;
      const cardWidth = (storyCards[0]?.offsetWidth || 300) + 20;
      const index = Math.min(storyDots.length - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
      storyDots.forEach((dot, idx) => dot.classList.toggle('active', idx === index));
    }, { passive: true });

    storyDots.forEach((dot, idx) => {
      dot.style.cursor = 'pointer';
      dot.addEventListener('click', () => {
        if (storyCards[idx]) {
          storyCards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // Preserved Full Menu Data
  // ------------------------------------------------------------------------
  const fullMenuData = {
    'ભજીયા': [
      { id: 'item-1', name: 'કુંભણીયા (100 gm)', desc: 'Signature Gujarati Specialty', price: '₹50', catKey: 'bhajiya' },
      { id: 'item-2', name: 'પટ્ટી મરચા (100 gm)', desc: 'Traditional Bhajiya', price: '₹50', catKey: 'bhajiya' },
      { id: 'item-3', name: 'ભરેલા મરચા (100 gm)', desc: 'Stuffed Chili Fry', price: '₹50', catKey: 'bhajiya' },
      { id: 'item-4', name: 'મેથીના ભજીયા (100 gm)', desc: 'Fresh Fenugreek Bhajiya', price: '₹50', catKey: 'bhajiya' },
      { id: 'item-5', name: 'બટેટા પતરી (100 gm)', desc: 'Crispy Potato Wafers', price: '₹50', catKey: 'bhajiya' },
      { id: 'item-6', name: 'ફ્રેન્ચ ફ્રાય (100 gm)', desc: 'Golden French Fries', price: '₹50', catKey: 'bhajiya' }
    ],
    'Ice Cream': [
      { id: 'item-7', name: 'સ્પે. ગોટાળો (cup/1 kg)', desc: 'House Specialty Cup', price: '₹30/₹290', catKey: 'ice-cream' },
      { id: 'item-8', name: 'સ્પે. મલાઈ (cup/1 kg)', desc: 'Rich Creamy Malai', price: '₹30/₹290', catKey: 'ice-cream' },
      { id: 'item-9', name: 'માવા બદામ (cup/1 kg)', desc: 'Mawa Almond Flavor', price: '₹30/₹290', catKey: 'ice-cream' },
      { id: 'item-10', name: 'પાઈનેપલ (cup/1 kg)', desc: 'Tropical Pineapple Cup', price: '₹35/₹350', catKey: 'ice-cream' },
      { id: 'item-11', name: 'અમેરિકન ડ્રાયફ્રુટ (cup/1 kg)', desc: 'American Dryfruit Delight', price: '₹35/₹350', catKey: 'ice-cream' },
      { id: 'item-12', name: 'ઉમા સ્પેશ્યલ (cup/1 kg)', desc: 'Grand Uma Special', price: '₹40/₹400', catKey: 'ice-cream' },
      { id: 'item-13', name: 'ચોકલેટ (cup/1 kg)', desc: 'Rich Chocolate Cup', price: '₹30/₹300', catKey: 'ice-cream' },
      { id: 'item-14', name: 'સીતાફળ (cup/1 kg)', desc: 'Custard Apple Cup', price: '₹40/₹400', catKey: 'ice-cream' },
      { id: 'item-15', name: 'માવા મલાઈ (candy)', desc: 'Stick Candy', price: '₹25', catKey: 'ice-cream' },
      { id: 'item-16', name: 'માવા ટોપરા (candy)', desc: 'Coconut Mawa Candy', price: '₹30', catKey: 'ice-cream' },
      { id: 'item-17', name: 'જાંબુ (candy)', desc: 'Jamun Candy', price: '₹35', catKey: 'ice-cream' },
      { id: 'item-18', name: 'ઓરીયો (candy)', desc: 'Oreo Biscuit Candy', price: '₹30', catKey: 'ice-cream' },
      { id: 'item-19', name: 'સ્ટ્રોબેરી (candy)', desc: 'Fruity Strawberry Candy', price: '₹30', catKey: 'ice-cream' },
      { id: 'item-20', name: 'અમુલ ફ્રોસ્ટિક (candy)', desc: 'Amul Frostik Bar', price: '₹35', catKey: 'ice-cream' },
      { id: 'item-21', name: 'રાસબરી (candy)', desc: 'Raspberry Candy', price: '₹15', catKey: 'ice-cream' },
      { id: 'item-22', name: 'ચોકલેટ કોન', desc: 'Crispy Chocolate Cone', price: '₹20', catKey: 'ice-cream' }
    ],
    'Drinks': [
      { id: 'item-23', name: 'થમ્સઅપ', desc: 'Cold Soda Beverage', price: '₹20', catKey: 'drinks' },
      { id: 'item-24', name: 'સ્પ્રાઈટ', desc: 'Refreshing Lemon Soda', price: '₹20', catKey: 'drinks' },
      { id: 'item-25', name: 'માઝા', desc: 'Rich Mango Juice Drink', price: '₹20', catKey: 'drinks' },
      { id: 'item-26', name: 'સોસીયો', desc: 'Authentic Gujarati Soda', price: '₹20', catKey: 'drinks' },
      { id: 'item-27', name: 'છાસ', desc: 'Fresh Spiced Buttermilk', price: '₹20', catKey: 'drinks' }
    ]
  };

  const allDishesList = [];
  Object.entries(fullMenuData).forEach(([catName, items]) => {
    items.forEach(item => allDishesList.push({ ...item, categoryName: catName }));
  });

  // ------------------------------------------------------------------------
  // Menu Filter Tabs & Advanced Search
  // ------------------------------------------------------------------------
  const categoryTabs = document.querySelectorAll('.category-tabs .tab-btn');
  const menuCards = document.querySelectorAll('#menuGrid .menu-card');
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const menuSearchInput = document.getElementById('menuSearchInput');
  const searchClear = document.getElementById('searchClear');
  const searchResultCount = document.getElementById('searchResultCount');
  const menuEmptyState = document.getElementById('menuEmptyState');
  const resetSearchBtn = document.getElementById('resetSearchBtn');

  let activeCategory = 'all';

  function filterMenu(resetAllPagination = false) {
    const query = menuSearchInput ? menuSearchInput.value.trim().toLowerCase() : '';
    const matchingCards = [];

    menuCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const cardName = (card.getAttribute('data-name') || '').toLowerCase();
      const cardDesc = (card.getAttribute('data-desc') || '').toLowerCase();
      const matchesCategory = (activeCategory === 'all') || (cardCat === activeCategory);
      const matchesSearch = !query || cardName.includes(query) || cardDesc.includes(query);

      if (matchesCategory && matchesSearch) {
        matchingCards.push(card);
      } else {
        card.style.display = 'none';
      }
    });

    if (activeCategory === 'all' && query === '') {
      if (resetAllPagination) {
        // Reset all cards beyond initial 6 to hidden state
        matchingCards.forEach((card, idx) => {
          if (idx < 6) {
            card.classList.remove('hidden');
            card.style.display = 'flex';
          } else {
            card.classList.add('hidden');
            card.style.display = 'none';
          }
        });
      } else {
        // Maintain existing revealed state
        matchingCards.forEach(card => {
          if (card.classList.contains('hidden')) {
            card.style.display = 'none';
          } else {
            card.style.display = 'flex';
          }
        });
      }

      const visibleNow = matchingCards.filter(c => !c.classList.contains('hidden')).length;
      if (searchResultCount) {
        searchResultCount.textContent = `Showing ${visibleNow} of ${matchingCards.length} items`;
      }

      if (viewMoreBtn) {
        const hasHidden = matchingCards.some(c => c.classList.contains('hidden'));
        viewMoreBtn.style.display = hasHidden ? 'inline-flex' : 'none';
      }
    } else {
      // Specific category or active search query: show all matches
      matchingCards.forEach(card => {
        card.classList.remove('hidden');
        card.style.display = 'flex';
      });

      if (searchResultCount) {
        if (query.length > 0) {
          searchResultCount.textContent = `Found ${matchingCards.length} matching dish${matchingCards.length === 1 ? '' : 'es'}`;
        } else {
          searchResultCount.textContent = `Showing all ${matchingCards.length} items in this category`;
        }
      }

      if (viewMoreBtn) {
        viewMoreBtn.style.display = 'none';
      }
    }

    if (menuEmptyState) {
      menuEmptyState.style.display = (matchingCards.length === 0) ? 'block' : 'none';
    }
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-category');
      UMAAnalytics.track('category_view', { category: activeCategory });
      filterMenu(true); // Reset to first 6 items whenever switching back to All
    });
  });

  if (menuSearchInput) {
    let searchTimeout;
    menuSearchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        if (searchClear) {
          searchClear.classList.toggle('visible', menuSearchInput.value.length > 0);
        }
        UMAAnalytics.track('search', { query: menuSearchInput.value });
        filterMenu(false);
      }, 150);
    });
  }

  // Ctrl + K keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (menuSearchInput) {
        menuSearchInput.focus();
        menuSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      menuSearchInput.value = '';
      searchClear.classList.remove('visible');
      filterMenu(true);
    });
  }

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      if (menuSearchInput) menuSearchInput.value = '';
      if (searchClear) searchClear.classList.remove('visible');
      categoryTabs.forEach(t => t.classList.remove('active'));
      const allTab = document.querySelector('.category-tabs .tab-btn[data-category="all"]');
      if (allTab) allTab.classList.add('active');
      activeCategory = 'all';
      filterMenu(true);
    });
  }

  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      const hiddenCards = Array.from(menuCards).filter(c => c.classList.contains('hidden'));
      const batchSize = 6;
      for (let i = 0; i < batchSize && i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove('hidden');
        hiddenCards[i].style.display = 'flex';
      }
      
      const remainingHidden = Array.from(menuCards).filter(c => c.classList.contains('hidden'));
      const visibleCount = Array.from(menuCards).filter(c => !c.classList.contains('hidden')).length;
      
      if (searchResultCount && activeCategory === 'all' && (!menuSearchInput || !menuSearchInput.value.trim())) {
        searchResultCount.textContent = `Showing ${visibleCount} of ${menuCards.length} items`;
      }
      
      if (remainingHidden.length === 0) {
        viewMoreBtn.style.display = 'none';
      }
    });
  }

  // ------------------------------------------------------------------------
  // Menu Item Detail Modal
  // ------------------------------------------------------------------------
  const dishDetailModal = document.getElementById('dishDetailModal');
  const closeDishDetailModal = document.getElementById('closeDishDetailModal');
  const dishDetailIcon = document.getElementById('dishDetailIcon');
  const dishDetailHeading = document.getElementById('dishDetailHeading');
  const dishDetailCategory = document.getElementById('dishDetailCategory');
  const dishDetailDesc = document.getElementById('dishDetailDesc');
  const dishDetailPrice = document.getElementById('dishDetailPrice');

  menuCards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-name');
      const price = card.getAttribute('data-price');
      const desc = card.getAttribute('data-desc');
      const cat = card.getAttribute('data-category');
      const imgEl = card.querySelector('.menu-card-img');

      if (dishDetailHeading) dishDetailHeading.textContent = name;
      if (dishDetailCategory) dishDetailCategory.textContent = cat ? cat.toUpperCase() : 'SPECIALTY';
      if (dishDetailDesc) dishDetailDesc.textContent = desc;
      if (dishDetailPrice) dishDetailPrice.textContent = price;

      if (dishDetailIcon) {
        if (imgEl && imgEl.src) {
          dishDetailIcon.innerHTML = `<img src="${imgEl.src}" alt="${name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">`;
        } else {
          dishDetailIcon.innerHTML = `<i class="fas fa-utensils"></i>`;
        }
      }

      UMAAnalytics.track('dish_view', { dish: name });

      if (dishDetailModal) {
        dishDetailModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeDishDetailModal) {
    closeDishDetailModal.addEventListener('click', () => {
      if (dishDetailModal) {
        dishDetailModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ------------------------------------------------------------------------
  // AI Restaurant Concierge Client & Closed-Domain Engine
  // ------------------------------------------------------------------------
  const conciergeToggleBtn = document.getElementById('conciergeToggleBtn');
  const heroConciergeBtn = document.getElementById('heroConciergeBtn');
  const stickyConciergeBtn = document.getElementById('stickyConciergeBtn');
  const conciergeDrawer = document.getElementById('conciergeDrawer');
  const conciergeCloseBtn = document.getElementById('conciergeCloseBtn');
  const conciergeClearBtn = document.getElementById('conciergeClearBtn');
  const conciergeForm = document.getElementById('conciergeForm');
  const conciergeInput = document.getElementById('conciergeInput');
  const conciergeChatBody = document.getElementById('conciergeChatBody');
  const conciergeTypingIndicator = document.getElementById('conciergeTypingIndicator');

  const chatHistory = [];

  function openConcierge() {
    if (conciergeDrawer) {
      conciergeDrawer.classList.add('open');
      if (conciergeInput) {
        setTimeout(() => conciergeInput.focus(), 250);
      }
    }
  }

  function closeConcierge() {
    if (conciergeDrawer) {
      conciergeDrawer.classList.remove('open');
      conciergeDrawer.classList.remove('fullscreen');
      const fsIcon = document.getElementById('conciergeFullscreenIcon');
      if (fsIcon) fsIcon.className = 'fas fa-expand';
    }
  }

  function toggleConcierge(e) {
    if (e) e.preventDefault();
    if (conciergeDrawer && conciergeDrawer.classList.contains('open')) {
      closeConcierge();
    } else {
      openConcierge();
    }
  }

  if (conciergeToggleBtn) conciergeToggleBtn.addEventListener('click', toggleConcierge);
  if (heroConciergeBtn) heroConciergeBtn.addEventListener('click', toggleConcierge);
  if (stickyConciergeBtn) stickyConciergeBtn.addEventListener('click', toggleConcierge);
  if (conciergeCloseBtn) conciergeCloseBtn.addEventListener('click', closeConcierge);

  if (conciergeClearBtn) {
    conciergeClearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      chatHistory.length = 0;
      if (conciergeChatBody) {
        conciergeChatBody.innerHTML = `
          <div class="chat-bubble bot-bubble">
            <p>🙏 Welcome to <strong>UMA Kumbhaniya</strong>! I am <strong>TasteAI</strong>, your smart food assistant grounded strictly in our official menu and restaurant data. Ask me anything about our Gujarati snacks, ice creams, drinks, prices, or operating hours.</p>
          </div>
          <div class="concierge-quick-prompts" id="conciergeQuickPrompts">
            <button class="prompt-chip" data-query="What snacks do you serve?">🌶 Handcrafted snacks</button>
            <button class="prompt-chip" data-query="What ice creams are available?">🍦 Ice cream flavors</button>
            <button class="prompt-chip" data-query="What dishes are under ₹50?">💰 Dishes under ₹50</button>
            <button class="prompt-chip" data-query="Are you open now?">🕐 Opening hours</button>
            <button class="prompt-chip" data-query="Where is the restaurant located?">📍 Location &amp; Directions</button>
            <button class="prompt-chip" data-query="What is your phone number?">📞 Contact number</button>
          </div>`;
      }
      if (conciergeInput) {
        conciergeInput.value = '';
        conciergeInput.focus();
      }
    });
  }

  // Event delegation on chat body for all prompt chips (even after clear chat)
  if (conciergeChatBody) {
    conciergeChatBody.addEventListener('click', (e) => {
      const chip = e.target.closest('.prompt-chip');
      if (chip) {
        const q = chip.getAttribute('data-query');
        if (q) handleConciergeQuery(q);
      }
    });
  }

  function formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--gold-highlight);text-decoration:underline;">$1</a>')
      .replace(/\n/g, '<br>');
  }

  function appendChatMessage(text, isUser = false, sourceType = null) {
    if (!conciergeChatBody) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`;
    
    let htmlContent = `<p>${formatMarkdown(text)}</p>`;
    if (!isUser && sourceType) {
      const sourceIcons = {
        menu: 'fas fa-utensils',
        restaurant_info: 'fas fa-circle-check',
        faq: 'fas fa-circle-info',
        website: 'fas fa-globe'
      };
      const sourceLabels = {
        menu: 'Verified Menu Data',
        restaurant_info: 'Official Restaurant Info',
        faq: 'Verified FAQ',
        website: 'Website Content'
      };
      htmlContent += `<div class="chat-source-badge"><i class="${sourceIcons[sourceType] || 'fas fa-check'}"></i> ${sourceLabels[sourceType] || 'Verified Data'}</div>`;
    }
    
    bubble.innerHTML = htmlContent;
    conciergeChatBody.appendChild(bubble);
    conciergeChatBody.scrollTop = conciergeChatBody.scrollHeight;
  }

  function showTyping(show = true) {
    if (conciergeTypingIndicator) {
      conciergeTypingIndicator.style.display = show ? 'flex' : 'none';
      if (show && conciergeChatBody) {
        conciergeChatBody.scrollTop = conciergeChatBody.scrollHeight;
      }
    }
  }

  // Local closed-domain fallback engine
  function executeLocalFallback(query) {
    const q = query.toLowerCase().trim();
    
    // 1. Off-topic check (strictly outside restaurant domain)
    const offTopic = ['who is the prime minister', 'who is the president', 'what is the capital of', 'weather in', 'tell me a joke', 'write code', 'solve math', 'calculate', 'python script', 'translate french'];
    if (offTopic.some(t => q.includes(t))) {
      return {
        answer: "I can only answer questions using information available on the restaurant's website.",
        sourceType: null
      };
    }

    // 2. Greetings & Welcome intent
    if (/^(hi|hello|hey|namaste|kem cho|good morning|good afternoon|good evening|pranam)\b/i.test(q) || q === 'hi' || q === 'hello' || q === 'hey') {
      return {
        answer: "🙏 **Namaste! Welcome to UMA Kumbhaniya.**\n\nI am your restaurant assistant. You can ask me about:\n• 🌶 **Handcrafted Gujarati Snacks** (Kumbhaniya, Bharela Marcha, Methi Bhajiya)\n• 🍦 **Artisanal Ice Creams** (Special Gotalo, Malai, Mawa Candies)\n• 🥤 **Chilled Beverages** (Chaas, Sosyo, Maaza)\n• 🕐 **Opening Hours** (4:00 PM – 11:45 PM daily)\n• 📍 **Location in Babra & Takeaways (+91 90991 28700)**\n\nHow may I help you today?",
        sourceType: 'restaurant_info'
      };
    }

    // 3. Recommendations & Popular Dishes intent
    if (q.includes('recommend') || q.includes('popular') || q.includes('best') || q.includes('special') || q.includes('famous') || q.includes('must try') || q.includes('suggest')) {
      return {
        answer: "🌟 **UMA Kumbhaniya Signature Recommendations:**\n\n1. 🌶 **કુંભણીયા (Kumbhaniya)** — ₹50 (100 gm)\n   *Our golden, crispy house specialty served fresh with chutneys.*\n2. 🌶 **મેથીના ભજીયા (Methi Bhajiya)** — ₹50 (100 gm)\n   *Soft, fragrant fenugreek fritters fried daily in fresh oil.*\n3. 🍦 **સ્પે. ગોટાળો (Special Gotalo Ice Cream)** — ₹30 / cup\n   *Our most famous artisanal dessert packed with rich dry-fruit textures.*\n4. 🥤 **છાસ (Chilled Spiced Buttermilk)** — ₹20\n   *Refreshing, lightly spiced authentic Gujarati accompaniment.*",
        sourceType: 'menu'
      };
    }

    // 4. Menu Overview & "What do you have/serve"
    if (q.includes('menu') || q.includes('what do you serve') || q.includes('what food') || q.includes('what do you have') || q.includes('items') || q.includes('dishes') || q.includes('list')) {
      return {
        answer: "🍽 **UMA Kumbhaniya Complete Menu Categories:**\n\n• 🌶 **ગુજરાતી ભજીયા (Snacks - All ₹50/100gm):** કુંભણીયા, પટ્ટી મરચા, ભરેલા મરચા, મેથીના ભજીયા, બટેટા પતરી, ફ્રેન્ચ ફ્રાય\n• 🍦 **આઈસ્ક્રીમ (Ice Creams):** સ્પે. ગોટાળો (₹30), સ્પે. મલાઈ (₹30), ઉમા સ્પેશ્યલ (₹40), સીતાફળ (₹40), Candies (₹15–₹35), 1 kg Tubs (₹290–₹400)\n• 🥤 **પીણાં (Drinks - All ₹20):** સોસીયો, છાસ, થમ્સઅપ, સ્પ્રાઈટ, માઝા\n\n*You can view the full menu on the page or download our PDF menu!*",
        sourceType: 'menu'
      };
    }

    // 5. Vegetarian / Dietary inquiry
    if (q.includes('veg') || q.includes('vegetarian') || q.includes('jain') || q.includes('egg') || q.includes('non veg') || q.includes('meat') || q.includes('halal') || q.includes('pure')) {
      return {
        answer: "🌱 **100% Pure Vegetarian:**\nAll snacks, Kumbhaniya, Bhajiya, ice creams, candies, and drinks at UMA Kumbhaniya are 100% pure vegetarian, prepared daily with fresh ingredients in a hygienic traditional kitchen.",
        sourceType: 'faq'
      };
    }

    // 6. Pricing & Rates inquiry
    if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('rate') || q.includes('how much') || q.includes('ભાવ')) {
      return {
        answer: "💰 **Official Pricing Overview:**\n• **All Snacks / Bhajiya:** ₹50 per 100 gm\n• **All Chilled Beverages:** ₹20 per bottle/glass\n• **Ice Cream Cups:** ₹30 – ₹40\n• **Ice Cream Candies:** ₹15 – ₹35\n• **1 kg Family Ice Cream Tubs:** ₹290 – ₹400\n*All prices are inclusive of applicable taxes.*",
        sourceType: 'menu'
      };
    }

    // 7. Hours intent
    if (q.includes('hour') || q.includes('time') || q.includes('open') || q.includes('close') || q.includes('timing') || q.includes('ક્યારે') || q.includes('when')) {
      return {
        answer: "🕐 **Operating Hours:**\nWe are open **All Days from 04:00 PM to 11:45 PM IST** in Babra, Gujarat. Fresh hot snacks and ice creams are served daily!",
        sourceType: 'restaurant_info'
      };
    }

    // 8. Location / Directions intent
    if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('map') || q.includes('direction') || q.includes('ક્યાં') || q.includes('બાબરા') || q.includes('city')) {
      return {
        answer: "📍 **Location & Address:**\nUMA Kumbhaniya is located in **Babra, Gujarat, India**.\n[Click here to open Google Maps Directions](https://share.google/b7FRXB55yZA1rSwgN).",
        sourceType: 'restaurant_info'
      };
    }

    // 9. Phone / Contact / Takeaway intent
    if (q.includes('phone') || q.includes('call') || q.includes('number') || q.includes('contact') || q.includes('order') || q.includes('takeaway') || q.includes('parcel') || q.includes('delivery') || q.includes('ફોન')) {
      return {
        answer: "📞 **Phone & Takeaway Orders:**\nYou can call us directly at **+91 90991 28700** for takeaway orders or visiting enquiries in Babra.",
        sourceType: 'restaurant_info'
      };
    }

    // 10. Table booking / Reservation inquiry
    if (q.includes('book') || q.includes('reservation') || q.includes('reserve') || q.includes('table')) {
      return {
        answer: "✦ **Walk-in Hospitality:**\nWe do not operate a table reservation system. We warmly welcome all walk-in guests directly from 4:00 PM to 11:45 PM daily!",
        sourceType: 'faq'
      };
    }

    // 11. Price filter (under X)
    const priceMatch = q.match(/(?:under|below|less than|within)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i);
    if (priceMatch) {
      const maxP = parseInt(priceMatch[1], 10);
      const filtered = allDishesList.filter(d => {
        const pNum = parseInt(d.price.replace(/[^\d]/g, ''), 10);
        return pNum && pNum <= maxP;
      });
      if (filtered.length > 0) {
        const list = filtered.map(i => `• **${i.name}** (${i.categoryName}) — ${i.price}`).join('\n');
        return {
          answer: `✨ **Dishes Under ₹${maxP}:**\n\n${list}`,
          sourceType: 'menu'
        };
      }
    }

    // 12. Snacks category query
    if (q.includes('snack') || q.includes('bhajiya') || q.includes('kumbhaniya') || q.includes('ભજીયા') || q.includes('કુંભણીયા') || q.includes('marcha') || q.includes('fry') || q.includes('pakora')) {
      const items = fullMenuData['ભજીયા'].map(i => `• **${i.name}** — ${i.price} (${i.desc})`).join('\n');
      return {
        answer: `🌶 **Our Handcrafted Gujarati Snacks (All ₹50 per 100 gm):**\n\n${items}`,
        sourceType: 'menu'
      };
    }

    // 13. Ice Cream query
    if (q.includes('ice cream') || q.includes('icecream') || q.includes('sweet') || q.includes('dessert') || q.includes('આઈસ્ક્રીમ') || q.includes('મલાઈ') || q.includes('candy') || q.includes('gotalo')) {
      const items = fullMenuData['Ice Cream'].map(i => `• **${i.name}** — ${i.price}`).join('\n');
      return {
        answer: `🍦 **Our Artisanal Ice Creams & Candies:**\n\n${items}`,
        sourceType: 'menu'
      };
    }

    // 14. Drinks query
    if (q.includes('drink') || q.includes('chaas') || q.includes('beverage') || q.includes('cold') || q.includes('છાસ') || q.includes('સોસીયો') || q.includes('maaza') || q.includes('sprite')) {
      const items = fullMenuData['Drinks'].map(i => `• **${i.name}** — ${i.price}`).join('\n');
      return {
        answer: `🥤 **Refreshing Chilled Beverages (All ₹20):**\n\n${items}`,
        sourceType: 'menu'
      };
    }

    // 15. Search specific menu dish
    const matched = allDishesList.filter(d => q.includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(q) || (d.desc && q.includes(d.desc.toLowerCase())));
    if (matched.length > 0) {
      const list = matched.map(m => `• **${m.name}** (${m.categoryName}): ${m.price} — *${m.desc}*`).join('\n');
      return {
        answer: `✨ **Found Matching Dish:**\n\n${list}\n\nHave any questions? Call us directly at **+91 90991 28700**!`,
        sourceType: 'menu'
      };
    }

    // 16. About / Heritage query
    if (q.includes('about') || q.includes('story') || q.includes('history') || q.includes('heritage') || q.includes('who are you')) {
      return {
        answer: "🏛 **About UMA Kumbhaniya:**\nUMA Kumbhaniya is a celebrated food landmark in Babra, Gujarat. We bring the authentic taste of Saurashtra with recipes passed down through generations. Every dish is crafted from fresh ingredients with generous hospitality.",
        sourceType: 'website'
      };
    }

    return {
      answer: "I couldn't find that information on the restaurant's website. You can call us directly at **+91 90991 28700** for any specific enquiries!",
      sourceType: null
    };
  }

  // ------------------------------------------------------------------------
  // Mode Controller (8-Hour Rolling Limit & VIP Passcode Unlock)
  // ------------------------------------------------------------------------
  const MAX_SMART_MSGS = 5;
  const WINDOW_MS = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
  const VIP_PASSCODE = 'Uma@2007';

  const conciergeUnlockBtn = document.getElementById('conciergeUnlockBtn');
  const conciergeUnlockPanel = document.getElementById('conciergeUnlockPanel');
  const unlockPanelCloseBtn = document.getElementById('unlockPanelCloseBtn');
  const unlockPasscodeForm = document.getElementById('unlockPasscodeForm');
  const unlockPasscodeInput = document.getElementById('unlockPasscodeInput');
  const unlockErrorMsg = document.getElementById('unlockErrorMsg');

  const conciergeModeToggle = document.getElementById('conciergeModeToggle');
  const conciergeModeIcon = document.getElementById('conciergeModeIcon');
  const conciergeModeText = document.getElementById('conciergeModeText');

  function isVipUnlocked() {
    return localStorage.getItem('uma_vip_unlocked') === 'true';
  }

  if (conciergeUnlockBtn) {
    conciergeUnlockBtn.addEventListener('click', () => {
      if (conciergeUnlockPanel) {
        const isHidden = conciergeUnlockPanel.style.display === 'none';
        conciergeUnlockPanel.style.display = isHidden ? 'block' : 'none';
        if (isHidden && unlockPasscodeInput) {
          unlockPasscodeInput.value = '';
          if (unlockErrorMsg) unlockErrorMsg.style.display = 'none';
          unlockPasscodeInput.focus();
        }
      }
    });
  }

  if (unlockPanelCloseBtn) {
    unlockPanelCloseBtn.addEventListener('click', () => {
      if (conciergeUnlockPanel) conciergeUnlockPanel.style.display = 'none';
    });
  }

  if (unlockPasscodeForm) {
    unlockPasscodeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = (unlockPasscodeInput ? unlockPasscodeInput.value.trim() : '');
      if (entered === VIP_PASSCODE) {
        localStorage.setItem('uma_vip_unlocked', 'true');
        if (conciergeUnlockPanel) conciergeUnlockPanel.style.display = 'none';
        updateModeUI();
        appendChatMessage("👑 **VIP Access Activated!**\nUnlimited Smart AI questions are now unlocked on this device.", false, 'restaurant_info');
      } else {
        if (unlockErrorMsg) {
          unlockErrorMsg.textContent = '❌ Incorrect password. Please try again.';
          unlockErrorMsg.style.display = 'block';
        }
      }
    });
  }

  function getSmartTimestamps() {
    try {
      const raw = localStorage.getItem('uma_smart_timestamps_v3');
      const list = raw ? JSON.parse(raw) : [];
      const now = Date.now();
      // Keep only timestamps within the last 8 hours
      const valid = list.filter(ts => (now - ts) < WINDOW_MS);
      if (valid.length !== list.length) {
        localStorage.setItem('uma_smart_timestamps_v3', JSON.stringify(valid));
      }
      return valid;
    } catch (e) {
      return [];
    }
  }

  function recordSmartCall() {
    const valid = getSmartTimestamps();
    valid.push(Date.now());
    localStorage.setItem('uma_smart_timestamps_v3', JSON.stringify(valid));
  }

  const conciergeFullscreenBtn = document.getElementById('conciergeFullscreenBtn');
  const conciergeFullscreenIcon = document.getElementById('conciergeFullscreenIcon');

  if (conciergeFullscreenBtn) {
    conciergeFullscreenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (conciergeDrawer) {
        const isFull = conciergeDrawer.classList.toggle('fullscreen');
        if (conciergeFullscreenIcon) {
          conciergeFullscreenIcon.className = isFull ? 'fas fa-compress' : 'fas fa-expand';
        }
        conciergeFullscreenBtn.title = isFull ? 'Exit Fullscreen' : 'Toggle Fullscreen';
      }
    });
  }

  function getTimeRemainingText(timestamps) {
    if (!timestamps || timestamps.length === 0) return '';
    const now = Date.now();
    const oldest = timestamps[0];
    const msLeft = Math.max(0, WINDOW_MS - (now - oldest));
    let hours = Math.floor(msLeft / (60 * 60 * 1000));
    let mins = Math.floor((msLeft % (60 * 60 * 1000)) / (60 * 1000));
    if (mins === 0 && hours === 0) return '1m';
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  }

  let currentMode = isVipUnlocked() ? 'smart' : ((getSmartTimestamps().length >= MAX_SMART_MSGS) ? 'local' : (sessionStorage.getItem('uma_ai_mode') || 'smart'));

  function updateModeUI() {
    if (!conciergeModeToggle || !conciergeModeText) return;

    if (isVipUnlocked()) {
      currentMode = 'smart';
      conciergeModeToggle.className = 'concierge-mode-toggle mode-vip';
      conciergeModeToggle.title = '👑 VIP Mode Active: Unlimited Smart AI queries on this device.';
      conciergeModeText.textContent = '👑 VIP';
      if (conciergeModeIcon) conciergeModeIcon.className = 'fas fa-crown';
      return;
    }

    const validTimestamps = getSmartTimestamps();
    const used = validTimestamps.length;

    if (used >= MAX_SMART_MSGS) {
      currentMode = 'local';
      const timeRemaining = getTimeRemainingText(validTimestamps);
      conciergeModeToggle.className = 'concierge-mode-toggle mode-local limit-reached';
      conciergeModeToggle.title = `8-Hour limit (5/5) reached. Resets in ${timeRemaining}. Running on Fast Engine.`;
      conciergeModeText.textContent = `Fast (${timeRemaining})`;
      if (conciergeModeIcon) conciergeModeIcon.className = 'fas fa-bolt';
      return;
    }

    if (currentMode === 'smart') {
      const remaining = MAX_SMART_MSGS - used;
      conciergeModeToggle.className = 'concierge-mode-toggle';
      conciergeModeToggle.title = `Using Smart AI (Llama 120B). ${remaining} calls left in this 8-hour window. Click to switch to Fast Engine.`;
      conciergeModeText.textContent = `Smart (${remaining})`;
      if (conciergeModeIcon) conciergeModeIcon.className = 'fas fa-sparkles';
    } else {
      conciergeModeToggle.className = 'concierge-mode-toggle mode-local';
      conciergeModeToggle.title = 'Using Fast Local Engine. Click to switch to Smart AI.';
      conciergeModeText.textContent = 'Fast Engine';
      if (conciergeModeIcon) conciergeModeIcon.className = 'fas fa-bolt';
    }
  }

  if (conciergeModeToggle) {
    conciergeModeToggle.addEventListener('click', () => {
      if (isVipUnlocked()) return; // VIP is always active
      const used = getSmartTimestamps().length;
      if (used >= MAX_SMART_MSGS) {
        return; // Locked once 8-hour limit is reached
      }
      currentMode = (currentMode === 'smart') ? 'local' : 'smart';
      sessionStorage.setItem('uma_ai_mode', currentMode);
      updateModeUI();
    });
  }

  updateModeUI();

  async function handleConciergeQuery(query) {
    const q = query.trim();
    if (!q) return;

    appendChatMessage(q, true);
    chatHistory.push({ role: 'user', content: q });
    showTyping(true);
    UMAAnalytics.track('ai_concierge_query', { query: q });

    const isVip = isVipUnlocked();
    const validTimestamps = getSmartTimestamps();
    const willUseSmart = isVip || (validTimestamps.length < MAX_SMART_MSGS && currentMode === 'smart');
    const effectiveMode = willUseSmart ? 'smart' : 'local';

    // Instant zero-lag 8-hour timestamp recording and UI update
    if (willUseSmart && !isVip) {
      recordSmartCall();
      if (getSmartTimestamps().length >= MAX_SMART_MSGS) {
        currentMode = 'local';
      }
      updateModeUI();
    }

    try {
      // Direct call to Netlify Serverless Function on netlify.app
      const apiEndpoint = window.location.hostname.includes('netlify')
        ? '/.netlify/functions/chat'
        : '/api/ai/chat';

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: q, 
          history: chatHistory, 
          mode: 'smart',
          passcode: isVip ? VIP_PASSCODE : ''
        })
      });

      if (response.ok) {
        const data = await response.json();
        showTyping(false);
        const answer = data.answer || "I couldn't find that information on the restaurant's website.";
        appendChatMessage(answer, false, data.sourceType);
        chatHistory.push({ role: 'bot', content: answer });
        return;
      }
    } catch (err) {
      console.warn('AI Endpoint fallback to local engine:', err);
    }

    // Instant local grounded fallback for static Netlify host
    setTimeout(() => {
      showTyping(false);
      const fallback = executeLocalFallback(q);
      appendChatMessage(fallback.answer, false, fallback.sourceType);
      chatHistory.push({ role: 'bot', content: fallback.answer });
    }, 350);
  }

  if (conciergeForm) {
    conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (conciergeInput && conciergeInput.value.trim()) {
        const text = conciergeInput.value.trim();
        conciergeInput.value = '';
        handleConciergeQuery(text);
      }
    });
  }



  // ------------------------------------------------------------------------
  // Live Distance Calculator — Haversine Formula
  // ------------------------------------------------------------------------
  const calcDistanceBtn = document.getElementById('calcDistanceBtn');
  const distanceResult = document.getElementById('distanceResult');
  const distanceValue = document.getElementById('distanceValue');

  const RESTAURANT_LAT = 21.8421255;
  const RESTAURANT_LNG = 71.2986685;

  function calculateHaversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  if (calcDistanceBtn) {
    calcDistanceBtn.addEventListener('click', () => {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
      }

      calcDistanceBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const distKm = calculateHaversine(userLat, userLng, RESTAURANT_LAT, RESTAURANT_LNG);
          
          if (distanceResult && distanceValue) {
            distanceResult.style.display = 'flex';
            const navUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=21.8421255,71.2986685`;
            const formattedDist = distKm < 1 ? Math.round(distKm * 1000) + ' m' : distKm.toFixed(1) + ' km';
            distanceValue.innerHTML = `${formattedDist} <a href="${navUrl}" target="_blank" rel="noopener noreferrer" style="font-size:0.8rem;margin-left:8px;color:var(--gold-highlight);text-decoration:underline;"><i class="fas fa-location-arrow"></i> Start Directions</a>`;
          }
          calcDistanceBtn.innerHTML = '<i class="fas fa-check"></i> Location Found';
          UMAAnalytics.track('direction_click', { distance_km: distKm });
        },
        (error) => {
          console.error('Geolocation error:', error);
          calcDistanceBtn.innerHTML = '<i class="fas fa-map-pin"></i> Find My Distance';
          alert('Could not access your location. Please check browser permissions or use the navigation button below.');
        }
      );
    });
  }

  // ------------------------------------------------------------------------
  // Editorial Gallery Lightbox
  // ------------------------------------------------------------------------
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryLightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      const caption = card.getAttribute('data-caption');
      if (galleryLightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = caption || '';
        galleryLightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', (e) => {
      if (e.target === galleryLightbox) closeLightbox();
    });
  }

  function closeLightbox() {
    if (galleryLightbox) {
      galleryLightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Full Menu Modal
  const menuModal = document.getElementById('menuModal');
  const closeModal = document.getElementById('closeModal');
  const viewFullMenuBtn = document.getElementById('viewFullMenu');

  function buildModal() {
    const container = document.getElementById('modalMenuContent');
    if (!container) return;
    container.innerHTML = '';

    const categoryIcons = {
      'ભજીયા': 'fas fa-pepper-hot',
      'Ice Cream': 'fas fa-ice-cream',
      'Drinks': 'fas fa-glass-water',
    };

    Object.entries(fullMenuData).forEach(([cat, items]) => {
      const section = document.createElement('div');
      section.className = 'modal-category';
      section.innerHTML = `<h4><i class="${categoryIcons[cat] || 'fas fa-utensils'}"></i> ${cat}</h4>`;
      
      items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'modal-item';
        row.innerHTML = `
          <div class="modal-item-name">${item.name}</div>
          <div class="modal-item-price">${item.price}</div>`;
        section.appendChild(row);
      });
      container.appendChild(section);
    });
  }

  if (viewFullMenuBtn) {
    viewFullMenuBtn.addEventListener('click', () => {
      buildModal();
      if (menuModal) {
        menuModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (closeModal) closeModal.addEventListener('click', closeMenuModal);
  if (menuModal) {
    menuModal.addEventListener('click', (e) => {
      if (e.target === menuModal) closeMenuModal();
    });
  }

  function closeMenuModal() {
    if (menuModal) {
      menuModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (menuModal && menuModal.classList.contains('open')) closeMenuModal();
      if (galleryLightbox && galleryLightbox.classList.contains('open')) closeLightbox();
      if (dishDetailModal && dishDetailModal.classList.contains('open')) {
        dishDetailModal.classList.remove('open');
        document.body.style.overflow = '';
      }
      if (conciergeDrawer && conciergeDrawer.classList.contains('open')) {
        closeConcierge();
      }
    }
  });

  // ------------------------------------------------------------------------
  // Download Menu PDF Logic (html2canvas & jsPDF)
  // ------------------------------------------------------------------------
  const downloadBtn = document.getElementById('downloadMenu');
  const modalDownloadPdfBtn = document.getElementById('modalDownloadPdfBtn');

  async function triggerDownloadMenuPDF(btn) {
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    }
    try {
      if (!window.html2canvas) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      }
      if (!window.jspdf) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      }
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const wrap = document.createElement('div');
      wrap.id = 'pdf-render-wrapper';
      wrap.style.cssText = 'position:fixed;left:-99999px;top:0;width:794px;z-index:-1;pointer-events:none;';
      wrap.innerHTML = generateMenuHTML();
      document.body.appendChild(wrap);
      await new Promise(r => setTimeout(r, 500));

      const target = wrap.querySelector('.pdf-page') || wrap;
      const canvas = await html2canvas(target, {
        scale: 2, useCORS: true, allowTaint: true,
        backgroundColor: '#0E0E0E', logging: false,
        width: 794, windowWidth: 794, scrollX: 0, scrollY: 0,
        onclone: (doc) => {
          const el = doc.getElementById('pdf-render-wrapper');
          if (el) { el.style.left = '0'; el.style.position = 'static'; }
        }
      });
      document.body.removeChild(wrap);

      const { jsPDF } = window.jspdf;
      const pdfW = 210;
      const pdfH = (canvas.height * pdfW) / canvas.width;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [pdfW, pdfH] });
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, pdfW, pdfH, undefined, 'FAST');
      pdf.save('UMA-Kumbhaniya-Menu.pdf');
    } catch (err) {
      console.error('PDF error:', err);
      alert('Could not generate PDF. Please try again.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-download"></i> Download Menu PDF';
      }
    }
  }

  if (downloadBtn) downloadBtn.addEventListener('click', () => triggerDownloadMenuPDF(downloadBtn));
  if (modalDownloadPdfBtn) modalDownloadPdfBtn.addEventListener('click', () => triggerDownloadMenuPDF(modalDownloadPdfBtn));

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src; s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function generateMenuHTML() {
    // Each item: name ...dotted... price (native table valign=middle)
    const itemRow = (item) => `
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:5px;">
        <tr>
          <td valign="middle" style="padding:9px 0;font-family:Noto Sans Gujarati,sans-serif;font-size:13.5px;font-weight:600;color:#F0EBE0;white-space:nowrap;">${item.name}</td>
          <td valign="middle" style="padding:9px 8px;border-bottom:1px dotted rgba(201,162,39,0.35);"></td>
          <td valign="middle" width="85" style="padding:9px 0;font-family:Plus Jakarta Sans,sans-serif;font-size:13px;font-weight:700;color:#E8C84A;text-align:right;white-space:nowrap;">${item.price}</td>
        </tr>
      </table>`;

    // Build category sections — 2 columns
    let sections = '';
    Object.entries(fullMenuData).forEach(([cat, items]) => {
      const icon = { 'ભજીયા': '🌶️', 'Ice Cream': '🍦', 'Drinks': '🥤' }[cat] || '✦';
      const half = Math.ceil(items.length / 2);
      const leftHTML  = items.slice(0, half).map(itemRow).join('');
      const rightHTML = items.slice(half).map(itemRow).join('');

      sections += `
      <div style="margin-bottom:24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;">
          <tr>
            <td valign="middle" style="border-bottom:1px solid rgba(201,162,39,0.3);"></td>
            <td valign="middle" style="text-align:center;padding:0 18px;white-space:nowrap;">
              <span style="font-size:16px;">${icon}</span>
              <span style="font-family:Cinzel,serif;font-size:16px;font-weight:700;color:#E8D7A5;letter-spacing:0.08em;margin-left:6px;">${cat}</span>
            </td>
            <td valign="middle" style="border-bottom:1px solid rgba(201,162,39,0.3);"></td>
          </tr>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td valign="top" width="50%" style="padding:0 12px 0 0;">${leftHTML}</td>
            <td valign="top" width="50%" style="padding:0 0 0 12px;">${rightHTML}</td>
          </tr>
        </table>
      </div>`;
    });

    return `
    <div class="pdf-page" style="width:794px;background:#0E0E0E;padding:40px 46px 32px;box-sizing:border-box;font-family:Plus Jakarta Sans,sans-serif;color:#F0EBE0;border:2px solid #C9A227;position:relative;">

      <!-- Inner border frame -->
      <div style="position:absolute;top:8px;left:8px;right:8px;bottom:8px;border:1px solid rgba(201,162,39,0.3);pointer-events:none;"></div>

      <!-- Header -->
      <div style="text-align:center;padding:0 24px 22px;margin-bottom:24px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.35em;color:#C9A227;text-transform:uppercase;margin-bottom:10px;">— Babra, Gujarat —</div>
        <div style="font-family:Cinzel,serif;font-size:30px;font-weight:700;color:#FFFFFF;letter-spacing:0.06em;line-height:1.15;">UMA KUMBHANIYA</div>
        <div style="font-family:Cinzel,serif;font-size:15px;font-weight:600;color:#C9A227;letter-spacing:0.15em;margin-top:4px;">&amp; ICE CREAM</div>
        <div style="font-family:Noto Sans Gujarati,sans-serif;font-size:17px;font-weight:700;color:#E8D7A5;margin-top:10px;">ઉમા કુંભણીયા અને આઈસ્ક્રીમ</div>

        <!-- Info line -->
        <div style="text-align:center;margin-top:12px;">
          <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
            <tr>
              <td valign="middle" style="padding:5px 14px;font-size:11px;color:#C9A880;font-weight:600;text-align:center;">📍 Babra, Gujarat</td>
              <td valign="middle" style="padding:5px 0;color:rgba(201,162,39,0.35);font-size:10px;">•</td>
              <td valign="middle" style="padding:5px 14px;font-size:11px;color:#C9A880;font-weight:600;text-align:center;">📞 +91 90991 28700</td>
              <td valign="middle" style="padding:5px 0;color:rgba(201,162,39,0.35);font-size:10px;">•</td>
              <td valign="middle" style="padding:5px 14px;font-size:11px;color:#C9A880;font-weight:600;text-align:center;">🕒 4:00 PM – 11:45 PM</td>
              <td valign="middle" style="padding:5px 0;color:rgba(201,162,39,0.35);font-size:10px;">•</td>
              <td valign="middle" style="padding:5px 14px;font-size:11px;color:#C9A880;font-weight:600;text-align:center;">🌱 100% Pure Veg</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- Menu items -->
      ${sections}

      <!-- Footer -->
      <div style="text-align:center;margin-top:8px;padding-top:16px;border-top:1px solid rgba(201,162,39,0.3);">
        <div style="font-size:10.5px;color:#C9A227;font-weight:600;margin-bottom:3px;">Prepared Fresh Every Evening · Pure Ingredients · Traditional Taste</div>
        <div style="font-size:9.5px;color:#777;margin-bottom:5px;">Subject to availability · For party orders &amp; takeaways call +91 90991 28700</div>
        <div style="font-family:Cinzel,serif;font-size:11px;font-weight:700;color:#E8D7A5;letter-spacing:0.12em;">— UMA KUMBHANIYA · BABRA —</div>
      </div>
    </div>`;
  }

  // ------------------------------------------------------------------------
  // EmailJS Form Submission Handling (Preserved Service & Template IDs)
  // ------------------------------------------------------------------------
  const EMAILJS_SERVICE_ID = 'service_ln8kean';
  const EMAILJS_TEMPLATE_ID = 'template_kxdzbj4';
  const nameEl = document.getElementById('name');
  const phoneEl = document.getElementById('phone');
  const messageEl = document.getElementById('message');
  const formSuccess = document.getElementById('formSuccess');
  const sendBtn = document.getElementById('sendMsgBtn');
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', e => e.preventDefault());
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', async () => {
      clearError('name');
      clearError('phone');
      clearError('message');

      if (formSuccess) {
        formSuccess.classList.remove('show');
        formSuccess.removeAttribute('style');
        formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll get back to you soon.';
      }

      let valid = true;
      if (!nameEl || !nameEl.value.trim() || nameEl.value.trim().length < 2) {
        setError('name', 'Please enter your full name (min 2 characters)');
        valid = false;
      }

      const phoneVal = phoneEl ? phoneEl.value.trim().replace(/[\s-]/g, '') : '';
      const phoneRegex = /^(?:\+91|91)?[6789]\d{9}$/;
      if (!phoneVal || !phoneRegex.test(phoneVal)) {
        setError('phone', 'Please enter a valid 10-digit phone number');
        valid = false;
      }

      if (!messageEl || !messageEl.value.trim() || messageEl.value.trim().length < 10) {
        setError('message', 'Please write a message (min 10 characters)');
        valid = false;
      }

      if (!valid) return;

      sendBtn.disabled = true;
      sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      const templateParams = {
        from_name: nameEl.value.trim(),
        from_phone: phoneEl.value.trim(),
        message: messageEl.value.trim(),
        to_name: 'UMA Kumbhaniya',
      };

      try {
        if (window.emailjs) {
          await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        }
        if (formSuccess) {
          formSuccess.classList.add('show');
        }
        if (nameEl) nameEl.value = '';
        if (phoneEl) phoneEl.value = '';
        if (messageEl) messageEl.value = '';
        UMAAnalytics.track('contact_click', { status: 'success' });
        setTimeout(() => {
          if (formSuccess) formSuccess.classList.remove('show');
        }, 5000);
      } catch (err) {
        console.error('EmailJS error:', err);
        if (formSuccess) {
          formSuccess.style.background = 'rgba(239, 83, 80, 0.15)';
          formSuccess.style.borderColor = '#EF5350';
          formSuccess.style.color = '#FF8A80';
          formSuccess.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again or call us directly.';
          formSuccess.classList.add('show');
          setTimeout(() => {
            formSuccess.classList.remove('show');
            formSuccess.removeAttribute('style');
            formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll get back to you soon.';
          }, 6000);
        }
      } finally {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      }
    });
  }

  function setError(fieldId, msg) {
    const el = document.getElementById(fieldId);
    const errEl = document.getElementById(fieldId + 'Error');
    if (el) el.classList.add('error');
    if (errEl) errEl.textContent = msg;
  }

  function clearError(fieldId) {
    const el = document.getElementById(fieldId);
    const errEl = document.getElementById(fieldId + 'Error');
    if (el) el.classList.remove('error');
    if (errEl) errEl.textContent = '';
  }

  ['name', 'phone', 'message'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => clearError(id));
    }
  });

  // ------------------------------------------------------------------------
  // Share Website Controller
  // ------------------------------------------------------------------------
  const shareModal = document.getElementById('shareModal');
  const shareModalClose = document.getElementById('shareModalClose');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const shareWhatsapp = document.getElementById('shareWhatsapp');
  const shareFacebook = document.getElementById('shareFacebook');
  const shareTwitter = document.getElementById('shareTwitter');
  const shareCopyLink = document.getElementById('shareCopyLink');
  const shareCopyInputBtn = document.getElementById('shareCopyInputBtn');
  const shareCopyText = document.getElementById('shareCopyText');

  function openShareModal() {
    const siteUrl = window.location.href;
    const shareText = encodeURIComponent('Check out UMA Kumbhaniya in Babra for authentic Gujarati Kumbhaniya & Bhajiya!');

    if (navigator.share) {
      navigator.share({
        title: 'UMA Kumbhaniya & Ice Cream',
        text: 'Check out UMA Kumbhaniya in Babra for authentic Gujarati Kumbhaniya & Bhajiya!',
        url: siteUrl
      }).catch(() => {
        // Fallback to modal if cancelled or unsupported
        showShareModal(siteUrl, shareText);
      });
      return;
    }

    showShareModal(siteUrl, shareText);
  }

  function showShareModal(siteUrl, shareText) {
    if (shareUrlInput) shareUrlInput.value = siteUrl;
    if (shareWhatsapp) shareWhatsapp.href = `https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(siteUrl)}`;
    if (shareFacebook) shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`;
    if (shareTwitter) shareTwitter.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${shareText}`;

    if (shareModal) shareModal.classList.add('active');
  }

  function closeShareModal() {
    if (shareModal) shareModal.classList.remove('active');
  }

  function copyWebsiteLink() {
    const siteUrl = window.location.href;
    navigator.clipboard.writeText(siteUrl).then(() => {
      if (shareCopyText) {
        const originalText = shareCopyText.innerText;
        shareCopyText.innerText = currentLang === 'gu' ? 'લિંક કોપી થઈ!' : 'Copied!';
        setTimeout(() => { shareCopyText.innerText = originalText; }, 2000);
      }
      showToast(currentLang === 'gu' ? 'વેબસાઇટ લિંક કોપી થઈ ગઈ!' : 'Website link copied to clipboard!');
    });
  }

  document.querySelectorAll('#navShareBtn, #quickShareBtn, #drawerShareBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openShareModal();
    });
  });

  if (shareModalClose) shareModalClose.addEventListener('click', closeShareModal);
  if (shareModal) {
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) closeShareModal();
    });
  }
  if (shareCopyLink) shareCopyLink.addEventListener('click', copyWebsiteLink);
  if (shareCopyInputBtn) shareCopyInputBtn.addEventListener('click', copyWebsiteLink);

});
