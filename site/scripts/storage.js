// storage.js
// Small wrapper around localStorage so the rest of the app never touches
// the raw API directly. Keeps favorites (song ids) and practiced sessions
// (song id -> ISO date string of the last time it was marked practiced).

const FAVORITES_KEY = "fretwork:favorites";
const PRACTICED_KEY = "fretwork:practiced";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`Could not read "${key}" from local storage:`, err);
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Could not write "${key}" to local storage:`, err);
  }
}

export function getFavorites() {
  return readJSON(FAVORITES_KEY, []);
}

export function isFavorite(songId) {
  return getFavorites().includes(songId);
}

export function toggleFavorite(songId) {
  const current = getFavorites();
  const next = current.includes(songId)
    ? current.filter((id) => id !== songId)
    : [...current, songId];
  writeJSON(FAVORITES_KEY, next);
  return next.includes(songId);
}

export function getPracticedLog() {
  return readJSON(PRACTICED_KEY, {});
}

export function markPracticed(songId) {
  const log = getPracticedLog();
  log[songId] = new Date().toISOString();
  writeJSON(PRACTICED_KEY, log);
  return log[songId];
}

export function getLastPracticed(songId) {
  const log = getPracticedLog();
  return log[songId] || null;
}