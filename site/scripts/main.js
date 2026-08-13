// main.js
// Entry point loaded via <script type="module">. Initializes the modal
// controller, then kicks off the song data fetch/render.

import { initModal } from "./modal.js";
import { loadSongs } from "./songs.js";

document.addEventListener("DOMContentLoaded", () => {
  initModal();
  loadSongs();
});