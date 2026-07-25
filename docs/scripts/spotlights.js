// ==========================================
// spotlights.js — random gold/silver member spotlights
// ==========================================

const spotlightsEl = document.getElementById('spotlights');

async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    const data = await response.json();
    const chosen = pickRandomSpotlights(data.members);
    displaySpotlights(chosen);
  } catch (error) {
    if (spotlightsEl) {
      spotlightsEl.innerHTML = `<p class="loading-message">Error: ${error.message}</p>`;
    }
    console.error('Error fetching members.json for spotlights:', error);
  }
}

// Only Gold (3) and Silver (2) members qualify for a spotlight.
// Shuffle, then take 2 or 3 at random each time the page loads.
function pickRandomSpotlights(members) {
  const eligible = members.filter((member) => member.membershipLevel === 2 || member.membershipLevel === 3);

  const shuffled = [...eligible].sort(() => Math.random() - 0.5);
  const count = Math.random() < 0.5 ? 2 : 3;

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function displaySpotlights(members) {
  if (!spotlightsEl) return;
  spotlightsEl.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('section');
    card.className = 'spotlight-card';

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy"
        onerror="this.src='https://picsum.photos/300/200'">
      <div class="spotlight-body">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Web:</strong> <a href="${member.url}" target="_blank" rel="noopener">${member.url.replace('https://', '')}</a></p>
        <span class="badge badge-${member.membershipLevel}">${membershipLabel(member.membershipLevel)}</span>
      </div>
    `;

    spotlightsEl.appendChild(card);
  });
}

function membershipLabel(level) {
  switch (level) {
    case 3: return 'Gold Member';
    case 2: return 'Silver Member';
    default: return 'Member';
  }
}

getSpotlights();