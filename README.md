# Rohit Bhoj — Portfolio

A black & yellow, GSAP-animated portfolio for **Rohit Bhoj (BTech CSE, 3rd Year)**,
with a custom loading screen, an animated ninja-coder mascot, and a working
contact form powered by a Node/Express backend + Brevo transactional email.

```
portfolio/
├── client/                    # React app (Vite) — GSAP-driven UI
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       └── components/
│           ├── Loader.jsx        # boot-sequence loading screen
│           ├── Navbar.jsx
│           ├── Hero.jsx
│           ├── Mascot.jsx        # ninja-coder SVG + idle/blink/wave motion
│           ├── About.jsx
│           ├── Skills.jsx        # marquee + skill cards
│           ├── Experience.jsx    # hackathon + LeetCode timeline
│           ├── Projects.jsx
│           ├── Contact.jsx       # form -> backend -> Brevo
│           ├── Footer.jsx
│           └── Reveal.jsx        # shared scroll-reveal wrapper
├── backend/                   # Node/Express API for the contact form
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 1. Run the frontend

```bash
cd client
npm install
cp .env.example .env      
npm run dev
```

Open the printed URL (defaults to `http://localhost:5173`).

For production: `npm run build` outputs static files to `client/dist/`,
deployable to Vercel, Netlify, Cloudflare Pages, etc.

## 2. Run the backend

```bash
cd backend
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable | Where to get it |
|---|---|
| `BREVO_API_KEY` | Brevo dashboard → SMTP & API → API Keys |
| `BREVO_SENDER_EMAIL` | An email you've **verified as a sender** in Brevo |
| `OWNER_EMAIL` | The inbox that should receive contact form messages (Rohit's email) |
| `ALLOWED_ORIGIN` | The URL your frontend runs on, e.g. `http://localhost:5500` |

Then start the server:

```bash
npm start
```

The API runs at `http://localhost:5000` by default, exposing:

- `GET /api/health` — sanity check
- `POST /api/contact` — `{ name, email, message }` → sends email via Brevo

## 3. Connect frontend to backend

The client reads `VITE_API_BASE` from `client/.env` (Vite env vars must be
prefixed `VITE_`). Set it to wherever the backend is running/deployed:

```
VITE_API_BASE=http://localhost:5000
```

## 4. Customize content

- **Name / bio / experience**: each section is its own component under
  `client/src/components/` — e.g. `Hero.jsx` for the headline/stats,
  `Experience.jsx` for the GEHU hackathon Top 30 and LeetCode 300+ entries
  (edit the `ITEMS` array).
- **Projects**: edit the `PROJECTS` array at the top of `Projects.jsx` —
  swap in your real repo/live links (currently `#` placeholders).
- **Social links**: update the `<a>` tags in `Footer.jsx` (GitHub, LeetCode, LinkedIn).
- **Colors**: all theme colors are CSS variables at the top of `src/index.css`
  (`--ink`, `--yellow`, `--paper`, etc.) — change once, applies everywhere.
- **Mascot**: the ninja-coder SVG and its motion (float, blink,
  wave-on-hover) live in `Mascot.jsx`, driven by GSAP in a `useLayoutEffect`.

## 5. Deploying

- **Frontend**: `npm run build` in `client/`, then deploy the `dist/` folder
  to Vercel, Netlify, GitHub Pages, or Cloudflare Pages. Set `VITE_API_BASE`
  as an environment variable in your host's dashboard before building.
- **Backend**: Render, Railway, Fly.io, or any Node host. Set the same env
  vars from `backend/.env` in your host's dashboard, and update
  `ALLOWED_ORIGIN` to your deployed frontend URL.

## Performance notes

- Vite pre-bundles and code-splits automatically; production build is a
  single small JS/CSS bundle (~97 KB gzipped JS) with no runtime bloat.
- Fonts load via `<link rel="preconnect">` + Google Fonts; GSAP is a normal
  npm dependency, tree-shaken by Vite.
- The loading screen runs a real GSAP timeline (not just a CSS spinner),
  synced to a percentage counter, then wipes away and triggers the hero's
  entrance animation via a `ready` prop.
- Scroll-triggered reveals use `ScrollTrigger` inside a reusable `<Reveal>`
  component with `start: "top 85%"`, and clean up via `gsap.context().revert()`
  on unmount to avoid leaks/duplicate triggers.
