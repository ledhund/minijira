function matches(url, hostlist) {
  var parser = document.createElement('a');
  parser.href = url;
  return hostlist.indexOf(parser.hostname) !== -1;
}

var css = 'li.ghx-column:nth-last-child(-n+{{nums}}) { display: none; }';

chrome.webNavigation.onCompleted.addListener(function (details) {
  chrome.storage.sync.get({nums: 1, hosts: []}, function (stored) {
   if (matches(details.url, stored.hosts)) {
      css = css.replace('{{nums}}', stored.nums);
      chrome.tabs.insertCSS(details.tabId, {code: css});
    }
  });
});