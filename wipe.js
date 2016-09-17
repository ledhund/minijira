chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'chrome.storage.sync.get("nums", function(stored) { document.querySelectorAll("li.ghx-column:nth-last-child(-n+"+ stored.nums +")").forEach(function(el) {el.style.display = "none";});});'
  });
});