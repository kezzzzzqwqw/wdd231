// modal.js
// Generic, reusable modal controller. Handles focus management and the
// usual accessible-dialog escape hatches (Escape key, backdrop click,
// close button) so songs.js only has to worry about what content to show.

let modalEl = null;
let dialogEl = null;
let titleEl = null;
let bodyEl = null;
let closeBtn = null;
let lastFocusedEl = null;

export function initModal() {
  modalEl = document.querySelector("#song-modal");
  dialogEl = modalEl.querySelector(".modal-dialog");
  titleEl = modalEl.querySelector("#song-modal-title");
  bodyEl = modalEl.querySelector("#song-modal-body");
  closeBtn = modalEl.querySelector(".modal-close");

  closeBtn.addEventListener("click", closeModal);

  // Clicking the dimmed backdrop (but not the dialog itself) closes it.
  modalEl.addEventListener("click", (event) => {
    if (event.target === modalEl) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modalEl.hasAttribute("hidden")) {
      closeModal();
    }
  });
}

export function openModal({ title, bodyHTML }) {
  lastFocusedEl = document.activeElement;

  titleEl.textContent = title;
  bodyEl.innerHTML = bodyHTML;

  modalEl.removeAttribute("hidden");
  document.body.classList.add("modal-open");

  // Move focus into the dialog for keyboard/screen-reader users.
  dialogEl.setAttribute("tabindex", "-1");
  dialogEl.focus();
}

export function closeModal() {
  if (modalEl.hasAttribute("hidden")) return;
  modalEl.setAttribute("hidden", "");
  document.body.classList.remove("modal-open");
  if (lastFocusedEl instanceof HTMLElement) lastFocusedEl.focus();
}