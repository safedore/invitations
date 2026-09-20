(function () {
  const cfg = window.HOUSEWARMING_CONFIG;
  if (!cfg) {
    console.error("HOUSEWARMING_CONFIG not found — make sure config.js loads before script.js");
    return;
  }

  // ---- Helper functions ----
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  const setVisible = (id, visible) => {
    const el = document.getElementById(id);
    if (el) el.style.display = visible ? "" : "none";
  };
  const escapeHtml = (str) => {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, '<br>')
      .replace(/"/g, "&quot;");
  };

  // ---- Helper function for date formatting ----
  function formatDate(date, lang) {
    if (lang === 'ml') {
      // Malayalam date formatting
      const mlMonths = ['ജനുവരി', 'ഫെബ്രുവരി', 'മാർച്ച്', 'ഏപ്രിൽ', 'മേയ്', 'ജൂൺ',
                        'ജൂലൈ', 'ഓഗസ്റ്റ്', 'സെപ്റ്റംബർ', 'ഒക്ടോബർ', 'നവംബർ', 'ഡിസംബർ'];
      return `${date.getDate()} ${mlMonths[date.getMonth()]} ${date.getFullYear()}`;
    } else {
      return date.toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      });
    }
  }

  // ---- Helper function for direction buttons ----
  function updateDirectionButtons(lang) {
    const suffix = lang === 'en' ? '' : 'ML';
    const additionalDirections = document.getElementById("additional-directions");
    if (additionalDirections && Array.isArray(cfg.venue?.additionalDirections)) {
      additionalDirections.innerHTML = cfg.venue.additionalDirections.map(dir => {
        const labelText = dir[`label${suffix}`] || dir.label;
        return `
        <a href="${escapeHtml(dir.url)}" class="btn" target="_blank" rel="noopener">${escapeHtml(labelText)}</a>
      `;
      }).join("");
    }
  }

  // ---- Language switching ----
  let currentLang = localStorage.getItem('housewarmingLang') || 'en';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('housewarmingLang', lang);

    // Update body class for Malayalam font
    if (lang === 'ml') {
      document.body.classList.add('lang-malayalam');
    } else {
      document.body.classList.remove('lang-malayalam');
    }

    // Update language toggle UI
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
      const langCurrent = langToggle.querySelector('.lang-current');
      const langOther = langToggle.querySelector('.lang-other');
      if (langCurrent && langOther) {
        langCurrent.textContent = lang === 'en' ? 'EN' : 'ML';
        langOther.textContent = lang === 'en' ? 'ML' : 'EN';
      }
    }

    // Update all elements with data-en and data-ml attributes
    document.querySelectorAll('[data-en][data-ml]').forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Update config-based content
    updateConfigContent(lang);
  }

  function updateConfigContent(lang) {
    const suffix = lang === 'en' ? '' : 'ML';

    // Hero section
    setText('hero-tagline', cfg[`heroTagline${suffix}`] || cfg.heroTagline);
    setText('house-name', cfg[`houseName${suffix}`] || cfg.houseName);
    setText('hero-owners-line', `Dream Home of ${cfg.owners?.[`line${suffix}`] || cfg.owners?.line}`);
    setText('hero-memory-note', cfg[`memoryNote${suffix}`] || cfg.memoryNote);
    setText('hero-hijri', cfg[`hijriDate${suffix}`] || cfg.hijriDate);
    setText('hero-time', cfg[`heroTimeNote${suffix}`] || cfg.heroTimeNote);

    // Update date with language-specific formatting
    const eventDate = new Date(cfg.eventDateISO);
    setText("hero-date", formatDate(eventDate, lang));

    // Blessing
    setText('blessing-meaning', cfg[`blessingMeaning${suffix}`] || cfg.blessingMeaning);

    // Family
    setText('fam-owners-name', cfg.owners?.[`line${suffix}`] || cfg.owners?.line);
    setText('fam-memory-note', cfg[`memoryNote${suffix}`] || cfg.memoryNote);

    const childrenNames = cfg.children?.[`names${suffix}`] || cfg.children?.names;
    const childrenTag = cfg.children?.[`tag${suffix}`] || cfg.children?.tag;
    if (childrenNames && childrenNames.length > 0) {
      setText('fam-children-tag', childrenTag);
      setText('fam-children-names', childrenNames.join(' & '));
    }

    // Events
    const eventsList = document.getElementById("events-list");
    if (eventsList && Array.isArray(cfg.events)) {
      eventsList.innerHTML = cfg.events.map(ev => `
        <div class="event-card">
          <div class="label">${escapeHtml(ev[`label${suffix}`] || ev.label)}</div>
          <div class="date">${escapeHtml(ev[`date${suffix}`] || ev.date)}</div>
          <div class="time">${escapeHtml(ev[`time${suffix}`] || ev.time)}</div>
          <div class="venue">${escapeHtml(ev[`venue${suffix}`] || ev.venue)}</div>
          ${ev.note ? `<div class="note">${escapeHtml(ev[`note${suffix}`] || ev.note)}</div>` : ""}
        </div>
      `).join("");
    }

    // Venue
    setText('venue-name', cfg.venue?.[`name${suffix}`] || cfg.venue?.name);
    setText('venue-address', cfg.venue?.[`address${suffix}`] || cfg.venue?.address);

    // Additional direction buttons
    updateDirectionButtons(lang);

    // Contact
    const callLink = document.getElementById("contact-call");
    if (callLink && cfg.contact?.phone) {
      callLink.textContent = cfg.contact?.[`displayLabel${suffix}`] || cfg.contact?.displayLabel || (lang === 'en' ? 'Call Us' : 'വിളിക്കുക');
    }

    // Footer
    if (cfg.complimentsFrom) {
      setText('footer-compliments', `Best compliments from: ${cfg[`complimentsFrom${suffix}`] || cfg.complimentsFrom}`);
    }
    setText('footer-note', cfg[`footerNote${suffix}`] || cfg.footerNote);
    setText('footer-hostedby', cfg[`hostedBy${suffix}`] || cfg.hostedBy);

    // Update gallery placeholders based on language
    const galleryGrid = document.getElementById("gallery-grid");
    if (galleryGrid && (!Array.isArray(cfg.gallery) || cfg.gallery.length === 0)) {
      const placeholders = lang === 'ml' ? ["ഞങ്ങളുടെ വാതിൽ", "പുതിയ തുടക്കം", "അനുഗ്രഹമുള്ള വീട്", "അൽ-ഹയ്യ്"] : ["Our Door", "New Beginnings", "Blessed Home", "Al-Hayy"];
      galleryGrid.innerHTML = placeholders.map(p => `
        <div class="gallery-tile"><span>${p}</span></div>
      `).join("");
    }

    // Update additional direction buttons language
    updateDirectionButtons(lang);
  }

  // Initialize language toggle
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLang === 'en' ? 'ml' : 'en';
      setLanguage(newLang);
    });
  }

  // Set initial language
  setLanguage(currentLang);

  // ---- Optional palette override ----
  if (cfg.paletteOverride) {
    const root = document.documentElement;
    const map = {
      ink: "--ink", green: "--green", gold: "--gold",
      terracotta: "--terracotta", ivory: "--ivory", sand: "--sand",
    };
    Object.entries(cfg.paletteOverride).forEach(([key, val]) => {
      if (map[key]) root.style.setProperty(map[key], val);
    });
  }

  // ---- Hero (shared across languages) ----
  setText("bismillah-arabic", cfg.bismillahArabic || "");
  setText("bismillah-translit", cfg.bismillahTransliteration || "");
  setText("bismillah-translation", cfg.bismillahTranslation || "");

  if (cfg.memoryNote) {
    setText("hero-memory-note", cfg.memoryNote);
  } else {
    setVisible("hero-memory-note", false);
  }

  const eventDate = new Date(cfg.eventDateISO);
  // Date will be formatted by updateConfigContent
  setText("hero-date", formatDate(eventDate, currentLang));

  // ---- Blessing (shared across languages) ----
  setText("blessing-arabic", cfg.blessingArabic || "");
  setText("blessing-translit", cfg.blessingTransliteration || "");

  // ---- Family (shared across languages) ----
  const childrenNames = cfg.children?.names || [];
  if (childrenNames.length > 0) {
    // Children will be set by language switcher
  } else {
    const card = document.getElementById("fam-children-names")?.closest(".family-card");
    if (card) card.style.display = "none";
  }

  // ---- Venue / map (shared across languages) ----
  const mapFrame = document.getElementById("venue-map");
  if (mapFrame && cfg.venue?.mapQuery) {
    mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(cfg.venue.mapQuery)}&output=embed`;
  }
  const dirLink = document.getElementById("venue-directions");
  if (dirLink && cfg.venue?.directionsUrl) dirLink.href = cfg.venue.directionsUrl;

  // ---- Gallery (shared across languages) ----
  const galleryGrid = document.getElementById("gallery-grid");
  if (galleryGrid) {
    if (Array.isArray(cfg.gallery) && cfg.gallery.length > 0) {
      galleryGrid.innerHTML = cfg.gallery.map(src => `
        <div class="gallery-tile" data-src="${escapeHtml(src)}">
          <img src="${escapeHtml(src)}" alt="Home photo" loading="lazy" />
        </div>
      `).join("");
    } else {
      // Elegant placeholders so the page never looks broken
      const placeholders = currentLang === 'ml' ? ["ഞങ്ങളുടെ വാതിൽ", "പുതിയ തുടക്കം", "അനുഗ്രഹമുള്ള വീട്", "അൽ-ഹയ്യ്"] : ["Our Door", "New Beginnings", "Blessed Home", "Al-Hayy"];
      galleryGrid.innerHTML = placeholders.map(p => `
        <div class="gallery-tile"><span>${p}</span></div>
      `).join("");
    }
  }

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  document.querySelectorAll(".gallery-tile[data-src]").forEach(tile => {
    tile.addEventListener("click", () => {
      lightboxImg.src = tile.getAttribute("data-src");
      lightbox.classList.add("open");
    });
  });
  document.getElementById("lightbox-close")?.addEventListener("click", () => {
    lightbox.classList.remove("open");
  });
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("open");
  });

  // ---- Contact (shared across languages) ----
  const callLink = document.getElementById("contact-call");
  if (callLink) {
    if (cfg.contact?.phone) {
      callLink.href = `tel:${cfg.contact.phone}`;
    } else {
      document.getElementById("contact-section")?.style.setProperty("display", "none");
    }
  }

  // ---- Footer (shared across languages) ----
  setText("footer-house-name", cfg.houseName || "");

  // ---- Countdown timer (with flip animation on change) ----
  function flipDigit(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove("flip");
    void el.offsetWidth; // restart animation
    el.classList.add("flip");
  }
  function setDigit(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    const next = String(value).padStart(2, "0");
    if (el.textContent !== next) {
      el.textContent = next;
      flipDigit(id);
    }
  }
  function updateCountdown() {
    const now = new Date().getTime();
    const diff = eventDate.getTime() - now;
    const el = document.getElementById("countdown");
    if (diff <= 0) {
      if (el) el.innerHTML = `<div class="countdown-label" style="font-size:1rem; letter-spacing:.08em;">With love, our doors are open</div>`;
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    setDigit("cd-days", days);
    setDigit("cd-hours", hours);
    setDigit("cd-mins", mins);
    setDigit("cd-secs", secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---- Intro overlay ----
  const introOverlay = document.getElementById("introOverlay");
  setText("intro-house", cfg.houseName || "");
  if (introOverlay) {
    document.body.classList.add("locked");
    document.getElementById("introOpenBtn")?.addEventListener("click", () => {
      introOverlay.classList.add("closed");
      document.body.classList.remove("locked");
      tryPlayMusic();
    });
  }

  // ---- Background music (optional, off by default — set cfg.music.enabled) ----
  const audioEl = document.getElementById("bgAudio");
  const musicBtn = document.getElementById("musicToggle");
  if (audioEl && cfg.music?.src) audioEl.src = cfg.music.src;
  if (!cfg.music?.enabled) musicBtn?.style.setProperty("display", "none");
  function tryPlayMusic() {
    if (!audioEl || !cfg.music?.enabled) return;
    audioEl.play().then(() => musicBtn?.classList.add("playing")).catch(() => {});
  }
  musicBtn?.addEventListener("click", () => {
    if (!audioEl) return;
    if (audioEl.paused) {
      audioEl.play().then(() => musicBtn.classList.add("playing")).catch(() => {});
    } else {
      audioEl.pause();
      musicBtn.classList.remove("playing");
    }
  });

  // ---- Parallax on hero pattern ----
  const heroPattern = document.querySelector(".hero-pattern");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (heroPattern && !reduceMotion) {
    window.addEventListener("scroll", () => {
      heroPattern.style.transform = `translateY(${window.scrollY * 0.12}px)`;
    }, { passive: true });
  }

  // ---- Warmth light particles canvas (evoking hospitality and home warmth) ----
  (function warmthParticles() {
    const canvas = document.getElementById("warmthCanvas");
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener("resize", resize);

    const warmHex = getComputedStyle(document.documentElement).getPropertyValue("--warm-glow").trim() || "#f4d03f";
    const amberHex = getComputedStyle(document.documentElement).getPropertyValue("--warm-amber").trim() || "#d4a056";
    function rgba(hex, a) {
      const c = hex.replace("#", "");
      const r = parseInt(c.substring(0, 2), 16), g = parseInt(c.substring(2, 4), 16), b = parseInt(c.substring(4, 6), 16);
      return `rgba(${r},${g},${b},${a})`;
    }
    function spawn() {
      const colors = [warmHex, amberHex];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * w,
        y: -20 - Math.random() * h,
        r: 2 + Math.random() * 5,
        speed: 0.4 + Math.random() * 0.8,
        sway: 0.8 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        alpha: 0.2 + Math.random() * 0.35,
        color: color,
        glowSize: 8 + Math.random() * 12,
      };
    }
    const particles = Array.from({ length: 25 }, spawn);
    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.y += p.speed;
        p.phase += 0.025;
        p.rot += p.rotSpeed;
        p.x += Math.sin(p.phase) * p.sway * 0.4;
        if (p.y > h + 20) Object.assign(p, spawn(), { y: -20 });

        // Draw glow
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.glowSize);
        gradient.addColorStop(0, rgba(p.color, p.alpha * 0.8));
        gradient.addColorStop(0.5, rgba(p.color, p.alpha * 0.4));
        gradient.addColorStop(1, rgba(p.color, 0));
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, p.glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = rgba(p.color, p.alpha);
        ctx.beginPath();
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  // ---- Scroll reveal ----
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("is-visible"));
  }

  // ---- Page title ----
  document.title = `${cfg.houseName || "Housewarming"} — Invitation`;
})();