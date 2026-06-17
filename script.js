
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 90) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
    revealOnScroll();
  });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
    scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
    const fullMenuData = {
    'ભજીયા': [
      { name: 'કુંભણીયા (100 gm)', desc: '', price: '₹50' },
      { name: 'પટ્ટી મરચા (100 gm)', desc: '', price: '₹50' },
      { name: 'ભરેલા મરચા (100 gm)', desc: '', price: '₹50' },
      { name: 'મેથીના ભજીયા (100 gm)', desc: '', price: '₹50' },
      { name: 'બટેટા પતરી (100 gm)', desc: '', price: '₹50' },
      { name: 'ફ્રેન્ચ ફ્રાય (100 gm)', desc: '', price: '₹50' }
    ],
    'Ice Cream': [
      { name: 'સ્પે. ગોટાળો (scoop/1 kg)', desc: '', price: '₹30/₹290' },
      { name: 'સ્પે. મલાઈ (scoop/1 kg)', desc: '', price: '₹30/₹290' },
      { name: 'માવા બદામ (scoop/1 kg)', desc: '', price: '₹30/₹290' },
      { name: 'પાઈનેપલ (scoop/1 kg)', desc: '', price: '₹35/₹350' },
      { name: 'અમેરિકન ડ્રાયફ્રુટ (scoop/1 kg)', desc: '', price: '₹35/₹350' },
      { name: 'ઉમા સ્પેશ્યલ (scoop/1 kg)', desc: '', price: '₹40/₹400' },
      { name: 'ચોકલેટ (scoop/1 kg)', desc: '', price: '₹30/₹300' },
      { name: 'સીતાફળ (scoop/1 kg)', desc: '', price: '₹40/₹400' },
      { name: 'માવા મલાઈ (candy)', desc: '', price: '₹25' },
      { name: 'માવા ટોપરા (candy)', desc: '', price: '₹30' },
      { name: 'જાંબુ (candy)', desc: '', price: '₹35' },
      { name: 'ઓરીયો (candy)', desc: '', price: '₹30' },
      { name: 'સ્ટ્રોબેરી (candy)', desc: '', price: '₹30' },
      { name: 'અમુલ ફ્રોસ્ટિક (candy)', desc: '', price: '₹35' },
      { name: 'રાસબરી (candy)', desc: '', price: '₹15' },
      { name: 'ચોકલેટ કોન', desc: '', price: '₹20' }
    ],
    'Drinks': [
      { name: 'થમ્સઅપ', desc: '', price: '₹20' },
      { name: 'સ્પ્રાઈટ', desc: '', price: '₹20' },
      { name: 'માઝા', desc: '', price: '₹20' },
      { name: 'સોસીયો', desc: '', price: '₹20' },
      { name: 'છાસ', desc: '', price: '₹20' }
    ]
  };
  const categoryIcons = {
    'ભજીયા': 'fas fa-pepper-hot',
    'Ice Cream': 'fas fa-ice-cream',
    'Candy': 'fas fa-candy-cane',
    'Drinks': 'fas fa-glass-water',
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
          <div class="modal-item-name">${item.name}<br>
            <span style="font-size:0.78rem;color:var(--text-light);font-weight:400;">${item.desc}</span>
          </div>
          <div class="modal-item-price">${item.price}</div>`;
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
    const viewMoreBtn = document.getElementById('viewMoreBtn');
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      const hiddenCards = document.querySelectorAll('.menu-card.hidden');
      for (let i = 0; i < 6 && i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove('hidden');
      }
      if (document.querySelectorAll('.menu-card.hidden').length === 0) {
        viewMoreBtn.style.display = 'none';
      }
    });
  }
    document.getElementById('downloadMenu').addEventListener('click', async () => {
    const btn = document.getElementById('downloadMenu');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    try {
      if (!window.html2canvas) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      }
      if (!window.jspdf) {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
      }
      const html = generateMenuHTML();
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;top:-10000px;left:-10000px;width:680px;height:auto;border:none;';
      document.body.appendChild(iframe);
      iframe.contentDocument.open();
      iframe.contentDocument.write(html);
      iframe.contentDocument.close();
      await new Promise(r => setTimeout(r, 1500));
      const pageWrap = iframe.contentDocument.querySelector('.page-wrap');
      const canvas = await html2canvas(pageWrap, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FAF6EF',
        logging: false,
      });
      document.body.removeChild(iframe);
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const { jsPDF } = window.jspdf;
      const pdfW = 210;
      const pdfH = (canvas.height * pdfW) / canvas.width;
      const pdf = new jsPDF({ unit: 'mm', format: [pdfW, pdfH] });
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);
      pdf.save('UMA-Kumbhaniya-Menu.pdf');
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Could not generate PDF. Please try again.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-download"></i> Download Menu';
    }
  });
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  function generateMenuHTML() {
    let sectionsHTML = '';
    Object.entries(fullMenuData).forEach(([cat, items]) => {
      const icon = { 'ભજીયા': '🌶', 'Ice Cream': '🍦', 'Candy': '🍬', 'Drinks': '🥤' }[cat] || '✦';
      let rows = '';
      items.forEach(item => {
        rows += `
          <div class="menu-row">
            <div class="menu-row-left">
              <span class="item-name">${item.name}</span>
              <span class="item-desc">${item.desc}</span>
            </div>
            <div class="menu-row-dots"></div>
            <span class="item-price">${item.price}</span>
          </div>`;
      });
      sectionsHTML += `
        <div class="menu-section-block">
          <div class="section-head">
            <span class="ornament">❧</span>
            <h3>${icon}  ${cat}  ${icon}</h3>
            <span class="ornament">❧</span>
          </div>
          ${rows}
        </div>`;
    });
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>UMA Kumbhaniya – Menu</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'DM Sans', sans-serif; background: #FAF6EF; color: #2A1508; }
    .page-wrap { max-width: 680px; margin: 0 auto; padding: 40px 48px; background: #FAF6EF; border: 1px solid #e8d0a0; position: relative; }
    .page-wrap::before, .page-wrap::after { content: ''; position: absolute; width: 60px; height: 60px; border-color: #E8932A; border-style: solid; opacity: 0.6; }
    .page-wrap::before { top: 14px; left: 14px; border-width: 2px 0 0 2px; }
    .page-wrap::after  { bottom: 14px; right: 14px; border-width: 0 2px 2px 0; }
    .corner-tr, .corner-bl { position: absolute; width: 60px; height: 60px; border-color: #E8932A; border-style: solid; opacity: 0.6; }
    .corner-tr { top: 14px; right: 14px; border-width: 2px 2px 0 0; }
    .corner-bl { bottom: 14px; left: 14px; border-width: 0 0 2px 2px; }
    .menu-header { text-align: center; padding-bottom: 24px; margin-bottom: 24px; }
    .top-ornament { font-size: 1.1rem; color: #E8932A; letter-spacing: 0.4em; display: block; margin-bottom: 12px; }
    .resto-name { font-family: 'Cormorant Garamond', serif; font-size: 3.5rem; font-weight: 700; color: #6B2D0E; line-height: 1; letter-spacing: 0.04em; }
    .resto-name em { display: block; font-style: italic; color: #C0522B; font-size: 2.6rem; margin-top: 4px; }
    .tagline-text { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.3rem; color: #8B5E3C; margin-top: 14px; letter-spacing: 0.06em; }
    .header-divider { display: flex; align-items: center; gap: 12px; margin: 18px 0 0; }
    .header-divider span { color: #E8932A; font-size: 1.1rem; flex-shrink: 0; }
    .header-divider .line { flex: 1; height: 1.5px; background: linear-gradient(to right, transparent, #E8932A, transparent); }
    .info-bar { display: flex; justify-content: center; gap: 24px; font-size: 0.78rem; color: #8B5E3C; margin-top: 14px; letter-spacing: 0.04em; flex-wrap: wrap; }
    .menu-section-block { margin-bottom: 28px; }
    .section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; margin-top: 4px; }
    .section-head h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 700; color: #6B2D0E; letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap; background: #FAF6EF; padding: 0 12px; }
    .section-head .ornament { color: #E8932A; font-size: 0.8rem; flex-shrink: 0; }
    .section-head::before { content: ''; display: block; flex: 1; height: 1px; background: linear-gradient(to right, transparent, #E8932A 40%, #E8932A); }
    .section-head::after  { content: ''; display: block; flex: 1; height: 1px; background: linear-gradient(to left, transparent, #E8932A 40%, #E8932A); }
    .menu-row { display: flex; align-items: baseline; gap: 8px; padding: 9px 0 7px; border-bottom: 1px dotted rgba(232,147,42,0.35); }
    .menu-row:last-child { border-bottom: none; }
    .menu-row-left { display: flex; flex-direction: column; min-width: 0; flex: 1; }
    .item-name { font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: 0.75rem; color: #2A1508; line-height: 1.3; }
    .item-desc { font-size: 0.6rem; color: #5C3018; font-style: italic; margin-top: 4px; line-height: 1.4; }
    .menu-row-dots { flex: 0 0 auto; width: 40px; border-bottom: 2px dotted rgba(232,147,42,0.5); margin-bottom: 5px; align-self: flex-end; }
    .item-price { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 0.75rem; color: #8B3518; white-space: nowrap; flex-shrink: 0; }
    .menu-footer { text-align: center; margin-top: 28px; padding-top: 16px; }
    .footer-divider { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
    .footer-divider span { color: #E8932A; font-size: 1.1rem; flex-shrink: 0; }
    .footer-divider .line { flex: 1; height: 1.5px; background: linear-gradient(to right, transparent, #E8932A, transparent); }
    .footer-note { font-size: 0.75rem; color: #8B5E3C; font-style: italic; line-height: 1.8; }
    .footer-brand { font-family: 'Cormorant Garamond', serif; font-size: 0.85rem; color: #6B2D0E; margin-top: 8px; letter-spacing: 0.08em; }
  </style>
</head>
<body>
  <div class="page-wrap">
    <div class="corner-tr"></div>
    <div class="corner-bl"></div>
    <div class="menu-header">
      <span class="top-ornament">✦ &nbsp; ✦ &nbsp; ✦</span>
      <div class="resto-name">UMA <em>Kumbhaniya</em></div>
      <div class="tagline-text">Where Every Bite Tells a Story of Tradition &amp; Love</div>
      <div class="header-divider"><div class="line"></div><span>✦</span><div class="line"></div></div>
      <div class="info-bar">
        <span>📍 Babra, Gujarat</span>
        <span>📞 +91 90991 28700</span>
        <span>🕐 All Days: 4:00 PM – 11:45 PM</span>
      </div>
    </div>
    ${sectionsHTML}
    <div class="menu-footer">
      <div class="footer-divider"><div class="line"></div><span>❧</span><div class="line"></div></div>
      <div class="footer-note">
        All prices are inclusive of applicable taxes &nbsp;·&nbsp; Subject to seasonal availability<br>
        Prices may change without prior notice
      </div>
      <div class="footer-brand">— Uma Kumbhaniya - Babra —</div>
    </div>
  </div>
</body>
</html>`;
  }
    const EMAILJS_SERVICE_ID = 'service_ln8kean';
  const EMAILJS_TEMPLATE_ID = 'template_kxdzbj4';
  const nameEl = document.getElementById('name');
  const phoneEl = document.getElementById('phone');
  const messageEl = document.getElementById('message');
  const formSuccess = document.getElementById('formSuccess');
  const sendBtn = document.getElementById('sendMsgBtn');
  document.getElementById('contactForm').addEventListener('submit', e => e.preventDefault());
  sendBtn.addEventListener('click', async () => {
    clearError('name');
    clearError('phone');
    clearError('message');
    formSuccess.classList.remove('show');
    formSuccess.removeAttribute('style');
    formSuccess.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll get back to you soon.';
    let valid = true;
    if (!nameEl.value.trim() || nameEl.value.trim().length < 2) {
      setError('name', 'Please enter your full name (min 2 characters)');
      valid = false;
    }
    const phoneVal = phoneEl.value.trim().replace(/[\s-]/g, '');
    const phoneRegex = /^(?:\+91|91)?[6789]\d{9}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal)) {
      setError('phone', 'Please enter a valid 10-digit phone number');
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
      from_name: nameEl.value.trim(),
      from_phone: phoneEl.value.trim(),
      message: messageEl.value.trim(),
      to_name: 'UMA Kumbhaniya',
    };
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      formSuccess.classList.add('show');
      nameEl.value = '';
      phoneEl.value = '';
      messageEl.value = '';
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      formSuccess.style.background = '#fdecea';
      formSuccess.style.borderColor = '#ef9a9a';
      formSuccess.style.color = '#c62828';
      formSuccess.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again or call us directly.';
      formSuccess.classList.add('show');
      setTimeout(() => {
        formSuccess.classList.remove('show');
        formSuccess.removeAttribute('style');
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
    function addRevealClasses() {
    const targets = [
      '.about-grid', '.highlight-card', '.menu-card',
      '.info-card', '.contact-form-wrap',
      '.section-header', '.map-wrap',
    ];
    targets.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
    });
  }
  function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }
  addRevealClasses();
  requestAnimationFrame(() => revealOnScroll());
});
