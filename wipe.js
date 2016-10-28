function matches(url, hostlist) {
  var parser = document.createElement('a');
  parser.href = url;
  return hostlist.indexOf(parser.hostname) !== -1;
}

var css = `
li.ghx-column:nth-last-child(-n+{{nums}}) {
   display: {{display}};
}
div.ghx-zone-overlay-column:nth-last-child(-n+{{nums}}) {
   display: {{display}};
}
`

function saveState(display) {
  chrome.storage.sync.set({display: display}, function () {});
}

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.storage.sync.get({nums: 1, hosts: [], display: 'table-cell'}, function (options) {
    var display = options.display === 'none' ? 'table-cell' : 'none';
    var newCss = css.replace(/{{nums}}/g, options.nums).replace(/{{display}}/g, display);
    chrome.tabs.insertCSS(tab.id, {code: newCss});
    saveState(display);
  });
});

chrome.webNavigation.onCompleted.addListener(function (details) {
  chrome.storage.sync.get({nums: 1, hosts: [], display: 'none'}, function (options) {
    if (matches(details.url, options.hosts)) {
      var newCss = css.replace(/{{nums}}/g, options.nums).replace(/{{display}}/g, options.display);
      chrome.tabs.insertCSS(details.tabId, {code: newCss});
    }
  });
});