'use strict';

function cdBooking() {
  var now = new Date();
  var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 22, 0, 1, 0) - now;
  if (millisTill10 < 0) {
    millisTill10 += 86400000;
  }
    chrome.alarms.create("myAlarm",{when: Date.now() + millisTill10});
  }

  function final() {
    var settings1 = {
      "async": true,
      "crossDomain": true,
      "url": "https://login.liu.se/cas/login;jsessionid=2F27653A3B725A8C26FA44E179BEBC65?service=https%3A%2F%2Fse.timeedit.net%2Fweb%2Fliu%2Fdb1%2Ftimeedit%2FssoResponse",
      "method": "POST",
      "headers": {
        "origin": "https://login.liu.se",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        "content-type": "application/x-www-form-urlencoded",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "referer": "https://login.liu.se/cas/login?service=https%3A%2F%2Fse.timeedit.net%2Fweb%2Fliu%2Fdb1%2Ftimeedit%2FssoResponse",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "sv-SE,sv;q=0.8,en-US;q=0.6,en;q=0.4",
        "cookie": "JSESSIONID=2F27653A3B725A8C26FA44E179BEBC65; _ga=GA1.3.1473169914.1496948424; _gid=GA1.3.1501027755.1496948424; _dc_gtm_UA-2538626-1=1",
        "x-cookiesok": "I explicitly accept all cookies",
        "cache-control": "no-cache",
        "postman-token": "1a5dafd5-2de3-9aa1-2e02-93c6ca7f9943"
      },
      "data": {}
    };

    $.ajax(settings1).done(function (response) {
      console.log(response);
    });
  }

  chrome.alarms.onAlarm.addListener(function(alarm){
    alert("TEST")
  });
