# YouTube Enhancer Extension

A browser extension that enhances your YouTube experience with the following features:

## Features

1. **Removes YouTube Shorts** - Hides all Shorts from the homepage and sidebar
2. **Auto Theater Mode** - Automatically enables theater mode when watching videos
3. **1080p Default Quality** - Sets video quality to 1080p by default (or highest available)
4. **4-Column Video Layout** - Shows 4 videos per row on the homepage for better browsing (responsive on smaller screens)
5. **Smart Zoom** - 80% zoom on homepage for more content visibility, 100% zoom on video pages for optimal viewing

## Installation

### Chrome/Edge/Brave

1. Download all the extension files to a folder on your computer
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the folder containing the extension files
6. The extension is now active!

### Firefox

1. Download all the extension files to a folder on your computer
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on"
4. Navigate to the folder and select the `manifest.json` file
5. The extension is now active!

Note: In Firefox, temporary extensions are removed when you close the browser. For permanent installation, you would need to package and sign the extension.

## Files Included

- `manifest.json` - Extension configuration
- `content.js` - Main functionality script
- `styles.css` - CSS to hide Shorts elements
- `README.md` - This file
- Icon files (optional - you can add your own or the extension will work without them)

## How It Works

- **Shorts Removal**: Uses CSS and JavaScript to hide Shorts shelves and continuously monitors the page for new Shorts content
- **Theater Mode**: Automatically clicks the theater mode button when a video loads
- **Quality Setting**: Attempts to set video quality through YouTube's player controls
- **4-Column Layout**: Uses CSS Grid to display 4 videos per row on the homepage (automatically adjusts to 3, 2, or 1 column on smaller screens)
- **Smart Zoom**: Detects page type and applies 80% zoom on homepage/feeds for better overview, and 100% zoom on video pages to prevent player issues

## Customization

You can modify the extension behavior by editing the files:

- **Change number of columns**: Edit `styles.css` - change `repeat(4, 1fr)` to `repeat(5, 1fr)` for 5 columns, `repeat(3, 1fr)` for 3 columns, etc.
- **Change zoom levels**: Edit `content.js` - in the `setZoomByPage()` function, change `'80%'` for homepage or `'100%'` for video pages to your preferred values
- **Change default quality**: Edit `content.js` - look for `'1080'` and change to `'720'`, `'1440'`, `'2160'` (4K), etc.
- **Disable specific features**: Comment out the relevant function calls in `content.js`

## Troubleshooting

- **Theater mode not working**: YouTube's interface can change. The extension may need updates to match new selectors
- **Quality not setting**: Some videos may not have 1080p available. The extension will try to select the highest quality available
- **Shorts still appearing**: YouTube's structure changes frequently. Clear your browser cache and reload the extension

## Privacy

This extension:
- Only runs on youtube.com
- Does not collect any data
- Does not make external network requests
- All processing happens locally in your browser

## License

Free to use and modify as needed.
