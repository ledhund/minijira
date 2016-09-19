var selector = 'li.ghx-column:nth-last-child(-n+{{nums}})';
chrome.storage.sync.get('nums', function (stored) {
   document.querySelectorAll(selector.replace('{{nums}}', stored.nums)).forEach(function (el) {
      el.style.display = "none";
   });
});