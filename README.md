# StoreOpsCo Etsy price calculator

A free one-page calculator for Etsy sellers. You enter your costs and your Etsy settings, and it shows the price you should charge, your real profit, and where the money goes.
It uses the same maths as the Profit Pilot Notion template, and everything runs in the visitor's browser: nothing they type is sent anywhere.

## 1. See it on your laptop

Open the folder and **double-click `index.html`**. It opens in your web browser and works straight away. You don't need to install anything.

## 2. Add your links

The page can show two buttons: one for Profit Pilot and one for your video. They stay hidden until you add the links.

1. Right-click `config.js` → **Open with** → **Notepad**.
2. Paste your Etsy listing link between the quotes after `SHOP_URL:`, and your YouTube video link between the quotes after `VIDEO_URL:`. For example:
   ```
   SHOP_URL: "https://www.etsy.com/listing/123456789/profit-pilot",
   VIDEO_URL: "https://www.youtube.com/watch?v=abc123",
   ```
   Keep the quotes and the comma at the end of each line.
3. Save the file (Ctrl + S), then refresh the page in your browser.

If you leave a link empty (`""`), its button does not appear, so visitors never see a broken link.

## 3. Publish it for free with GitHub Pages

This gives you a public link to put in videos, Shorts and LinkedIn posts.

1. On GitHub, open this repository.
2. The repository must be **public** for GitHub Pages to work on a free account. If it is private: **Settings** → scroll to the bottom (**Danger Zone**) → **Change visibility** → **Make public**.
3. Click **Settings** (top of the repository page).
4. In the left menu, click **Pages**.
5. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
6. Under **Branch**, choose **`main`** and the folder **`/ (root)`**, then click **Save**.
7. Wait 1–2 minutes and refresh the page. At the top it shows your link. It looks like `https://USERNAME.github.io/REPOSITORY/`.

From then on, every change saved to the `main` branch republishes the page automatically (it takes a minute or two).

## 4. Run the tests (optional)

The tests check the maths against the worked examples in `ref-test-cases.json`.

1. Install **Node.js LTS** from [nodejs.org](https://nodejs.org) (accept the default options).
2. Open the project folder in File Explorer, click the address bar, type `cmd` and press Enter. A terminal opens in that folder.
3. Type `npm test` and press Enter.

You should see `# pass 15` and `# fail 0` at the end.

## 5. Check before you share

- Open the page and look at the example (wax melts): the recommended price should be **$19.53**.
- Click **Clear example** and try one of your own products.
- Open the page on your phone (after publishing) and type a few numbers.
- Compare the fee defaults with Etsy's **Fees & Payments Policy**. The defaults are US 2026 rates; Etsy changes them from time to time and they differ by country.

## What's in the folder

| File | What it is |
|---|---|
| `index.html` | The page |
| `styles.css` | Colours, fonts and layout |
| `calc.js` | The maths (same formulas as Profit Pilot) |
| `app.js` | Makes the page work: reads what you type and updates the results |
| `config.js` | Your links |
| `calc.test.js` | The tests |
| `ref-*.md`, `ref-test-cases.json` | Reference notes: formulas, fees, brand, wording |
