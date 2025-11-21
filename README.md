# House of Web

A browser extension that transforms your web browsing experience to reflect the style of Mark Z. Danielewski's novel "House of Leaves".

The extension highlights specific words across any webpage:
- **"house"** (in 19 languages) appears in blue monospace text
- **"minotaur"** (in 19 languages) appears in red strikethrough monospace text

## Installation

### Chrome

#### Simple Installation

For the easiest installation on Chrome, it is recommended to install DetectiveR's original [House of Chrome](https://chromewebstore.google.com/detail/house-of-chrome/mnbekndlgloliogbadocmlgefdacgoch) extension directly from the Chrome Web Store.

For the latest features, you will need to install manually from this repository using the instructions below.

#### Manual Installation

1. Clone this repository, or download the latest [Release](https://github.com/agoramachina/House-of-Web/releases/latest) and unzip it. This is where Chrome will look for the extension, so make sure it's in a location where it won't be moved or deleted.
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the `Chrome` folder from this repository

### Firefox

1. Download the `.xpi` file from the latest [Release](https://github.com/agoramachina/House-of-Web/releases/latest)
2. Open Firefox and navigate to `about:addons`
3. Click the gear icon and select "Install Add-on From File..."
4. Select the downloaded `.xpi` file

### Userscript

For use with Tampermonkey, Greasemonkey, Violentmonkey, or other userscript managers:

1. Install a userscript manager for your browser:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Edge, Safari, Opera)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge, Opera)
2. Download the latest `house-of-web.user.js` file from the [Releases](https://github.com/agoramachina/House-of-Web/releases/latest) page, or create a new script and paste the [code](https://github.com/agoramachina/House-of-Web/blob/main/Userscript/house-of-web.user.js) from this repository
3. The userscript manager should prompt you to install it

## Configuration

The extension includes an option to toggle substring matching:
- **Enabled** (default): "house" matches inside "household", "warehouse", etc.
- **Disabled**: Only standalone words are highlighted

### Chrome / Firefox

1. Right-click the extension icon in your browser toolbar
2. Select "Options" (Chrome) or "Manage Extension" → "Preferences" (Firefox)
3. Toggle the "Match substrings" checkbox

### Userscript

Edit the `includeSubstrings` variable at the top of the script:
```javascript
const includeSubstrings = true;  // Set to false for whole-word matching only
```

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

## Acknowledgements

House of Web is based on code from DetectiveR's [House of Chrome](https://chromewebstore.google.com/detail/house-of-chrome/mnbekndlgloliogbadocmlgefdacgoch) extension.
