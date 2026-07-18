// ==========================================
// directory.js — member data + grid/list view
// ==========================================

const directoryEl = document.getElementById('directory');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`Network response was not ok (${response.status})`);
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    directoryEl.innerHTML = `<p class="loading-message">Error: ${error.message}</p>`;
    console.error('Error fetching members.json:', error);
  }
}

function displayMembers(members) {
  directoryEl.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('section');
    card.className = 'member-card';

    card.innerHTML = `
      <div class="member-card-header">
        <h2>${member.name}</h2>
        <p class="member-tagline">${member.tagline}</p>
      </div>
      <div class="member-card-body">
       <img src="images/${member.image}" alt="${member.name}" loading="lazy"
         onerror="this.src='https://picsum.photos/300/300'">
        <div class="member-details">
          <p>${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Web:</strong> <a href="${member.url}" target="_blank" rel="noopener">${member.url.replace('https://', '')}</a></p>
          <span class="badge badge-${member.membershipLevel}">${membershipLabel(member.membershipLevel)}</span>
        </div>
      </div>
    `;

    directoryEl.appendChild(card);
  });
}

function membershipLabel(level) {
  switch (level) {
    case 3: return 'Gold Member';
    case 2: return 'Silver Member';
    default: return 'Member';
  }
}

function setView(view) {
  const isGrid = view === 'grid';
  directoryEl.classList.toggle('grid-view', isGrid);
  directoryEl.classList.toggle('list-view', !isGrid);

  if (gridBtn) gridBtn.setAttribute('aria-pressed', isGrid);
  if (listBtn) listBtn.setAttribute('aria-pressed', !isGrid);
}

if (gridBtn) gridBtn.addEventListener('click', () => setView('grid'));
if (listBtn) listBtn.addEventListener('click', () => setView('list'));

getMembers();