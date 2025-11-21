// Use browser API for Firefox compatibility, fall back to chrome for Chrome
const storage = (typeof browser !== 'undefined' ? browser : chrome).storage.sync;

const checkbox = document.getElementById('includeSubstrings');
const savedIndicator = document.getElementById('savedIndicator');
const exampleText = document.getElementById('exampleText');

// Update example text based on setting
function updateExample(includeSubstrings) {
  if (includeSubstrings) {
    exampleText.innerHTML =
      'Example: "<span class="house">house</span>hold", "ware<span class="house">house</span>", "<span class="house">house</span>"';
  } else {
    exampleText.innerHTML =
      'Example: "<span class="no-match">household</span>", "<span class="no-match">warehouse</span>", "<span class="house">house</span>"';
  }
}

// Load saved setting
storage.get(['includeSubstrings'], (result) => {
  // Default to true (substrings enabled)
  const value = result.includeSubstrings !== undefined ? result.includeSubstrings : true;
  checkbox.checked = value;
  updateExample(value);
});

// Save setting when changed
checkbox.addEventListener('change', () => {
  const value = checkbox.checked;
  storage.set({ includeSubstrings: value }, () => {
    // Show saved indicator
    savedIndicator.classList.add('show');
    setTimeout(() => {
      savedIndicator.classList.remove('show');
    }, 1500);
  });
  updateExample(value);
});
