chrome.browserAction.onClicked.addListener(function () {
   var css = 'li.ghx-column:nth-last-child(-n+{{nums}}) { display: none; }';
   chrome.storage.sync.get('nums', function (stored) {
      css = css.replace('{{nums}}', stored.nums);
      chrome.tabs.insertCSS(null, {code: css});
   });
});