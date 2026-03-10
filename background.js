// ===============================
// YouTube Enhancer - Background
// Handles:
// 1. Smart Zoom (Home vs Watch)
// 2. Keyboard Shortcuts (Shorts + Study Mode)
// ===============================


// Load saved user settings (or defaults)
async function getSettings() {
  return await chrome.storage.sync.get({
    homeZoom: 80,
    watchZoom: 100
  });
}


// Apply zoom depending on the current page type
async function applyZoom(tabId, url) {
  if (!url) return;

  const settings = await getSettings();

  // Video watch page → use Watch Zoom
  if (url.includes("/watch")) {
    chrome.tabs.setZoom(tabId, settings.watchZoom / 100);
  }

  // All other YouTube pages → use Home Zoom
  else {
    chrome.tabs.setZoom(tabId, settings.homeZoom / 100);
  }
}


// Apply zoom whenever a YouTube tab finishes loading
chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.status === "complete" && tab.url?.includes("youtube.com")) {
    applyZoom(tabId, tab.url);
  }
});


// Keyboard shortcuts handler
// Sends shortcut action to content.js
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return;

    chrome.tabs.sendMessage(tabs[0].id, {
      action: command
    });
  });
});
