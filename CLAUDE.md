# StoreOpsCo free Etsy price calculator

## What this is
StoreOpsCo is a faceless YouTube channel plus Notion templates for Etsy sellers (Profit Pilot, Customer Response Bank, Refund & Dispute Manager). The owner is **Riad**, a solo founder in Beirut. He is **not a developer** and works on a **Windows laptop**.

This repo is a **free, single-page web calculator**: a seller enters their costs and Etsy settings and sees the price they should charge, their real profit, and where the money goes. It is a **lead magnet**: every video, Short and LinkedIn post can link to it, and it points people to Profit Pilot.

## Rules that never change
1. **No build step, no framework, no dependencies in the browser.** Plain `index.html`, `styles.css`, `calc.js`, `app.js`, `config.js`. Riad must be able to double-click `index.html` and see it work, and host it on GitHub Pages with zero setup.
2. **Classic scripts only, not ES modules** (modules do not load when a file is opened by double-click). `calc.js` attaches `window.Calc` in the browser and also exports for Node (`module.exports`) so tests can use it.
3. **The maths must match Profit Pilot exactly.** The formulas and reference numbers are in `ref-formulas.md` and `ref-test-cases.json`. Do not "improve" them. Do not round intermediate values; round only the final recommended price to cents, and round for display.
4. **Everything runs in the browser.** No server, no accounts, no tracking, no analytics, no cookies, no network calls (apart from loading Google Fonts). Nothing the seller types leaves their device. Saving inputs in `localStorage` is allowed.
5. **This repo will be public.** Never add secrets, personal data or anything private.
6. **Percentages are typed as plain numbers.** 30 means 30%. Show the "%" as a fixed suffix beside the input, never ask the seller to type it. (In Profit Pilot, typing a % sign broke prices, so this must be consistent.)
7. **Honest copy only.** No guarantees, no "boost your profits", no made-up statistics. Fee defaults are US 2026 rates and are labelled as such. See `ref-etsy-fees-2026.md`.
8. **Plain-language errors.** Bad or impossible input gets a short friendly message next to the field, never a blank result or a crash.
9. **Mobile first.** Most Etsy sellers will open this on a phone: it must work at 360px wide with no sideways scrolling and tap targets of at least 44px.
10. **Be honest about testing.** If you could not check something, say so in the pull request. Do not claim it was tested.

## Brand (details in `ref-brand.md`)
Dark Midnight page `#0E141B`, cards `#151D27`, text `#F3F1EC`, muted `#8C97A3`, Signal Orange `#F27A2E` for the one key number, Ledger Green `#2FBF71` for profit, loss red `#FF6B70`, caution `#F5A524`. Fonts: Plus Jakarta Sans 800 for headings and big numbers, Inter for everything else. Wordmark is set in type: "StoreOps" in text colour, "Co" in orange (no logo file here).

## Where things are
Reference files sit at the top level and start with `ref-`. **Leave them where they are; do not move or edit them.**
- `ref-formulas.md`: the exact maths, fields, defaults, rounding, health rules
- `ref-test-cases.json`: 8 worked examples with expected results (use them as tests)
- `ref-etsy-fees-2026.md`: the Etsy fee facts behind the default settings
- `ref-profit-pilot-wording.md`: the helper text Profit Pilot uses for each field (reuse it so both products read the same)
- `ref-brand.md`: colours, type, spacing, voice, example copy
- `TASK-1.md`: the current task
