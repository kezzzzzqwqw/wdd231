// =========================================
// Davao Chamber of Commerce — discover.js
// =========================================

import discoverItems from "../data/discover-items.mjs";

// ---------- Card rendering ----------
function buildCard(item) {
  const card = document.createElement("article");
  card.className = "discover-card";

  const heading = document.createElement("h2");
  heading.textContent = item.name;

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.alt;
  img.width = 300;
  img.height = 200;
  img.loading = "lazy";
  figure.appendChild(img);

  const address = document.createElement("address");
  address.textContent = item.address;

  const description = document.createElement("p");
  description.textContent = item.description;

  const learnMoreBtn = document.createElement("button");
  learnMoreBtn.type = "button";
  learnMoreBtn.className = "learn-more-btn";
  learnMoreBtn.textContent = "Learn More";
  learnMoreBtn.setAttribute("aria-label", `Learn more about ${item.name}`);
  learnMoreBtn.addEventListener("click", () => {
    // Placeholder interaction — replace with a modal/detail view as needed.
    alert(`${item.name}\n${item.address}\n\n${item.description}`);
  });

  card.append(heading, figure, address, description, learnMoreBtn);
  return card;
}

function renderDiscoverCards() {
  const grid = document.getElementById("discoverCards");
  if (!grid) return;

  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  discoverItems.forEach((item) => fragment.appendChild(buildCard(item)));
  grid.appendChild(fragment);
}

// ---------- Returning visitor message (localStorage) ----------
function showVisitMessage() {
  const messageEl = document.getElementById("visitMessage");
  if (!messageEl) return;

  const STORAGE_KEY = "chamberDiscoverLastVisit";
  const now = Date.now();
  const lastVisit = localStorage.getItem(STORAGE_KEY);

  let message;

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const msSinceLastVisit = now - Number(lastVisit);
    const oneDayMs = 1000 * 60 * 60 * 24;

    if (msSinceLastVisit < oneDayMs) {
      message = "Back so soon! Awesome!";
    } else {
      const daysSinceLastVisit = Math.floor(msSinceLastVisit / oneDayMs);
      const dayWord = daysSinceLastVisit === 1 ? "day" : "days";
      message = `You last visited ${daysSinceLastVisit} ${dayWord} ago.`;
    }
  }

  messageEl.textContent = message;
  localStorage.setItem(STORAGE_KEY, String(now));
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderDiscoverCards();
  showVisitMessage();
});