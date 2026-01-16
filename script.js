// 1) Paste your publications here (one object per publication).
// Use any format you like, but keep it consistent.
// Example fields: title, authors, venue, year, links (array), note.
const PUBLICATIONS = [
  // {
  //   title: "Paper Title",
  //   authors: "Md Asef Jawad, Coauthor, Coauthor",
  //   venue: "Conference/Journal Name",
  //   year: "2025",
  //   links: [{ label: "PDF", href: "https://..." }, { label: "DOI", href: "https://..." }],
  //   note: "Optional: acceptance rate, award, etc."
  // },
];

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const yearEl = document.getElementById("year");

// Publications render
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
      .map((l) => `<a class="link" href="${l.href}" target="_blank" rel="noreferrer">${l.label}</a>`)
      .join(" • ");

    return `
      <li class="pub-item">
        <div class="pub-title">${p.title || ""}</div>
        <div class="muted pub-meta">
          ${p.authors ? `${p.authors}` : ""}
          ${p.venue ? ` — <span>${p.venue}</span>` : ""}
          ${p.year ? ` (${p.year})` : ""}
        </div>
        ${p.note ? `<div class="muted pub-note">${p.note}</div>` : ""}
        ${links ? `<div class="pub-links">${links}</div>` : ""}
      </li>
    `;
  }).join("");
}

if (yearEl) yearEl.textContent = new Date().getFullYear();

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

renderPublications();
