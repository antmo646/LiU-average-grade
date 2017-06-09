'use strict';

window.addEventListener("load", function() {
  var app = angular.module('LiU Booking', []);

  window.autoBook =  function() {
    $(".eo264493").click();
  };

  var html = document.querySelector('html');
  html.setAttribute('ng-app', '');
  html.setAttribute('ng-csp', '');

  var date = document.getElementById('leftresdate');
  date.setAttribute('value', '2017-06-10');
  document.getElementById("timeHourSpec3").checked = true;
  document.getElementsByClassName("spectime")[0].classList.remove("inputoff");
  document.getElementsByClassName("spectime")[1].classList.remove("inputoff");
  $(".timeHourStart3").val('8');
  $(".timeHourEnd3").val('16');
  setTimeout(function() {
    $("#ui-multiselect-ff195x_26-option-1").attr('checked', 'checked');
    $("#ui-multiselect-ff195x_26-option-5").attr('checked', 'checked');
    $("#ui-multiselect-ff195x_26-option-6").attr('checked', 'checked');
    $("#ui-multiselect-ff195x_26-option-30").attr('checked', 'checked');

    $(".objectinputsearchbutton").click();
    var myButton = document.createElement('button');
    myButton.setAttribute('content', 'test content');
    myButton.setAttribute('class', 'btn mySpecialButton');
    myButton.setAttribute('onclick', '');
    $(document).on("click", '.mySpecialButton', function(){
      $(".resnext").click();
      $(".resobjectsearch")[0].click();
      setTimeout(function () {
        // $('[data-id="263995.195"]')[0].click();
        // $("#leftresdatepresent").val('2017-06-10');
        // $(".timeHourStart").val('10');
        // $(".timeHourEnd").val('14');
        // $("#continueRes2").click();

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://se.timeedit.net/web/liu/db1/wr_stud/ri1Q8.html",
          "method": "POST",
          "headers": {
            "origin": "https://se.timeedit.net",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            "content-type": "application/x-www-form-urlencoded",
            "accept": "text/html, */*; q=0.01",
            "x-devtools-emulate-network-conditions-client-id": "135d8ec4-a33f-4c18-a32b-49f0bdaa021f",
            "x-requested-with": "XMLHttpRequest",
            "x-devtools-request-id": "6552.939",
            "referer": "https://se.timeedit.net/web/liu/db1/wr_stud/ri1Q8.html",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "sv-SE,sv;q=0.8,en-US;q=0.6,en;q=0.4",
            "cookie": "sso-parameters=ssoserver=liu_stud_cas&entry=wr_stud&back=https%3A%2F%2Fse.timeedit.net%2Fweb%2Fliu%2Fdb1%2Fwr_stud%2Fri1Q8.html&ssoserver=liu_stud_cas&entry=wr_stud; TEwebliudb1=7c8a279833ef413b82a754cdebf3ca18-2289397227167266476",
            "x-cookiesok": "I explicitly accept all cookies",
            "cache-control": "no-cache",
            "postman-token": "fea7eac1-2195-4a4f-7e08-6e84dc57e99e"
          },
          "data": "kind=reserve&nocache=4&l=sv_SE&o=263995.195&o=373241.184&aos=&dates=20170610&starttime=13%3A00&endtime=14%3A00&url=https%3A%2F%2Fse.timeedit.net%2Fweb%2Fliu%2Fdb1%2Fwr_stud%2Fri1Q8.html&fe7="
        }

        $.ajax(settings).done(function (response) {
          console.log(response);
        });
      }, 200);
    });
    myButton.innerHTML = 'Boka AG32';
    document.getElementsByClassName("searchAdvancedFields")[2].appendChild(myButton);
  }, 3000);




//angular.bootstrap(html, ['LiU Booking'], []);
});
