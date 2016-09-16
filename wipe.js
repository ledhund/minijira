chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'document.querySelectorAll(\'li.ghx-column[data-column-id="4190"],li.ghx-column[data-id="4190"],li.ghx-column[data-column-id="3523"],li.ghx-column[data-id="3523"],li.ghx-column[data-column-id="3507"],li.ghx-column[data-id="3507"]\').forEach(function(el) {el.style.display = "none";})'
  });
});
