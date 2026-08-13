// songs.js
// Fetches the song library, renders it into the DOM, and wires up the
// difficulty filter, favorite toggle, and "mark as practiced" actions.

import { openModal } from "./modal.js";
import {
  isFavorite,
  toggleFavorite,
  markPracticed,
  getLastPracticed,
} from "./storage.js";

const DATA_URL = "data/songs.json";

let allSongs = [];

function formatDate(isoString) {
  if (!isoString) return "Not practiced yet";
  const date = new Date(isoString);
  return `Last practiced ${date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

function songCardTemplate(song) {
  const favorited = isFavorite(song.id);
  const capoText = song.capo > 0 ? `Capo ${song.capo}` : "No capo";

  return `
    <article class="card song-card" data-id="${song.id}">
      <div class="card-body">
        <span class="label">${song.chords.join(" · ")}</span>
        <h3>${song.title}</h3>
        <p class="song-meta">
          ${song.artist} &middot; ${song.difficulty} &middot; ${capoText}
        </p>
        <p>${song.description}</p>
        <div class="card-actions">
          <button type="button" class="btn-details" data-id="${song.id}">
            View details
          </button>
          <button
            type="button"
            class="btn-favorite ${favorited ? "is-favorite" : ""}"
            data-id="${song.id}"
            aria-pressed="${favorited}"
            aria-label="${favorited ? "Remove from favorites" : "Add to favorites"}"
          >
            ${favorited ? "★" : "☆"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function modalBodyTemplate(song) {
  const lastPracticed = getLastPracticed(song.id);
  const chordList = song.chords
    .map((chord) => `<li>${chord}</li>`)
    .join("");

  return `
    <p class="song-meta">${song.artist} &middot; ${song.genre}</p>
    <dl class="song-detail-grid">
      <div><dt>Key</dt><dd>${song.key}</dd></div>
      <div><dt>Difficulty</dt><dd>${song.difficulty}</dd></div>
      <div><dt>Tempo</dt><dd>${song.tempo} BPM</dd></div>
      <div><dt>Capo</dt><dd>${song.capo > 0 ? song.capo : "None"}</dd></div>
      <div><dt>Duration</dt><dd>${song.duration}</dd></div>
    </dl>
    <p>${song.description}</p>
    <p class="label">Chords used</p>
    <ul class="chord-list">${chordList}</ul>
    <p class="practiced-note" id="practiced-note-${song.id}">
      ${formatDate(lastPracticed)}
    </p>
    <button type="button" class="btn-practiced" data-id="${song.id}">
      Mark as practiced today
    </button>
  `;
}

function renderSongs(songs) {
  const grid = document.querySelector("#song-grid");
  if (!grid) return;

  if (songs.length === 0) {
    grid.innerHTML = `<p class="empty-state">No songs match that filter yet.</p>`;
    return;
  }

  // Array method: map() turns each song object into a card's HTML string.
  grid.innerHTML = songs.map(songCardTemplate).join("");
}

function handleGridClick(event) {
  const detailsBtn = event.target.closest(".btn-details");
  const favoriteBtn = event.target.closest(".btn-favorite");

  if (detailsBtn) {
    const song = allSongs.find((item) => item.id === Number(detailsBtn.dataset.id));
    if (song) {
      openModal({ title: song.title, bodyHTML: modalBodyTemplate(song) });
    }
    return;
  }

  if (favoriteBtn) {
    const id = Number(favoriteBtn.dataset.id);
    const nowFavorite = toggleFavorite(id);
    favoriteBtn.classList.toggle("is-favorite", nowFavorite);
    favoriteBtn.setAttribute("aria-pressed", String(nowFavorite));
    favoriteBtn.setAttribute(
      "aria-label",
      nowFavorite ? "Remove from favorites" : "Add to favorites"
    );
    favoriteBtn.textContent = nowFavorite ? "★" : "☆";
  }
}

function handleModalClick(event) {
  const practicedBtn = event.target.closest(".btn-practiced");
  if (!practicedBtn) return;

  const id = Number(practicedBtn.dataset.id);
  const isoString = markPracticed(id);
  const note = document.querySelector(`#practiced-note-${id}`);
  if (note) note.textContent = formatDate(isoString);
}

function handleFilterChange(event) {
  const value = event.target.value;

  // Array method: filter() narrows the full list down to the chosen difficulty.
  const filtered =
    value === "all"
      ? allSongs
      : allSongs.filter((song) => song.difficulty === value);

  renderSongs(filtered);
}

function buildFilterOptions(songs) {
  const select = document.querySelector("#difficulty-filter");
  if (!select) return;

  // Array method: reduce() collects the unique difficulty levels present in the data.
  const difficulties = songs.reduce((unique, song) => {
    if (!unique.includes(song.difficulty)) unique.push(song.difficulty);
    return unique;
  }, []);

  const optionsHTML = difficulties
    .map((level) => `<option value="${level}">${level}</option>`)
    .join("");

  select.innerHTML = `<option value="all">All levels</option>${optionsHTML}`;
  select.addEventListener("change", handleFilterChange);
}

export async function loadSongs() {
  const grid = document.querySelector("#song-grid");
  if (grid) grid.innerHTML = `<p class="empty-state">Loading songs…</p>`;

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    allSongs = await response.json();

    renderSongs(allSongs);
    buildFilterOptions(allSongs);

    document.querySelector("#song-grid")?.addEventListener("click", handleGridClick);
    document.querySelector("#song-modal-body")?.addEventListener("click", handleModalClick);
  } catch (err) {
    console.error("Could not load the song library:", err);
    if (grid) {
      grid.innerHTML = `<p class="empty-state">Sorry — the song library couldn't be loaded right now. Please try again later.</p>`;
    }
  }
}