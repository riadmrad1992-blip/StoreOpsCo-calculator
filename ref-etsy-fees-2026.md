# Etsy fee facts behind the default settings (US, 2026)

These come from 2026 fee guides and Etsy's own pages, gathered for the StoreOpsCo fee video. **Re-check Etsy's Fees & Payments Policy before launch and whenever Etsy announces a change.** Fees differ by country.

- Listing fee: $0.20 per listing. It is charged again when the item sells.
- Transaction fee: 6.5% of the total order price, **shipping included**.
- Payment processing (US): 3% + $0.25 per order, also on the order total.
- Offsite Ads: if a sale comes from an Etsy Offsite Ad, Etsy charges 15% of the order for shops under $10,000 in sales over the last 12 months (they can opt out), or 12% for shops over $10,000 (mandatory). Because a seller does not know which orders will come from ads, the calculator sets aside a small percentage (default 3%) across all sales.
- Currency conversion: about 2.5% when the shop currency differs from the bank account currency. Some countries also add a regulatory operating fee.

## How the defaults map
- `feePct` 9.5 = transaction 6.5 + processing 3
- `fixedFee` 0.45 = listing 0.20 + processing flat 0.25
- `adsBufferPct` 3 = an average set-aside for Offsite Ads
- `refundPct` 2 = a small refund allowance

## Copy that must appear on the page
"US Etsy rates, 2026. Fees change and differ by country: check Etsy's Fees & Payments Policy for yours. This calculator gives estimates from the numbers you enter."
