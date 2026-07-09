// navigation.js
// Controls the small-screen hamburger menu. On screens wide enough for the
// horizontal flex nav (see larger.css), the toggle button is hidden by CSS
// and this script has nothing to do.

const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

function closeNav() {
  primaryNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
}

function openNav() {
  primaryNav.classList.add("open");
  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Close menu");
}

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.contains("open");
  isOpen ? closeNav() : openNav();
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNav);
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 700) {
    closeNav();
  }
});
