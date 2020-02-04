var reqs = [];

chrome.webRequest.onCompleted.addListener(
  function (details) {
    var l = reqs.length;
    if(l > 1000){
      reqs = reqs.splice(l-100, l);
    }
    reqs.push(details);
    chrome.browserAction.setBadgeText({text: String(reqs.length)});
    /*
    chrome.tabs.query({
      active: true,
      windowId: chrome.windows.WINDOW_ID_CURRENT
    }, function (result) {
      var currentTab = result.shift();
      chrome.tabs.sendMessage(currentTab.id, details, function() {});
    });
    */
  },
  {urls: ['<all_urls>']},
  ["responseHeaders"]
);
