// YouTube Enhancer - Human-style Userscript (Zoom: Home 75%, Watch 100%)

(function () {
    'use strict';

    // --- Remove Shorts shelves/sections (homepage only) ---
    function removeShorts() {
        const shelves = document.querySelectorAll(
            'ytd-rich-shelf-renderer, ytd-reel-shelf-renderer'
        );

        shelves.forEach(shelf => {
            const text = shelf.innerText || '';
            if (text.toLowerCase().includes('shorts')) {
                shelf.remove();
            }
        });
    }

    // --- Enable theater mode (only if not already active) ---
    function enableTheaterMode() {
        const watchFlexy = document.querySelector('ytd-watch-flexy');
        if (!watchFlexy) return;

        if (watchFlexy.hasAttribute('theater')) return;

        const button = document.querySelector('.ytp-size-button');
        if (button) button.click();
    }

    // --- Run enhancements depending on page ---
    function onPageChange() {

        if (location.pathname === '/') {
            removeShorts();
        }

        if (location.pathname === '/watch') {
            setTimeout(enableTheaterMode, 800);
        }
    }

    // --- Detect SPA navigation changes ---
    let lastUrl = location.href;

    new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            onPageChange();
        }
    }).observe(document.body, { childList: true, subtree: true });

    // --- Initial run ---
    window.addEventListener('load', () => {
        onPageChange();

        // Shorts sometimes load late
        setTimeout(removeShorts, 1500);
    });

})();
