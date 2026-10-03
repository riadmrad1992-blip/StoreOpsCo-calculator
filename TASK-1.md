# Task 1: build the Etsy price calculator

Read `CLAUDE.md` first, then `ref-formulas.md`, `ref-test-cases.json` and `ref-brand.md` once. Make decisions yourself and note them in the pull request. Ask a question only if you are truly blocked.

## Goal
A free single-page calculator. Riad double-clicks `index.html` and it works; after the pull request is merged he turns on GitHub Pages and has a public link to put in videos, Shorts and LinkedIn posts.

## Files to create (all at the top level, no sub-folders except none)
- `index.html`: the page (semantic HTML, labelled inputs, one `<h1>`, page `<title>` "Etsy price calculator: what should you really charge? | StoreOpsCo", a meta description, Open Graph title and description)
- `styles.css`: the brand styling, mobile first
- `calc.js`: pure functions only (no DOM). Browser: `window.Calc`. Node: `module.exports`. Exposes `calculate(inputs)` returning everything the page needs (material cost, labour cost, total cost, recommended price or an error code, and, when a current price is given, sale price, real profit, margin %, price gap, health, plus the receipt lines)
- `app.js`: reads the form, calls `Calc.calculate`, updates the page live as the seller types, handles material lines (add / remove), the example, reset, and saving to `localStorage` (wrap every read and write in try/catch; the page must work if storage is blocked)
- `config.js`: `window.CONFIG = { SHOP_URL: "", VIDEO_URL: "", SITE_NAME: "StoreOpsCo" }`, with a comment telling Riad where to paste his links. **If a URL is empty, hide that button entirely.** Never ship a dead link.
- `calc.test.js`: tests using Node's built-in runner (`node --test`), no dependencies. It must load `ref-test-cases.json` and check every case (money to the cent, margin to 0.1)
- `package.json`: only a `test` script (`node --test`) and no dependencies
- `README.md`: for a non-developer, in plain language (see below)
- `.gitignore`: `node_modules/`

## The page
1. **Header:** the type-set wordmark, then the H1 and subhead from `ref-brand.md`.
2. **Your product** (card): product name (optional), **materials** as lines (name, pack price, pack quantity, amount used; add and remove lines; start with the three wax-melt lines as the example, with a clear "Clear example" action), minutes per product, hourly rate, packaging, shipping cost (what you pay), overhead, and the price you charge now (optional).
3. **Etsy and selling settings** (card, open by default but collapsible): the nine settings from `ref-formulas.md` with the defaults. Each has one line of helper text taken from `ref-profit-pilot-wording.md`. Percent fields show a fixed "%" suffix; currency fields show the symbol.
4. **Result** (card): the **recommended price** large in orange with the single glow; under it "Based on a {margin}% margin". If a current price was entered, show the **health pill** (words plus colour), **real profit**, **margin** and **price gap**. Show "Total cost per product" with materials and time broken out.
5. **Where the money goes** (card): the receipt from `ref-formulas.md` at the recommended price, as aligned label/value rows, ending with Profit in green.
6. **Next step** (card): two short lines about Profit Pilot ("Do this for every product, automatically" and what it tracks) with the two buttons from `config.js`. Keep it quiet; this is not an ad banner.
7. **Footer:** the fee disclaimer from `ref-etsy-fees-2026.md` and "Made by StoreOpsCo".
8. A **currency symbol** selector ($, £, €, and a free-text option is not needed). It changes display only; say so in a small note.
9. **Layout:** one column on phones. On wide screens put inputs on the left and a sticky result column on the right. On phones show a compact sticky bar at the bottom with the recommended price so it stays visible while typing.

## Behaviour details
- Live updates on every input, no "Calculate" button. Use `inputmode="decimal"` on numeric fields and accept both "." and "," as the decimal mark.
- Empty counts as 0. A negative number shows "Enter 0 or more" next to the field and is ignored in the maths.
- If `packQty` is 0 or empty on a material line, that line costs 0 and shows "Add a pack quantity".
- Impossible settings (see `ref-formulas.md`): show the friendly message in the result card instead of a price.
- The page must still be useful with only a few fields filled in.
- No console errors. No external requests except Google Fonts.

## Accessibility and quality
- Every input has a visible `<label>`; helper text is linked with `aria-describedby`; the result region uses `aria-live="polite"` so screen readers hear updates.
- Colour is never the only signal (the health pill has words).
- Text contrast of at least 4.5:1. Visible focus rings. Respect `prefers-reduced-motion`.
- No horizontal scroll at 360px. Tap targets at least 44px.

## README.md must contain (plain language, Windows)
1. What this is, in two lines.
2. How to see it on your laptop: double-click `index.html`.
3. How to change your links: open `config.js` in Notepad, paste your Etsy shop link and video link between the quotes, save.
4. **How to publish it for free with GitHub Pages**, step by step with button names: the repository must be **public** for free GitHub accounts; Settings → Pages → Build and deployment → Source "Deploy from a branch" → Branch `main`, folder `/ (root)` → Save → wait 1–2 minutes → the page shows the link (it looks like `https://USERNAME.github.io/REPOSITORY/`). Mention that every later change to `main` republishes automatically.
5. How to run the tests (optional): install Node.js LTS, open a terminal in the folder, `npm test`.
6. A short "what to check before sharing" list: try the example, try your own product, check on your phone, check the fee defaults against Etsy's fee page.

## Acceptance (check each one and list the result in the pull request)
- [ ] `npm test` passes for all 8 cases in `ref-test-cases.json` (list the output).
- [ ] With the example loaded, the page shows recommended price **$19.53**, and entering a current price of 10 shows **−$2.29**, "Losing money". Entering 19.53 shows **+$5.86**, **30.0%**, "Healthy". (Check this in a real browser run, not only in the unit tests.)
- [ ] The receipt lines add up to the recommended price within 1 cent, for at least 3 different inputs.
- [ ] Typing "30" into a percent field gives 30%, and nothing in the page asks for a % sign.
- [ ] `index.html` works when opened by double-click (no module or fetch errors), and works with `localStorage` blocked.
- [ ] Layout checked at 360px, 768px and 1280px wide: no horizontal scroll, nothing overlapping, sticky bar visible on the narrow layout.
- [ ] If `SHOP_URL` and `VIDEO_URL` are empty, both buttons are hidden. If set, they open in a new tab with `rel="noopener"`.
- [ ] No console errors and no network requests other than Google Fonts.
- [ ] Page copy matches `ref-brand.md` and contains the fee disclaimer.

## How to work (to save credit)
1. Build `calc.js` and its tests first. Get all 8 cases passing before any styling.
2. Build the page with plain inputs, check the numbers in a browser, then do the styling.
3. Check the layout with screenshots at the three widths. Do not keep re-reading the reference files.
4. Commit in small steps. Open one pull request at the end.

## Pull request description must include
- What was built, in five lines
- The acceptance checklist with results
- What you could not test
- Decisions you made that Riad should know about
