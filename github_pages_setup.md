# ☠ GitHub Pages Setup — Gilded Kraken Player App
*5 minutes. No coding. Free forever.*

---

## What you're doing
Uploading the player app to GitHub so it has a permanent URL.
Players tap the NFC sticker → phone opens that URL → app loads.
Works offline after the first load (service worker caches everything).

---

## Files you need to upload

From your outputs folder, gather these files:

| File | What it does |
|---|---|
| `gilded_kraken_player_v4.html` | The player app |
| `sw.js` | Service worker (offline caching) |
| `manifest.json` | Makes it installable on home screen |
| `icon-192.svg` | App icon (small) |
| `icon-512.svg` | App icon (large) |

Rename `gilded_kraken_player_v4.html` → `index.html` **or** keep the filename and link directly to it. Either works. Linking directly is simpler.

---

## Step-by-step

### 1. Create a GitHub account
Go to **github.com** and sign up if you don't have an account. Free tier is all you need.

### 2. Create a new repository
- Click the **+** icon (top right) → **New repository**
- Name it: `gilded-kraken` (or anything you like)
- Set to **Public** (required for free GitHub Pages)
- Tick **Add a README file**
- Click **Create repository**

### 3. Upload the files
- In your new repo, click **Add file → Upload files**
- Drag all 5 files onto the upload area:
  - `gilded_kraken_player_v4.html`
  - `sw.js`
  - `manifest.json`
  - `icon-192.svg`
  - `icon-512.svg`
- Write a commit message: `Add player app`
- Click **Commit changes**

### 4. Enable GitHub Pages
- Go to your repo's **Settings** tab
- Scroll down to **Pages** (left sidebar)
- Under **Source**, select **Deploy from a branch**
- Branch: **main** · Folder: **/ (root)**
- Click **Save**

### 5. Wait 60 seconds, then check your URL
GitHub Pages URL format:
```
https://YOUR-USERNAME.github.io/gilded-kraken/gilded_kraken_player_v4.html
```

Replace `YOUR-USERNAME` with your actual GitHub username.
Replace `gilded-kraken` with whatever you named the repo.

Test it in your browser — the player app should load.

---

## Set the URL in the NFC prep tool
Open `gilded_kraken_nfc_prep_v2.html`, paste your GitHub Pages URL into the field at the top, tap Save. The app launcher sticker card will update with the correct URL and byte size.

Write the app launcher sticker in NFC Tools using **URL record type** (not Text).

---

## Pre-session player instructions

Tell each player (or put this in the group chat):

> **Before the session** (at home, with wifi):
> 1. Tap the ☠ sticker on the table
> 2. The browser opens — let it fully load
> 3. **iPhone:** tap Share → Add to Home Screen
> 4. **Android:** Chrome may ask to install — say yes, or just leave the tab open
>
> On the boat, tap the sticker again → app opens from cache, no internet needed.

---

## Updating the app later
If you make changes to the player file:
- Upload the new version to GitHub (same filename, it overwrites)
- In `sw.js`, change `'gk-player-v4'` to `'gk-player-v5'` (or any new string)
- This forces all phones to download the fresh version next time they have wifi

---

## Troubleshooting

**Page shows 404:** Wait another minute and refresh. GitHub Pages takes up to 5 minutes the first time.

**Service worker not registering:** Only works on HTTPS. GitHub Pages uses HTTPS automatically — you're fine. Won't work on plain `http://` or `file://` local testing.

**iPhone won't cache offline:** Make sure the player tapped Add to Home Screen. Safari's PWA caching only persists reliably for home screen apps.

**Font doesn't load offline:** The first time the app is opened with wifi, the Google Fonts are cached. After that, offline works fine. If a player opens it for the first time on the boat without signal, the fonts fall back to system serif — the app still works, just looks slightly different.

---

*Setup time: ~5 minutes. Once done, the sticker works forever unless you delete the repo.*
