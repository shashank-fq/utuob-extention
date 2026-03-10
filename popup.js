async function loadSettings() {
  const settings = await chrome.storage.sync.get({
    homeZoom: 80,
    watchZoom: 100,
    hideShorts: true,
    autoTheater: true,
    //hoverExpand: false,
    studyMode: false
  });

  homeZoom.value = settings.homeZoom;
  watchZoom.value = settings.watchZoom;

  hideShorts.checked = settings.hideShorts;
  autoTheater.checked = settings.autoTheater;
  //hoverExpand.checked = settings.hoverExpand;
  studyMode.checked = settings.studyMode;
}

async function saveSettings() {
  await chrome.storage.sync.set({
    homeZoom: Number(homeZoom.value),
    watchZoom: Number(watchZoom.value),

    hideShorts: hideShorts.checked,
    autoTheater: autoTheater.checked,
    //hoverExpand: hoverExpand.checked,
    studyMode: studyMode.checked
  });

  // Tell the current YouTube tab to refresh features instantly
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "refresh-settings" });
  });

  window.close();
}


saveBtn.addEventListener("click", saveSettings);

loadSettings();
