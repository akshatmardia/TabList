/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*********************************!*\
  !*** ./extension/background.ts ***!
  \*********************************/

// Create a runtime listener
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "getTabs") {
        // Promise-based API when available, falling back to callback
        try {
            chrome.tabs.query({})
                .then((tabs) => {
                sendResponse({ tabs });
            })
                .catch((error) => {
                console.error("Error querying tabs:", error);
                sendResponse({ tabs: [] });
            });
        }
        catch (e) {
            // Fallback if a browser does not support Promise API
            chrome.tabs.query({}, (tabs) => {
                sendResponse({ tabs });
            });
        }
        return true; // Keeping message channel open
    }
    if (msg.type === "switchToTab") {
        try {
            chrome.tabs.update(msg.tabId, { active: true });
            chrome.windows.update(msg.windowId, { focused: true });
        }
        catch (error) {
            console.error("Error switching tab:", error);
        }
        return false;
    }
});
console.log("Background script loaded");

/******/ })()
;
//# sourceMappingURL=background.js.map