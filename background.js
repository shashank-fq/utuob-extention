// Smart YouTube Zoom Controller
// - Watch pages: 100%
// - Everything else: 75%

function applyZoom(tabId, url) {
    if (!url) return;

    // Video page → normal zoom
    if (url.includes("youtube.com/watch")) {
        chrome.tabs.setZoom(tabId, 1.0);
    }
    // All other YouTube pages → 75%
    else {
        chrome.tabs.setZoom(tabId, 0.75);
    }
}

// Apply zoom whenever a YouTube tab finishes loading
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.includes("youtube.com")) {
        applyZoom(tabId, tab.url);
    }
});

// Apply zoom when switching tabs
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    let tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url && tab.url.includes("youtube.com")) {
        applyZoom(activeInfo.tabId, tab.url);
    }
});
