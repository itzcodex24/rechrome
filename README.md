# ReChrome

A visual archive for browsing and downloading every past stable Chrome/Chromium version across all major platforms — Windows, macOS, Linux, and Android.

**Live site:** [rechrome.dev](https://rechrome.dev)

---

## Features

- **All stable Chrome versions** — pulls from two sources and deduplicates, sorted newest-first
- **Platform support** — Windows 32/64-bit, macOS Intel & Apple Silicon, Linux 64-bit, Android APK
- **Auto OS detection** — highlights the right platform for your system on load
- **Search** — filter versions in real time
- **One-click download** — direct links to official Google archives
- **Copy URL** — copy any download link to clipboard with visual feedback
- **Dark / light theme** — respects system preference, toggleable manually

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI, shadcn/ui |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Theming | next-themes |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## Data Sources

Versions are fetched at request time from two public sources and merged:

- **[Bugazelle chromium-all-old-stable-versions](https://github.com/Bugazelle/chromium-all-old-stable-versions)** — comprehensive historical archive
- **[Google Chrome Labs known-good-versions](https://googlechromelabs.github.io/chrome-for-testing/)** — official newer releases

Big thanks to [`@barbietunnie`](https://github.com/barbietunnie) for the original [Gist](https://gist.github.com/barbietunnie/a4f8475e0f0566597f7de74394ec7c8b) that started this.

---

## Getting Started

```bash
git clone https://github.com/itzcodex24/rechrome
cd rechrome
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_URL` | `https://rechrome.dev/` | Base URL used in metadata and sitemap |

No `.env` file is required for local development — all external APIs are public.

### Scripts

```bash
npm run dev      # development server (Turbopack)
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

---

## Contributing

PRs are welcome. To contribute:

1. Fork the repo and create a branch
2. Make your changes
3. Open a pull request against `master`

Please keep changes focused — fix one thing or add one feature per PR.

---

## License

MIT
