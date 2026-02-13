// Cross-browser compatibility
const browserAPI = typeof browser !== "undefined" ? browser : chrome;

// Listen for extension installation
browserAPI.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.log("Extension installed successfully!");
    // Set default values
    browserAPI.storage.local.set({
      installDate: new Date().toISOString(),
      clickCount: 0,
    });
  } else if (details.reason === "update") {
    console.log("Extension updated!");
  }
});

// Listen for messages from popup or content scripts
browserAPI.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);

  if (message.action === "getData") {
    // Retrieve data from storage
    browserAPI.storage.local.get(["clickCount", "lastAction"]).then((data) => {
      sendResponse({ success: true, data: data });
    });
    return true; // Keep channel open for async response
  }

  if (message.action === "incrementCount") {
    // Increment click counter
    browserAPI.storage.local.get(["clickCount"]).then((data) => {
      const newCount = (data.clickCount || 0) + 1;
      browserAPI.storage.local.set({ clickCount: newCount });
      sendResponse({ success: true, count: newCount });
    });
    return true;
  }
});

// Example: Listen for tab updates
browserAPI.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log("Tab loaded:", tab.url);
  }
});

console.log("Background script loaded!");
