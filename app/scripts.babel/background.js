'use strict';

function cdBooking(dateOfBooking) {
  dateOfBooking = new Date(dateOfBooking);
  var now = new Date();
  var millisTill10 = new Date(dateOfBooking.getFullYear(), dateOfBooking.getMonth(), dateOfBooking.getDate() - 2, 22, 0, 1, 0) - now;
  if (millisTill10 < 0) {
    millisTill10 = 2000;
  }
  chrome.alarms.create("myAlarm",{when: Date.now() + millisTill10});
}

function final() {

  var getInformationSettings = {
    "async": false,
    "crossDomain": true,
    "url": "https://login.liu.se/cas/login",
    "method": "GET"
  };
  $.ajax(getInformationSettings).always(function (output) {
    var loginTicket = $(output).find("input[name='lt']").val();
    var executionVal = $(output).find("input[name='execution']").val();
    chrome.storage.sync.get('savedData', function(data) {
      var loginSettings = {
        "async": false,
        "crossDomain": true,
        "url": "https://login.liu.se/cas/login",
        "method": "POST",
        "data": {
          "username": data.savedData.liuid,
          "password": decrypt(data.savedData.password, "dP32Ckcqow7e3Kkd").toString(CryptoJS.enc.Utf8),
          "lt": loginTicket,
          "execution": executionVal,
          "_eventId": "submit",
          "submit": "LOGGA IN"
        }
      };

      $.ajax(loginSettings).always(function (response) {
        $.ajax({
          "async": true,
          "crossDomain": true,
          "url": "https://se.timeedit.net/web/liu/db1/timeedit/sso/?ssoserver=liu_stud_cas&entry=wr_stud&back=https%3A%2F%2Fse.timeedit.net%2Fweb%2Fliu%2Fdb1%2Fwr_stud%2F",
          "method": "GET"
        }).always(function () {
        });
        setTimeout(function() {
          var getUserObjectSettings = {
            "async": false,
            "crossDomain": true,
            "url": "https://se.timeedit.net/web/liu/db1/wr_stud/objects.html?max=10&uo=t&fr=t&partajax=t&im=f&sid=4&l=sv_SE&objects=263992.195&types=184&subtypes=184&step=1&or=1",
            "method": "GET"
          };

          $.ajax(getUserObjectSettings).always(function (output) {
            var userObject = $(output).find("div[id='objectbasketitemX0']").prevObject["0"].attributes[1].nodeValue;
            var dates = data.savedData.date[0].replace(new RegExp("-", "g"), '');
            var starttime = data.savedData.fromTime;
            var endtime = data.savedData.toTime;
            var room = data.savedData.room;
            $.ajax({
              "async": false,
              "crossDomain": true,
              "url": "https://se.timeedit.net/web/liu/db1/wr_stud/objects.html?max=10&fr=t&partajax=t&im=f&sid=4&l=sv_SE&search_text=" + room.toString() + "&types=195&subtypes=230,231&dates=20170615&starttime=7%3A00&endtime=8%3A00&step=1&or=1",
              "method": "GET"
            }).always(function (output) {
              var roomObject = $(output).find("div[id='objectbasketitemX0']").prevObject["0"].attributes[1].nodeValue;
              var data = $.param({
                kind: "reserve",
                nocache: "4",
                l: "sv_SE",
                o: [roomObject, userObject],
                aos: "",
                dates: dates,
                starttime: starttime,
                endtime: endtime,
                url: "https://se.timeedit.net/web/liu/db1/wr_stud/ri1Q8.html#",
                fe7: ""
              }, true);
              var bookSettings = {
                "async": true,
                "crossDomain": true,
                "url": "https://se.timeedit.net/web/liu/db1/wr_stud/ri1Q8.html",
                "method": "POST",
                "headers": {
                  "origin": "https://se.timeedit.net",
                  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
                  "content-type": "application/x-www-form-urlencoded",
                  "accept": "text/html, */*; q=0.01",
                  "referer": "https://se.timeedit.net/web/liu/db1/wr_stud/ri1Q8.html",
                  "accept-encoding": "gzip, deflate, br",
                  "accept-language": "sv-SE,sv;q=0.8,en-US;q=0.6,en;q=0.4",
                  "x-cookiesok": "I explicitly accept all cookies",
                  "cache-control": "no-cache",
                },
                "data": data
              };

              $.ajax(bookSettings).always(function (response) {
                alert("STATUS OF BOOKING: +" +
                  response.responseText);
              });
            });
          });
        }, 1000);
      });
    });
  });



}

chrome.alarms.onAlarm.addListener(function(alarm){
  final();
  chrome.storage.sync.get('savedData', function(data) {
    data.savedData.date.shift();
    chrome.storage.sync.set({"savedData": data.savedData}, function () {
      if (data.savedData.date.length > 0) {
        cdBooking(data.savedData.date[0]);
      } else {
        chrome.storage.sync.clear();
      }
    })
  });
});

