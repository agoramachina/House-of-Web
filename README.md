# House of Web

A browser extension that transforms your web browsing experience to reflect the style of Mark Z. Danielewski's novel "House of Leaves".

The extension highlights specific words across any webpage:
- **"house"** (in 19 languages) appears in blue monospace text
- **"minotaur"** (in 19 languages) appears in red strikethrough monospace text

## Installation

### Chrome

#### From Chrome Web Store (Recommended)

Install directly from the Chrome Web Store:

https://chromewebstore.google.com/detail/house-of-chrome/mnbekndlgloliogbadocmlgefdacgoch

#### Manual Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the `Chrome` folder from this repository

### Firefox

#### Manual Installation

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Select the `manifest.json` file inside the `Firefox` folder

Note: Temporary add-ons are removed when Firefox is closed. For permanent installation, the extension needs to be signed by Mozilla or installed in Firefox Developer Edition/Nightly with signature checking disabled.

### Tampermonkey / Userscript

For use with Tampermonkey, Greasemonkey, Violentmonkey, or other userscript managers:

1. Install a userscript manager for your browser:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge, Safari, Opera)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge, Opera)
2. Click on the raw `house-of-web.user.js` file in the `Tampermonkey` folder, or create a new script and paste the contents
3. The userscript manager should prompt you to install it

**Configuration:** Edit the `includeSubstrings` variable at the top of the script:
- `true` (default): Matches words inside other words (e.g., "house" in "household")
- `false`: Only matches whole words

## Supported Languages

### "House" variations
| Script | Languages |
|--------|-----------|
| Latin | English, French (maison), German (haus), Spanish/Italian/Portuguese (casa), Latin (domus), Dutch (huis), Swedish/Norwegian/Danish (hus) |
| Cyrillic | Russian (Дом), Ukrainian (будинок), Bulgarian (къща) |
| Greek | Greek (σπίτι) |
| CJK | Japanese/Chinese (家), Korean (집) |
| Other | Hebrew (בית), Arabic (بيت), Malayalam (വീട്) |
| Constructed | Klingon (juH qach), Vulcan (-kelek), Lojban (zdani) |

### "Minotaur" variations
| Script | Languages |
|--------|-----------|
| Latin | English, French (minotaure), Spanish/Italian/Portuguese (minotauro), Greek romanized (minotauros), Latin/German/Dutch (minotaurus) |
| Cyrillic | Russian (Минотавр), Ukrainian (Мінотавр), Bulgarian (Минотавър) |
| Greek | Greek (Μινώταυρος) |
| CJK | Japanese (ミノタウロス, ミーノータウロス), Korean (미노타우로스), Chinese (弥诺陶洛斯) |
| Other | Hebrew (מינוטאור), Arabic (مينوتور), Malayalam (മിനോട്ടോർ) |
| Constructed | Klingon (veqlargh), Vulcan (stislak), Lojban (cizda'u) |
