# WDD 231 – Home Page

Before you commit/push this to GitHub, personalize these placeholders:

1. **`index.html`**
   - `<span>Your Name</span>` in the header — your name.
   - `<meta name="author" content="Your Name">` — your name.
   - About Me paragraph — replace the placeholder (lorem-style) text with real content about yourself.
   - `images/avatar.svg` — swap for your own photo (`.jpg`/`.webp`, optimized to ≤125 KB). Update the `<img>` `src` and `alt` text.
   - Footer social links — replace `yourgithubusername`, `yourprofile`, and `yourhandle` with your real GitHub, LinkedIn, and third profile URLs.
   - Footer copyright line — replace "Your Name, Your State or Country" with your real name and state/country.
   - `chamber/index.html` and `final/index.html` links — these pages don't exist yet; you'll build them in later weeks.

2. **`scripts/courses.js`**
   - Update the `courses` array to match your own completed/remaining courses (`completed: true/false`).
   - Add any additional certificate courses if your list differs.

3. General
   - Run this through a local server (e.g. VS Code Live Server) and check DevTools console for errors.
   - Run Lighthouse (mobile + desktop, incognito) and confirm 95+ on Accessibility, Best Practices, and SEO.

## File structure
```
wdd231/
├── index.html
├── images/
│   ├── logo.svg
│   └── avatar.svg
├── styles/
│   ├── small.css      (mobile-first base styles + reset)
│   └── larger.css     (media query ≥700px: flex nav, two-column grid)
└── scripts/
    ├── navigation.js  (hamburger menu)
    ├── date.js        (copyright year + last-modified)
    └── courses.js     (course data, rendering, filtering, credit total)
```
