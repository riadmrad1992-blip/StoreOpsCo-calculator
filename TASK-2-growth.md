# Task 2: upgrade message, email sign-up link and optional visit counter

Read `CLAUDE.md` first (all its rules still apply: no framework, no build step, classic scripts, everything runs in the browser, honest copy, plain-language errors, public repo, be honest about testing). Make decisions yourself and note them in the pull request. Ask a question only if you are truly blocked.

## Goal
The calculator is free and prices **one product at a time**. Profit Pilot prices every product and flags the ones losing money. This task makes that difference clear without turning the page into an ad, lets visitors opt in to hear about future products, and lets Riad count visits without breaking the privacy promise.

**Keep the calculator single-product.** Do not add saving several products, comparing products, exporting reports or accounts. Those are Profit Pilot features and must not appear here.

## 1. Config (`config.js`)
Add these keys, all empty by default, with a one-line comment each telling Riad what to paste:
- `EMAIL_SIGNUP_URL`: a link to a sign-up page hosted by his email tool
- `ANALYTICS_SCRIPT_SRC`: the address of a privacy-friendly analytics script
- `ANALYTICS_ATTRS`: an object of extra attributes for that script tag (for example `{ "data-token": "…" }`)
- `ANALYTICS_NOTE`: the sentence shown in the privacy note when analytics is on (default text: "Anonymous visit counts only. No cookies, no personal data.")

Rule for all of them: **if a value is empty, show nothing and load nothing.**

## 2. Upgrade message (quiet)
- Replace the current Next-step card text with: "This calculator prices one product. Profit Pilot prices every product in Notion, flags the ones that lose money, and keeps your Etsy fee settings in one place." Keep the two buttons from `config.js` (hidden if empty).
- When the result's health is **Losing money** or **Below target**, add one extra line under the result (not a pop-up, no animation): "Most shops sell more than one product. Check them all at once in Profit Pilot." It links to `SHOP_URL` if set, otherwise it is plain text. Never show it when the health is Healthy or No price yet.
- Do not use urgency, discounts, countdowns or claims about results.

## 3. Email sign-up (link-out, no third-party scripts)
- Add a small card under the Next-step card: heading "New free tools and Etsy back-office tips", one line "A short email when something new is ready. Unsubscribe any time.", and one button "Get updates".
- The button opens `EMAIL_SIGNUP_URL` in a new tab with `rel="noopener"`. Hide the whole card when the URL is empty.
- Under the button add: "Your calculator numbers are never sent."
- **Do not embed a form or load any script from an email provider.** A plain link keeps the page free of third-party code.

## 4. Optional privacy-friendly visit counter
- If `ANALYTICS_SCRIPT_SRC` is set, add one `<script defer>` with that source and the attributes from `ANALYTICS_ATTRS`, loaded after the page content. If it is empty, no analytics code or request exists at all.
- When it is on, append `ANALYTICS_NOTE` to the existing privacy note on the page. When it is off, the page must say exactly what it says today.
- No cookie banner is added (the supported scripts are cookie-less); the README tells Riad to check the provider's current terms before turning it on.

## 5. Small copy and README changes
- Meta description: keep it natural and add the phrase "Etsy fee calculator" once.
- README: a short section "Links to use in videos and posts" with ready-to-copy examples that carry a source tag, for example `https://riadmrad1992-blip.github.io/StoreOpsCo-calculator/?utm_source=youtube&utm_medium=video4` (and `utm_medium=short`, `utm_source=tiktok`, `utm_source=instagram`, `utm_source=linkedin`). Explain in two lines that analytics tools show these tags, so Riad can see which video sends visitors.
- README: a section "Turning on the email link and the visit counter" in plain language, with the exact lines to edit in `config.js`.

## Acceptance (check each one and list the result in the pull request)
- [ ] `npm test` still passes all 8 cases (the maths is untouched).
- [ ] With every new config value empty, the page looks and behaves exactly as before except for the new Next-step wording, and no extra network request exists.
- [ ] With `EMAIL_SIGNUP_URL` set, the card appears and the button opens the link in a new tab with `rel="noopener"`.
- [ ] The extra upgrade line appears only for Losing money and Below target, and is hidden for Healthy and No price yet.
- [ ] With `ANALYTICS_SCRIPT_SRC` set (use a harmless test address and say so), exactly one deferred script tag is added with the given attributes, and the privacy note changes; with it empty, no script tag exists.
- [ ] No horizontal scroll at 360px; tap targets at least 44px; focus rings visible.
- [ ] No console errors. No new third-party requests other than the optional analytics script.
- [ ] No multi-product features were added.

## How to work (to save credit)
Do the config and the three cards first, check them at 360px and 1280px, then the optional script and the README. Commit in small steps and open one pull request at the end.

## Pull request description must include
- What was built, in five lines
- The acceptance checklist with results
- What you could not test
- Decisions Riad should know about
