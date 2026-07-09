// date.js
// Dynamically outputs the current year (copyright) and the document's
// last-modified date in the footer.

const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = document.lastModified;
