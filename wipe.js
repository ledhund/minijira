chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'li.ghx-column:nth-last-child(3).forEach(function(el) {el.style.display = "none";})'
  });
});