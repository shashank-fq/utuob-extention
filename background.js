// ===============================
// YouTube Enhancer - Background
// Handles:
// 1. Smart Zoom (Home vs Watch)
// 2. Avoid unnecessary zoom resets
// 3. Keyboard Shortcuts (Shorts + Study Mode)
// ===============================


// Track last page type per tab
const tabPageType = {};


// Detect page type
function getPageType(url) {
  if (!url) return "UNKNOWN";

  if (url.includes("/watch")) {
    return "WATCH_PAGE";
  }

  return "BROWSING_PAGE";
}


// Load saved user settings
async function getSettings() {
  return await chrome.storage.sync.get({
    homeZoom: 80,
    watchZoom: 100
  });
}


// Apply zoom only if page type changed
async function applyZoom(tabId, url) {
  if (!url) return;

  const currentType = getPageType(url);
  const previousType = tabPageType[tabId];

  // If page type is the same, do nothing
  if (currentType === previousType) return;

  const settings = await getSettings();

  if (currentType === "WATCH_PAGE") {
    chrome.tabs.setZoom(tabId, settings.watchZoom / 100);
  } else {
    chrome.tabs.setZoom(tabId, settings.homeZoom / 100);
  }

  // Save the new page type
  tabPageType[tabId] = currentType;
}


// Run zoom logic when tab finishes loading
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.status === "complete" && tab.url?.includes("youtube.com")) {
    applyZoom(tabId, tab.url);
  }
});


// Handle keyboard shortcuts
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;

    chrome.tabs.sendMessage(tabs[0].id, {
      action: command
    });
  });
});


// Clean up when tab closes
chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabPageType[tabId];
});