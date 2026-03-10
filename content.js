// ===============================
// YouTube Enhancer - Content Script
// Handles:
// - Hide Shorts (toggleable)
// - Auto Theater Mode
// - Hover Expand Description
// - Smart Study Mode (Focus Mode)
// - Keyboard Shortcut Support
// - Popup Refresh Support
// ===============================

let shortsEnabled = true;
let studyEnabled = false;
//let hoverSetupDone = false;

// IMPORTANT: Prevent multiple intervals from being created
let enforceIntervalStarted = false;


/* ---------- Load Saved Settings ---------- */

async function getSettings() {
  return await chrome.storage.sync.get({
    hideShorts: true,
    autoTheater: true,
    //hoverExpand: false,
    studyMode: false
  });
}


/* ---------- Message + Shortcut Listener ---------- */

chrome.runtime.onMessage.addListener((msg) => {

  // Popup saved new settings → apply instantly
  if (msg.action === "refresh-settings") {
    applyFeatures();
  }

  // Shortcut: Toggle Shorts
  if (msg.action === "toggle-shorts") {
    shortsEnabled = !shortsEnabled;

    shortsEnabled ? enableShortsBlock() : disableShortsBlock();

    // Save new state
    chrome.storage.sync.set({ hideShorts: shortsEnabled });
  }

  // Shortcut: Toggle Study Mode
  if (msg.action === "toggle-study-mode") {
    studyEnabled = !studyEnabled;

    studyEnabled ? enableStudyMode() : disableStudyMode();

    // Save new state
    chrome.storage.sync.set({ studyMode: studyEnabled });
  }
});


/* ---------- Shorts Mode ---------- */

function enableShortsBlock() {
  document.body.classList.add("yt-hide-shorts");
}

function disableShortsBlock() {
  document.body.classList.remove("yt-hide-shorts");
}


/* ---------- Theater Mode ---------- */

function enableTheaterMode() {
  const watchFlexy = document.querySelector("ytd-watch-flexy");
  if (!watchFlexy) return;

  // Already active → do nothing
  if (watchFlexy.hasAttribute("theater")) return;

  const button = document.querySelector(".ytp-size-button");
  if (button) button.click();
}


/* ---------- Hover Expand Description ---------- *

function setupHoverExpand() {
  if (hoverSetupDone) return;
  hoverSetupDone = true;

  const desc = document.querySelector("#description");
  if (!desc) return;

  let expandTimer;
  let shrinkTimer;

  function expandDescription() {
    const moreBtn =
      document.querySelector("#description #expand") ||
      desc.querySelector("tp-yt-paper-button#expand");

    if (moreBtn) moreBtn.click();
  }

  function shrinkDescription() {
    const lessBtn =
      document.querySelector("#description #collapse") ||
      desc.querySelector("tp-yt-paper-button#collapse");

    if (lessBtn) lessBtn.click();
  }

  // Hover 0.3s → Expand
  desc.addEventListener("mouseenter", () => {
    clearTimeout(shrinkTimer);

    expandTimer = setTimeout(() => {
      expandDescription();
    }, 300);
  });

  // Leave 0.5s → Shrink
  desc.addEventListener("mouseleave", () => {
    clearTimeout(expandTimer);

    shrinkTimer = setTimeout(() => {
      shrinkDescription();
    }, 500);
  });
}*/


/* ---------- Smart Study Mode ---------- */

function enableStudyMode() {
  document.body.classList.add("yt-study-mode");

  // Autoplay ON if playlist is active
  const autoplayBtn = document.querySelector(".ytp-autonav-toggle-button");
  if (autoplayBtn && autoplayBtn.getAttribute("aria-checked") === "false") {
    autoplayBtn.click();
  }
}

function disableStudyMode() {
  document.body.classList.remove("yt-study-mode");
}


/* ---------- Continuous Enforcement ---------- */
/* YouTube keeps injecting Shorts + recommendations back */

function startEnforcementLoop() {
  if (enforceIntervalStarted) return;
  enforceIntervalStarted = true;

  setInterval(() => {
    if (shortsEnabled) enableShortsBlock();
    if (studyEnabled) enableStudyMode();
  }, 2000);
}


/* ---------- Apply All Features ---------- */

async function applyFeatures() {
  const settings = await getSettings();

  // Start enforcement only once
  startEnforcementLoop();

  // Apply Shorts setting
  shortsEnabled = settings.hideShorts;
  shortsEnabled ? enableShortsBlock() : disableShortsBlock();

  // Apply Study Mode setting
  studyEnabled = settings.studyMode;
  studyEnabled ? enableStudyMode() : disableStudyMode();

  // Watch-page-only features
  if (location.pathname === "/watch") {

    if (settings.autoTheater) {
      setTimeout(enableTheaterMode, 800);
    }

    // if (settings.hoverExpand) {
    //   setTimeout(setupHoverExpand, 1200);
    // }
  }
}


/* ---------- YouTube SPA Navigation Support ---------- */

let lastUrl = location.href;

new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;

    // Reset hover setup because description element changes
    //hoverSetupDone = false;

    // Apply features multiple times (YouTube loads in phases)
    applyFeatures();
    setTimeout(applyFeatures, 1200);
    setTimeout(applyFeatures, 2500);
  }
}).observe(document.body, { childList: true, subtree: true });


/* ---------- Initial Run ---------- */

applyFeatures();
