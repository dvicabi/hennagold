/* Henna Gold - EdenEvent (vanilla JS)
   Features:
   - Mobile drawer
   - IntersectionObserver reveal
   - Gallery render + lightbox
   - Contact form -> WhatsApp message
*/

const SITE = {
  businessName: "Henna Gold - EdenEvent",
  whatsappNumber: "972528084169", // without leading 0
  phonePrimary: "052-808-4169",
  phoneSecondary: "052-896-1169",
  email: "edengal5410@gmail.com",
  instagramMain: "https://instagram.com/Hennagold94",
  instagramDeals: "https://instagram.com/Edengalcabessa1"
};

// ----- helpers
function qs(sel, root=document){ return root.querySelector(sel); }
function qsa(sel, root=document){ return [...root.querySelectorAll(sel)]; }

function openWhatsApp(message){
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function safeText(value){
  return String(value ?? "").replace(/[<>]/g, "");
}

// ----- mobile nav
(function initMobileNav(){
  const burger = qs('[data-burger]');
  const drawer = qs('[data-drawer]');
  if(!burger || !drawer) return;

  burger.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!expanded));
    drawer.style.display = expanded ? "none" : "block";
  });

  qsa("a", drawer).forEach(a => {
    a.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      drawer.style.display = "none";
    });
  });
})();

// ----- reveal animations
(function initReveal(){
  const items = qsa(".reveal");
  if(!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
})();

// ----- gallery
const galleryImages = [
  { src: "assets/gallery/01.jpg", thumb: "assets/gallery/01_sm.jpg", caption: "לוקים לכלה ולחתן, בדיוק בסגנון שלכם", tag: "ביגוד" },
  { src: "assets/gallery/02.jpg", thumb: "assets/gallery/02_sm.jpg", caption: "חבילות שמרגישות יוקרה, במחיר נגיש", tag: "חינה" },
  { src: "assets/gallery/03.jpg", thumb: "assets/gallery/03_sm.jpg", caption: "איפור, תכשיטים ואביזרים שמסיימים את הלוק", tag: "אביזרים" },
  { src: "assets/gallery/04.jpg", thumb: "assets/gallery/04_sm.jpg", caption: "סטים מיוחדים לכל אירוע, לכל עדה", tag: "ביגוד" },
  { src: "assets/gallery/05.jpg", thumb: "assets/gallery/05_sm.jpg", caption: "זוגות שמגיעים לחגוג בסטייל", tag: "זוגות" },
  { src: "assets/gallery/06.jpg", thumb: "assets/gallery/06_sm.jpg", caption: "ביגוד אותנטי ופיוז'ן, עם אופציה לצנוע", tag: "ביגוד" },
  { src: "assets/gallery/07.jpg", thumb: "assets/gallery/07_sm.jpg", caption: "פרטים קטנים שעושים את כל האווירה", tag: "אביזרים" },
  { src: "assets/gallery/08.jpg", thumb: "assets/gallery/08_sm.jpg", caption: "עוד רגע לפני הטקס", tag: "חינה" },
  { src: "assets/gallery/09.jpg", thumb: "assets/gallery/09_sm.jpg", caption: "מבחר ביגוד בשלל צבעים ומידות", tag: "ביגוד" },
  { src: "assets/gallery/10.jpg", thumb: "assets/gallery/10_sm.jpg", caption: "לוקים בהירים וקלאסיים, כמו שצריך", tag: "ביגוד" },
  { src: "assets/gallery/11.jpg", thumb: "assets/gallery/11_sm.jpg", caption: "תפאורה מפוארת לטקס, עם במה וזהב", tag: "תפאורה" },
  { src: "assets/gallery/12.jpg", thumb: "assets/gallery/12_sm.jpg", caption: "תפאורה חדשה מהבמה שלנו", tag: "תפאורה" },
];

const autoCaptions = [
  "עוד הצצה מהסט שלנו",
  "לוק אהוב עליי מהקולקציה",
  "ככה זה נראה כשעולים לבמה",
  "ביגוד לכלה, לחתן ולמשפחה",
  "אותנטי או פיוז'ן, אתם בוחרים",
  "פרטים שעושים את ההבדל",
  "הכל מוכן, רק שתגיעו",
  "אווירה מרוקאית בדיוק במידה",
  "עוד סט מהמם לאירוע",
  "נוצץ, מדויק, ולא מוגזם",
];

const autoTags = ["הצצה", "ביגוד", "תפאורה", "אווירה", "אביזרים"];

for (let i = 13; i <= 61; i++) {
  const idx = i - 13;
  galleryImages.push({
    src: `assets/gallery/${String(i).padStart(2, "0")}.jpg`,
    thumb: `assets/gallery/${String(i).padStart(2, "0")}_sm.jpg`,
    caption: autoCaptions[idx % autoCaptions.length],
    tag: autoTags[idx % autoTags.length],
  });
}


function renderGallery(){
  const host = qs('[data-gallery]');
  if(!host) return;

	  if(!galleryImages.length){
	    host.innerHTML = `
	      <div class="card">
	        <h3>בקרוב נעלה כאן תמונות</h3>
	        <p>כרגע הגלריה ריקה, אבל אנחנו כבר אוספים תמונות מאירועים כדי להראות את כל האווירה.</p>
	      </div>
	    `;
	    return;
	  }

  host.innerHTML = galleryImages.map((img, idx) => {
    const caption = safeText(img.caption || "");
    const tag = safeText(img.tag || "");
    return `
      <figure class="gallery-item" data-open="${idx}">
        <img src="${img.thumb || img.src}" alt="${caption}">
        <figcaption class="gallery-caption">${caption}${tag ? ` · ${tag}` : ""}</figcaption>
      </figure>
    `;
  }).join("");

  // bind open
  qsa("[data-open]", host).forEach(el => {
    el.addEventListener("click", () => {
      const idx = Number(el.getAttribute("data-open"));
      openLightbox(idx);
    });
  });
}

function renderGalleryPreview(){
  const host = qs('[data-gallery-preview]');
  if(!host) return;

  const items = galleryImages.slice(0, 6);
  host.innerHTML = items.map((img, idx) => {
    const caption = safeText(img.caption || "");
    const tag = safeText(img.tag || "");
    return `
      <figure class="gallery-item" data-open="${idx}">
        <img src="${img.thumb || img.src}" alt="${caption}">
        <figcaption class="gallery-caption">${caption}${tag ? ` · ${tag}` : ""}</figcaption>
      </figure>
    `;
  }).join("");

  qsa("[data-open]", host).forEach(el => {
    el.addEventListener("click", () => {
      const idx = Number(el.getAttribute("data-open"));
      openLightbox(idx);
    });
  });
}

function openLightbox(index){
  const lb = qs('[data-lightbox]');
  if(!lb) return;

  const img = galleryImages[index];
  if(!img) return;

  const title = qs('[data-lightbox-title]', lb);
  const photo = qs('[data-lightbox-img]', lb);

  title.textContent = img.caption || "";
  photo.src = img.src;
  photo.alt = img.caption || "";

  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const closeBtn = qs("[data-lightbox-close]", lb);
  closeBtn?.focus();
}

function closeLightbox(){
  const lb = qs('[data-lightbox]');
  if(!lb) return;
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

(function initLightbox(){
  const lb = qs('[data-lightbox]');
  if(!lb) return;

  qs("[data-lightbox-close]", lb)?.addEventListener("click", closeLightbox);

  lb.addEventListener("click", (e) => {
    const inner = qs(".lightbox-inner", lb);
    if(inner && !inner.contains(e.target)) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeLightbox();
  });
})();

// ----- packages CTA buttons
(function initPackageButtons(){
  qsa("[data-quote]").forEach(btn => {
    btn.addEventListener("click", () => {
      const pkg = btn.getAttribute("data-quote") || "חבילה";
      const msg =
`היי עדן
אשמח לקבל פרטים להצעת מחיר
חבילה שמעניינת אותי: ${pkg}
תאריך אירוע:
מיקום:
מספר מוזמנים:
תודה`;
      openWhatsApp(msg);
    });
  });
})();

// ----- contact form -> WhatsApp
(function initContactForm(){
  const form = qs("[data-contact-form]");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = qs('input[name="name"]', form)?.value.trim();
    const phone = qs('input[name="phone"]', form)?.value.trim();
    const date = qs('input[name="date"]', form)?.value.trim();
    const location = qs('input[name="location"]', form)?.value.trim();
    const packageName = qs('select[name="package"]', form)?.value;
    const notes = qs('textarea[name="notes"]', form)?.value.trim();

    const msg =
`היי עדן
אני ${name || "___"}
טלפון לחזרה ${phone || "___"}
תאריך אירוע ${date || "___"}
מיקום ${location || "___"}
חבילה ${packageName || "___"}
פרטים נוספים ${notes || "___"}`;

    openWhatsApp(msg);
  });

  // Quick buttons
  qsa("[data-call]").forEach(a => {
    a.addEventListener("click", () => {
      // allow default tel:
    });
  });
})();

// ----- init on page load
window.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  renderGalleryPreview();
});