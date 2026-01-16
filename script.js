const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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

// Paste your publication list here:
const PUBLICATIONS = [
  // {
  //   title: "Paper Title",
  //   authors: "Md Asef Jawad, ...",
  //   venue: "Conference/Journal",
  //   year: "2025",
  //   links: [{ label: "PDF", href: "https://..." }, { label: "DOI", href: "https://..." }],
  //   note: "Optional note"
  // },
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

    return `
      <li class="pub-item">
        <div class="pub-title">${p.title || ""}</div>
        <div class="pub-meta">
          ${p.authors ? `${p.authors}` : ""}
          ${p.venue ? ` — ${p.venue}` : ""}
          ${p.year ? ` (${p.year})` : ""}
        </div>
        ${p.note ? `<div class="pub-meta">${p.note}</div>` : ""}
        ${links ? `<div class="pub-links">${links}</div>` : ""}
      </li>
    `;
  }).join("");
}

renderPublications();
