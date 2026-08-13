// Reads the query string from the GET form submission
// on contact.html and displays the submitted data.

(function () {
  const params = new URLSearchParams(window.location.search);
  const card = document.querySelector("#received-card .card-body");
  const summary = document.querySelector("#received-summary");

  const labels = {
    name: "Name",
    email: "Email",
    topic: "Topic",
    message: "Message",
    updates: "Wants update emails",
  };

  const topicText = {
    "song-request": "Song request",
    "chord-correction": "Chord correction",
    "general-question": "General question",
    other: "Other",
  };

  const hasData = [...params.keys()].length > 0;

  if (!hasData) {
    card.innerHTML =
      '<p>No message details were found. If you got here directly, head back to the <a href="contact.html">contact form</a>.</p>';

    summary.textContent = "Nothing to show yet.";
    return;
  }

  const name = params.get("name") || "there";

  summary.textContent = `Thanks, ${name} — we'll get back to you soon.`;

  const rows = Object.keys(labels)
    .filter((key) => params.has(key) && params.get(key) !== "")
    .map((key) => {
      let value = params.get(key);

      if (key === "topic") {
        value = topicText[value] || value;
      }

      if (key === "updates") {
        value = "Yes";
      }

      return `<div><dt>${labels[key]}</dt><dd>${value}</dd></div>`;
    })
    .join("");

  card.innerHTML = `<dl class="song-detail-grid received-grid">${rows}</dl>`;
})();