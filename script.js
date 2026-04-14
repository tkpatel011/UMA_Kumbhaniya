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
    // Add scrolled shadow
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
     HAMBURGER MENU
  ────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ──────────────────────────────────────────
     SMOOTH SCROLL (for older browsers)
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
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active tab styling
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.cat;
      menuCards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.classList.remove('hidden');
          // Small stagger animation
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
      { name: 'Samosa (2 pcs)',    desc: 'Crispy pastry filled with spiced potatoes & peas',          price: '₹20' },
      { name: 'Kachori (2 pcs)',   desc: 'Deep-fried pockets filled with lentil stuffing',            price: '₹20' },
      { name: 'Bhajiya Plate',     desc: 'Assorted fritters with green chutney',                     price: '₹30' },
      { name: 'Dabeli',            desc: 'Spiced potato filling in buttered bun with chutneys',       price: '₹25' },
      { name: 'Pani Puri (6 pcs)', desc: 'Crispy puris with tangy tamarind water',                   price: '₹30' },
      { name: 'Sev Puri (4 pcs)',  desc: 'Flat puris topped with chutneys and sev',                  price: '₹30' },
      { name: 'Ragda Pattice',     desc: 'Potato patty with white pea curry and toppings',           price: '₹45' },
      { name: 'Vada Pav',          desc: 'Spiced potato dumpling in bun with dry garlic chutney',    price: '₹20' },
    ],
    'Meals': [
      { name: 'Gujarati Thali',  desc: 'Dal, sabzi, roti, rice, kadhi, papad, pickle & more',    price: '₹120' },
      { name: 'Dal Khichdi',     desc: 'Comforting rice & lentil mix served with ghee',          price: '₹80'  },
      { name: 'Pav Bhaji',       desc: 'Spiced vegetable mash with buttered pav',               price: '₹70'  },
      { name: 'Chole Bhature',   desc: 'Spiced chickpea curry with fried bread',                price: '₹90'  },
      { name: 'Kadhi Chawal',    desc: 'Yogurt-based curry with steamed rice',                  price: '₹70'  },
      { name: 'Undhiyu',         desc: 'Traditional Gujarati winter vegetable medley',          price: '₹100' },
    ],
    'Drinks': [
      { name: 'Masala Chaas',       desc: 'Spiced buttermilk with roasted cumin',              price: '₹25' },
      { name: 'Mango Lassi',        desc: 'Thick yogurt mango blend with cardamom',            price: '₹50' },
      { name: 'Sugarcane Juice',    desc: 'Fresh pressed with ginger & lemon',                 price: '₹30' },
      { name: 'Rose Sharbat',       desc: 'Chilled rose syrup drink with basil seeds',         price: '₹30' },
      { name: 'Thandai',            desc: 'Spiced milk drink with nuts and saffron',           price: '₹55' },
      { name: 'Cold Coffee',        desc: 'Blended with milk and ice cream',                   price: '₹60' },
    ],
    'Ice Cream': [
      { name: 'Kulfi (Malai)',   desc: 'Traditional frozen dessert with saffron',              price: '₹40' },
      { name: 'Falooda',         desc: 'Rose milk, basil seeds & vermicelli delight',          price: '₹60' },
      { name: 'Ice Cream Soda',  desc: 'Chilled soda topped with creamy ice cream',           price: '₹45' },
      { name: 'Cassata Slice',   desc: 'Layered multi-flavour ice cream classic',             price: '₹50' },
    ],
    'Sweets': [
      { name: 'Gulab Jamun (2 pcs)', desc: 'Soft milk-solid balls in rose sugar syrup',       price: '₹30' },
      { name: 'Jalebi (100g)',       desc: 'Crispy spiral sweets drenched in sugar syrup',    price: '₹40' },
      { name: 'Shrikhand',           desc: 'Strained yogurt dessert with cardamom & saffron', price: '₹50' },
      { name: 'Halwa',               desc: 'Semolina sweet with ghee, nuts and cardamom',     price: '₹45' },
      { name: 'Kheer',               desc: 'Creamy rice pudding with saffron and pistachios', price: '₹55' },
      { name: 'Mohanthal',           desc: 'Dense gram flour fudge – a Gujarati classic',     price: '₹60/100g' },
    ],
  };

  const categoryIcons = {
    'Snacks':    'fas fa-pepper-hot',
    'Meals':     'fas fa-bowl-food',
    'Drinks':    'fas fa-glass-water',
    'Ice Cream': 'fas fa-ice-cream',
    'Sweets':    'fas fa-candy-cane',
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
          <div>
            <div class="modal-item-name">${item.name}</div>
            <div class="modal-item-desc">${item.desc}</div>
          </div>
          <div class="modal-item-price">${item.price}</div>
        `;
        section.appendChild(row);
      });
      container.appendChild(section);
    });
  }

  const menuModal  = document.getElementById('menuModal');
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
     Uses browser print-to-PDF with a styled popup
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
    let rows = '';
    Object.entries(fullMenuData).forEach(([cat, items]) => {
      rows += `
        <tr class="cat-row"><td colspan="3"><b>— ${cat} —</b></td></tr>
      `;
      items.forEach((item, i) => {
        rows += `
          <tr class="${i % 2 === 0 ? 'even' : ''}">
            <td>${item.name}</td>
            <td>${item.desc}</td>
            <td class="price">${item.price}</td>
          </tr>
        `;
      });
    });

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>UMA Kumbhaniya – Menu</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Nunito:wght@400;600;700&display=swap');
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Nunito',sans-serif; background:#fff; color:#2E1B0E; padding:32px; }
    .header { text-align:center; border-bottom:3px solid #D4A017; padding-bottom:16px; margin-bottom:24px; }
    .header h1 { font-family:'Playfair Display',serif; font-size:2.6rem; color:#5C3D1E; }
    .header h1 em { color:#D4A017; font-style:italic; }
    .header p { color:#8B5E2F; font-size:0.9rem; margin-top:6px; }
    .tagline { font-family:'Playfair Display',serif; font-style:italic; font-size:1rem; color:#D4A017; margin-bottom:4px; }
    table { width:100%; border-collapse:collapse; font-size:0.88rem; }
    .cat-row td { background:#FDF6EC; font-family:'Playfair Display',serif; font-size:1rem; color:#5C3D1E; padding:12px 10px 6px; letter-spacing:0.08em; border-top:2px solid #F7C948; }
    tr td { padding:9px 10px; border-bottom:1px dashed #F5EAD6; vertical-align:top; }
    tr.even td { background:#FFFBF3; }
    td:first-child { font-weight:700; color:#5C3D1E; width:30%; }
    td:nth-child(2) { color:#6B4C2A; width:52%; }
    .price { font-family:'Playfair Display',serif; font-weight:700; color:#A07810; text-align:right; white-space:nowrap; width:18%; }
    .footer { text-align:center; margin-top:28px; font-size:0.78rem; color:#8B5E2F; border-top:2px solid #F7C948; padding-top:12px; }
    .info-row { display:flex; justify-content:center; gap:32px; margin:10px 0 0; font-size:0.82rem; }
    @media print { body { padding:16px; } .header h1 { font-size:2rem; } }
  </style>
</head>
<body>
  <div class="header">
    <p class="tagline">✦ Authentic Flavours ✦</p>
    <h1>UMA <em>Kumbhaniya</em></h1>
    <p>Rajkot, Gujarat &nbsp;|&nbsp; Mon–Sat: 8AM–10PM &nbsp;|&nbsp; +91 98765 43210</p>
  </div>
  <table>
    <thead>
      <tr style="background:#F7C948;color:#5C3D1E;">
        <th style="padding:10px;text-align:left;">Item</th>
        <th style="padding:10px;text-align:left;">Description</th>
        <th style="padding:10px;text-align:right;">Price</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  <div class="footer">
    <div class="info-row">
      <span>📍 Rajkot, Gujarat</span>
      <span>📞 +91 98765 43210</span>
      <span>🕐 Mon–Sat: 8AM–10PM</span>
    </div>
    <p style="margin-top:8px;">© 2025 UMA Kumbhaniya &nbsp;|&nbsp; All prices are inclusive of taxes &nbsp;|&nbsp; Subject to change without notice</p>
  </div>
</body>
</html>`;
  }

  /* ──────────────────────────────────────────
     CONTACT FORM VALIDATION
  ────────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name    = document.getElementById('name');
    const phone   = document.getElementById('phone');
    const message = document.getElementById('message');

    // Reset errors
    clearError('name');
    clearError('phone');
    clearError('message');

    if (!name.value.trim() || name.value.trim().length < 2) {
      setError('name', 'Please enter your full name (min 2 characters)');
      valid = false;
    }
    const phoneRegex = /^[+]?[\d\s\-()]{7,15}$/;
    if (!phone.value.trim() || !phoneRegex.test(phone.value.trim())) {
      setError('phone', 'Please enter a valid phone number');
      valid = false;
    }
    if (!message.value.trim() || message.value.trim().length < 10) {
      setError('message', 'Please write a message (min 10 characters)');
      valid = false;
    }

    if (valid) {
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      setTimeout(() => {
        contactForm.reset();
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        const success = document.getElementById('formSuccess');
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 5000);
      }, 1200);
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

  // Real-time clear on input
  ['name', 'phone', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => clearError(id));
  });

  /* ──────────────────────────────────────────
     SCROLL REVEAL ANIMATIONS
  ────────────────────────────────────────── */
  function addRevealClasses() {
    const targets = [
      '.about-grid',
      '.highlight-card',
      '.menu-card',
      '.gallery-item',
      '.info-card',
      '.contact-form-wrap',
      '.section-header',
      '.map-wrap',
    ];
    targets.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
    });
  }

  function revealOnScroll() {
    document.querySelectorAll('.reveal').forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        setTimeout(() => el.classList.add('visible'), i * 40);
      }
    });
  }

  addRevealClasses();
  revealOnScroll(); // Run once on load

  /* ──────────────────────────────────────────
     LAZY LOADING IMAGES (native + IntersectionObserver)
  ────────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    lazyImages.forEach(img => imgObserver.observe(img));
  }

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

  /* ──────────────────────────────────────────
     HIGHLIGHT CARDS: Count-up for badge
  ────────────────────────────────────────── */
  const badgeNum = document.querySelector('.badge-num');
  if (badgeNum) {
    const target = 14;
    let count = 0;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const interval = setInterval(() => {
          count++;
          badgeNum.textContent = count + '+';
          if (count >= target) clearInterval(interval);
        }, 80);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(badgeNum);
  }

});
