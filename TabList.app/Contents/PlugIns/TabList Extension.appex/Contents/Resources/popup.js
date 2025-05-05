/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!****************************!*\
  !*** ./extension/popup.ts ***!
  \****************************/

document.addEventListener('DOMContentLoaded', () => {
    const tabList = document.getElementById("tabs");
    if (!tabList) {
        console.error("Tab list element not found");
        return;
    }
    // Loading indicator
    tabList.innerHTML = '<div class="loading">Loading tabs...</div>';
    // Get tabs
    chrome.runtime.sendMessage({ type: "getTabs" }, (response) => {
        if (chrome.runtime.lastError) {
            tabList.innerHTML = '<div class="error">Error: ' + chrome.runtime.lastError.message + '</div>';
            return;
        }
        // Clear indicator
        tabList.innerHTML = '';
        if (!response || !response.tabs || response.tabs.length === 0) {
            tabList.innerHTML = '<div class="empty">No tabs found</div>';
            return;
        }
        // Remove numbers from the beginning of URL
        const cleanTitleForSorting = (title) => {
            if (!title)
                return "Untitled";
            const cleanedTitle = title.replace(/^\(\d+\)\s*/, '');
            return cleanedTitle.trim();
        };
        // Sort tabs alphabetically
        const sortedTabs = [...response.tabs].sort((a, b) => {
            const titleA = cleanTitleForSorting(a.title).toLowerCase();
            const titleB = cleanTitleForSorting(b.title).toLowerCase();
            return titleA.localeCompare(titleB);
        });
        // Create title bar with tab count
        const titleBar = document.createElement("div");
        titleBar.className = "title-bar";
        titleBar.innerHTML = `<span>${sortedTabs.length} Tabs (Sorted A-Z)</span>`;
        tabList.appendChild(titleBar);
        // Display tabs
        sortedTabs.forEach((tab) => {
            const div = document.createElement("div");
            div.className = "tab";
            // Create title element
            const title = document.createElement("div");
            title.className = "tab-title";
            // Display title
            const displayTitle = cleanTitleForSorting(tab.title) || "Untitled";
            title.textContent = displayTitle;
            div.appendChild(title);
            // Create a URL element
            const url = document.createElement("div");
            url.className = "tab-url";
            url.textContent = tab.url || "";
            div.appendChild(url);
            div.addEventListener("click", () => {
                chrome.runtime.sendMessage({
                    type: "switchToTab",
                    tabId: tab.id,
                    windowId: tab.windowId
                });
                window.close(); // Close popup after selection imp!!!
            });
            tabList.appendChild(div);
        });
    });
});

/******/ })()
;
//# sourceMappingURL=popup.js.map