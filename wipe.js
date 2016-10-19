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

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.storage.sync.get({nums: 1, hosts: []}, function (options) {
    var newCss = css.replace(/{{nums}}/g, options.nums).replace(/{{display}}/g, 'table-cell');
    chrome.tabs.insertCSS(tab.id, {code: newCss});
  });
});

chrome.webNavigation.onCompleted.addListener(function (details) {
  chrome.storage.sync.get({nums: 1, hosts: []}, function (options) {
    if (matches(details.url, options.hosts)) {
      var newCss = css.replace(/{{nums}}/g, options.nums).replace(/{{display}}/g, 'none');
      chrome.tabs.insertCSS(details.tabId, {code: newCss});
    }
  });
});