# House of Web - Future Features

This document tracks planned features and improvements for the House of Web browser extension.

## Planned Features

### Options Page

Create a settings UI accessible from the browser's extension options.

**Files needed:**
- `options.html` - Settings UI
- `options.js` - Save/load settings logic
- `options.css` - Styling (optional)

**Manifest changes:**
```json
{
  "options_page": "options.html",
  "permissions": ["storage"]
}
```

**Features:**

#### 1. Language Selection
- Checkboxes to enable/disable individual languages
- Group by script type (Latin, Cyrillic, CJK, etc.)
- "Select All" / "Deselect All" buttons

#### 2. Substring Matching Options
Radio button group with three options:

| Option | Behavior |
|--------|----------|
| Whole words only | Uses `\b` word boundaries. Safest option. "house" matches but not "household" |
| Substrings for foreign languages | Auto-detects user language via `navigator.language`. Uses word boundaries for user's native language, substrings for others |
| All substrings | Current behavior. Matches words even inside other words |

**Implementation for language detection:**
```javascript
const userLang = navigator.language.split('-')[0]; // "en", "fr", etc.

// In languages.js, tag each word with its language:
const houseWords = [
  { word: 'house', lang: 'en' },
  { word: 'maison', lang: 'fr' },
  // ...
];

// When building regex, use word boundaries for user's language
function buildPattern(words, userLang, substringMode) {
  return words.map(w => {
    if (substringMode === 'all') return w.word;
    if (substringMode === 'whole') return `\\b${w.word}\\b`;
    // 'foreign' mode: word boundary only for user's language
    return w.lang === userLang ? `\\b${w.word}\\b` : w.word;
  }).join('|');
}
```

#### 3. Live Preview
A sample text area showing how highlighting would appear with current settings:

```
Sample preview text:
"Welcome to my house. The household gathered in the Bauhaus-style building.
In Swedish, we call it 'hus'. The minotaur roamed the labyrinth, a
minotauro in Spanish tales. Дом means house in Russian. 家 is Japanese."
```

- Updates in real-time as settings change
- Shows both "house" (blue) and "minotaur" (red strikethrough) highlighting

### Storage Schema

```javascript
{
  "substringMode": "whole" | "foreign" | "all",
  "enabledLanguages": {
    "en": true,
    "fr": true,
    "de": true,
    // ...
  }
}
```

**Reading settings in main.js:**
```javascript
chrome.storage.sync.get(['substringMode', 'enabledLanguages'], (settings) => {
  const mode = settings.substringMode || 'whole';
  const enabled = settings.enabledLanguages || getAllLanguagesEnabled();
  // Apply highlighting with these settings
});
```

---

## Language Expansion Ideas

### Potential additions (pending research):
- More Indic languages (Tamil, Telugu, Bengali)
- More East Asian (Traditional Chinese, Cantonese)
- Ancient languages (Sanskrit, Ancient Greek, Old English)
- More constructed languages (Esperanto, Quenya, Sindarin)

### Criteria for inclusion:
1. Verified translation from reliable source
2. Safe from common substring collisions (or mitigated by word boundary mode)
3. Both "house" AND "minotaur" available in that language

---

## Technical Debt

- [ ] Consider using a build step to combine languages.js + main.js for production
- [ ] Add unit tests for regex patterns
- [ ] Consider lazy-loading language data for performance

---

## Version History

- **v1.0.0** - Initial release with 8 languages
- **v1.1.0** - Added flashing fix, Greek support, language separation
