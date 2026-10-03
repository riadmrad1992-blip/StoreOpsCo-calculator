# The maths (must match Profit Pilot exactly)

All money values are in one currency; the currency symbol is display only. Empty inputs count as 0. Negative inputs are not allowed (show a message and ignore the value).

## Inputs

**Product**
- `materialLines[]`: each line has `name`, `packPrice`, `packQty`, `used` (amount used per product, same unit as packQty). Cost of a line = `packPrice / packQty * used` (0 if `packQty` is 0 or empty).
- `laborMinutes`, `hourlyRate`
- `packaging`: packaging cost per product
- `shippingCost`: what the seller pays the carrier per order
- `overhead`: overhead per item
- `currentPrice` (optional): the price they charge now

**Etsy and selling settings** (defaults in brackets)
- `feePct` [9.5]: transaction fee 6.5 + payment processing 3
- `fixedFee` [0.45]: listing fee 0.20 + processing flat 0.25
- `adsBufferPct` [3]: set-aside for Etsy Offsite Ads
- `refundPct` [2]: refund allowance
- `targetMarginPct` [30]
- `discountPct` [0]: typical discount
- `shippingCharged` [0]: shipping the buyer pays
- `etsyAdsPerSale` [0]: Etsy Ads spend per sale
- `marketingPerSale` [0]: marketing outside Etsy per sale (monthly spend ÷ units sold that month)

## Calculations (do not round until the end)

```
materialCost = sum over lines of (packPrice / packQty * used)
laborCost    = laborMinutes / 60 * hourlyRate
totalCost    = materialCost + packaging + laborCost + overhead + shippingCost

discount = discountPct / 100
feeRate  = (feePct + adsBufferPct) / 100
refund   = refundPct / 100
margin   = targetMarginPct / 100

top    = totalCost + etsyAdsPerSale + marketingPerSale + fixedFee - shippingCharged * (1 - feeRate)
bottom = (1 - discount) * (1 - feeRate - refund - margin)
recommendedPrice = bottom <= 0 ? 0 : round(top / bottom, 2 decimals)
```

If `bottom <= 0`: no price can work with these settings. Show: "Your fees, refunds and margin target add up to 100% or more, so no price can work. Lower the margin target or the fees." and do not show a price.

**At the current price** (only if `currentPrice > 0`):

```
salePrice  = currentPrice * (1 - discount)
orderTotal = salePrice + shippingCharged
fees       = orderTotal * feeRate + fixedFee
refunds    = salePrice * refund
realProfit = orderTotal - fees - refunds - totalCost - etsyAdsPerSale - marketingPerSale
marginPct  = salePrice == 0 ? 0 : realProfit / salePrice * 100
priceGap   = recommendedPrice - currentPrice
```

**Health** (same rules as the Profit Pilot Health column):
1. `currentPrice` empty or 0: "No price yet"
2. `realProfit < 0`: "Losing money" (red)
3. `currentPrice < recommendedPrice`: "Below target" (orange/caution)
4. otherwise: "Healthy" (green)

Always show the words as well as the colour.

## Where the money goes (the receipt)
Show it at the **recommended price**. Lines, in this order: Materials, Your time, Packaging, Shipping, Overhead, Etsy fees (feeRate part), Fixed fee, Etsy Ads, Marketing, Refunds, then **Profit** in green. Use the same calculations as above with `currentPrice = recommendedPrice`. Show each line to cents; the lines must add up to the price within 1 cent.

## Rounding and display
- Round money to 2 decimals for display. Percentages to 1 decimal.
- Use a real minus sign "−" for negatives (not a hyphen), for example "−$2.29".
- Do not round `materialCost`, `laborCost` or any other intermediate value before the final step. (This is why Profit Pilot gives $19.53 for the example, not $19.54.)

## Worked example (the Video 1 wax melt pack)
Soy wax $35 / 4,500 g × 70 g, lavender oil $28 / 450 ml × 5 ml, clamshell $30 / 50 × 1 → materials $1.46. Labour 10 min at $20/h = $3.33. Packaging $0.80, shipping $4.50, overhead $0.30 → total cost $10.39. Settings 9.5 / 0.45 / 3 / 2 / 30. Recommended price **$19.53**. At $10.00 the real profit is **−$2.29** (Losing money). At $19.53 the real profit is **+$5.86**, margin 30.0%, Healthy.

More cases, with expected results, are in `ref-test-cases.json`.
