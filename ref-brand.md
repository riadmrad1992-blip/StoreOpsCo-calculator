# StoreOpsCo brand for this page

## Colours
| Token | Value | Use |
|---|---|---|
| ground | `#0E141B` | page background (Midnight) |
| ground-deep | `#0A0E13` | bottom of the page gradient |
| surface | `#151D27` | cards |
| surface-raised | `#1B2531` | top stop of a card gradient, focused fields |
| line | `#26313D` | borders and rules |
| ink | `#F3F1EC` | text and numbers |
| ink-muted | `#8C97A3` | labels, helper text (passes 4.5:1 on ground and surface) |
| signal | `#F27A2E` | the recommended price, primary button fill, the "Co" in the wordmark |
| on-signal | `#0E141B` | text on an orange fill |
| ledger | `#2FBF71` | profit, Healthy |
| loss | `#FF6B70` | Losing money, negative profit |
| caution | `#F5A524` | Below target |

Page background: vertical gradient `ground-deep` to `ground`, one soft lighter-blue highlight at the top, one faint orange glow in a bottom corner, and a very faint hairline grid (about 3.5% opacity). Cards: gradient `surface-raised` to `surface`, 1px `line` border, radius 18px, shadow `0 24px 50px -24px rgba(0,0,0,.8)`.

**One glow per screen:** only the recommended price gets `text-shadow: 0 0 40px rgba(242,122,46,.45)`.

## Type
- Headings and big numbers: Plus Jakarta Sans 800, tight tracking (-0.02em to -0.03em).
- Everything else: Inter 500/600/700. Body 15px. Labels 13px. Uppercase kickers 12px with 0.14em tracking in `ink-muted`.
- Numbers use tabular figures (`font-variant-numeric: tabular-nums`).
- Load fonts from Google Fonts with `display=swap` and real fallback stacks.

## Shape
Radius: 8 (inputs, small tags), 14 (tiles), 18 (cards), 999 (pills and buttons). Focus ring: 3px signal outline, 2px offset. Buttons: pill, primary = signal fill with `on-signal` text, secondary = surface with a line border.

## Voice
A calm operator who has done the maths for you. Plain words, short sentences, real numbers. No hype ("game-changer", "unlock", "boost"), no fear. Lead with the number.

Good lines: "Find the price that actually pays you." · "Every hidden cost. Counted." · "Your time is a cost." · "Check the math."

## Page copy to use
- Title / H1: **Etsy price calculator**
- Subhead: Enter your costs once. See the price that covers your time, shipping, Etsy fees, ads and refunds, and still leaves the profit you want.
- Result label: **Recommended price**
- Under it: "Based on a 30% margin" (use the real target)
- CTA primary: **Track every product in Profit Pilot** (only if `SHOP_URL` is set)
- CTA secondary: **Watch how the formula works** (only if `VIDEO_URL` is set)
- Footer: the fee disclaimer from `ref-etsy-fees-2026.md`, plus "Made by StoreOpsCo".
