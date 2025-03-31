/* global browser */

browser.runtime.onMessage.addListener((data, sender) => {
    let text = "";
    let tabId = sender.tab.id;
  
    if (data.hasLocalStorageData) {
      text += "L";
    }
    browser.browserAction.setBadgeText({ tabId, text });
    browser.browserAction.enable(tabId);
  });
  
  browser.browserAction.disable();