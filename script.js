// Year in footer (if you have <span id="year"></span>)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu (only relevant if you use #menuBtn + #mobileNav in your HTML)
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Profile image fallback logic
// Requires HTML IDs: profileImg, profileFallback
const profileImg = document.getElementById("profileImg");
const profileFallback = document.getElementById("profileFallback");

if (profileImg && profileFallback) {
  // If image is cached and already complete, handle immediately
  if (profileImg.complete && profileImg.naturalWidth > 0) {
    profileFallback.style.display = "none";
  } else {
    // Hide fallback until we know the image failed
    profileFallback.style.display = "none";

    profileImg.addEventListener("load", () => {
      profileFallback.style.display = "none";
    });

    profileImg.addEventListener("error", () => {
      profileFallback.style.display = "grid";
    });
  }
}

// Publications (your list already filled)
const PUBLICATIONS = [
  {
    title: "Optimized Bandwidth Allocation in Cellular Networks Using Genetic Algorithms and a Historical Stability Index",
    authors: "Md Asef Jawad",
    venue: "International Conference on Next Generation Networks (ICNGN 2025), Singapore",
    year: "2025",
    note: "Published",
    links: []
  },
  {
    title: "SoK: AI-Driven Security Threats in 6G Networks",
    authors: "Md Asef Jawad",
    venue: "3rd International Conference on Advanced Security in Emerging Networks and Systems (ASENS 2026), China",
    year: "2026",
    note: "Published",
    links: []
  },
  {
    title: "Cross-Layer Design for Intelligent Wireless Networks",
    authors: "Md Asef Jawad",
    venue: "IEEE Access",
    year: "",
    note: "Under revision",
    links: []
  },
  {
    title: "Trends in IoT Hardware and Software Platforms",
    authors: "Md Asef Jawad",
    venue: "",
    year: "",
    note: "Ongoing work",
    links: []
  },
  {
    title: "AI-Native RAN Copilot for Next-Generation Wireless Networks",
    authors: "Md Asef Jawad",
    venue: "",
    year: "",
    note: "Ongoing work",
    links: []
  },
  {
    title: "Optimized Bandwidth Allocation in Cellular Networks Using Learning-Assisted Optimization",
    authors: "Md Asef Jawad",
    venue: "",
    year: "",
    note: "Extended version, ongoing work",
    links: []
  }
];

const pubsList = document.getElementById("pubsList");
const pubsEmpty = document.getElementById("pubsEmpty");

function renderPublications() {
  if (!pubsList) return;

  if (!PUBLICATIONS || PUBLICATIONS.length === 0) {
    if (pubsEmpty) pubsEmpty.style.display = "block";
    return;
  }
  if (pubsEmpty) pubsEmpty.style.display = "none";

  pubsList.innerHTML = PUBLICATIONS.map((p) => {
    const links = (p.links || [])
      .map((l) => `<a href="${l.href}" target="_blank" rel="noreferrer">${l.label}</a>`)
      .join(" • ");

    const metaParts = [];
    if (p.authors) metaParts.push(p.authors);
    if (p.venue) metaParts.push(p.venue);
    const meta = metaParts.join(" — ");

    return `
      <li class="pub-item">
        <div class="pub-title">${p.title || ""}</div>
        <div class="pub-meta">
          ${meta ? meta : ""}
          ${p.year ? ` (${p.year})` : ""}
        </div>
        ${p.note ? `<div class="pub-note">${p.note}</div>` : ""}
        ${links ? `<div class="pub-links">${links}</div>` : ""}
      </li>
    `;
  }).join("");
}

renderPublications();
