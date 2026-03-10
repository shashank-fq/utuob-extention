# YouTube Enhancer Extension (v2.1)

A lightweight productivity-focused browser extension that improves the YouTube experience with **custom zoom controls, Shorts blocking, and Smart Study Mode**.

Built as a side project to make YouTube cleaner, more focused, and more customizable.
---

## Features

### ✅ Smart Zoom (User Controlled)

Choose zoom levels directly from the popup:

- **Home / Browsing Pages:** 100%, 80%, 75%, 60%
- **Watch Pages (/watch):** 125%, 110%, 100%, 80%

Zoom is applied automatically using Chrome’s official zoom API.
---

### ✅ Hide YouTube Shorts (Toggle)

- Removes Shorts shelves from the homepage
- Hides Shorts from the sidebar and tabs
- Can be turned ON/OFF anytime


### ✅ Auto Theater Mode

Automatically enables Theater Mode when watching videos (optional toggle).
---

### ✅ Hover Expand Description

When enabled:

- Hover over the description for **0.3 seconds**
- It expands automatically for easier reading

### ✅ Smart Study Mode (Focus Mode)

A distraction-free YouTube mode designed for learning:

- Hides recommendations
- Hides comments
- Keeps only the video + description visible
- Turns autoplay ON automatically if a playlist is active


### ✅ Keyboard Shortcuts

Quickly toggle features without opening the popup:

| Shortcut | Action |
|---------|--------|
| **Alt + O** | Toggle Shorts visibility |
| **Alt + S** | Toggle Smart Study Mode |

(Shortcuts can be changed in Chrome settings.)
---

## Installation

### Chrome / Edge / Brave

1. Download or clone this repository
2. Open:

   `chrome://extensions/`

3. Enable **Developer Mode** (top-right)
4. Click **Load unpacked**
5. Select the extension folder

The extension is now active on YouTube.
---

## Project Structure

youtube-enhancer/
│ manifest.json # Extension configuration
│ background.js # Zoom + keyboard shortcut handler
│ content.js # Shorts + Theater + Study Mode logic
│ styles.css # Shorts + Study Mode styling
│ popup.html # Popup UI
│ popup.js # Popup logic + saving settings
│ popup.css # Popup styling
│ icon16.png
│ icon48.png
│ icon128.png
│ README.md
---

## How It Works

### Smart Zoom
- Uses `chrome.tabs.setZoom()` from the background service worker  
- Applies different zoom for watch pages vs browsing pages

### Shorts Blocking
- Uses CSS selectors inside `.yt-hide-shorts`
- Toggleable via popup or shortcut

### Smart Study Mode
- Adds a `.yt-study-mode` class to the page
- Hides distractions like comments and recommendations

### SPA Support
YouTube is a Single Page App, so the extension detects URL changes and re-applies features automatically.
---

## Customization

You can extend this project easily:

- Add more zoom presets
- Add “Focus Preset” button
- Add quality control / playback speed defaults
- Add channel whitelist mode

## Troubleshooting

### Zoom not applying?
- Close and reopen YouTube tabs after reload
- Reset zoom overrides in:

  `chrome://settings/content/zoomLevels`

### Shorts still visible?
YouTube updates its UI frequently, selectors may need updates.
---

## Privacy

This extension:

- Runs only on `youtube.com`
- Stores settings locally using `chrome.storage.sync`
- Does NOT collect or transmit any user data
- Makes no external network requests

## License

Free to use, modify, and improve as a personal side project.
---

## Roadmap (Planned Improvements)

- Cleaner Study Mode layout (true minimal view)
- Preset profiles: Normal / Focus / Study
- Better popup UI design
- Chrome Web Store release
