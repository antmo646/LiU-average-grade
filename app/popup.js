document.addEventListener('DOMContentLoaded', function () {

  chrome.storage.sync.get('savedData', function(data) {
    if (data.savedData) {
      $("#upcomingBookings").append("<p style='color: green'>Upcoming bookings:</p>" +
        "<p>" + data.savedData.room + "</p>" +
        "<p>" + data.savedData.fromTime + " - " + data.savedData.toTime + "</p>" +
        "<p>" + data.savedData.date + "</p>");
    };

  });
  var bookingBtn = $("#setBookingBtn");

  bookingBtn.on('click', bookingBtnOnClick);
  var TodaysDate = new Date();
  $('#datePicker').multiDatesPicker({
    dateFormat: "yy-m-d",
    minDate: TodaysDate
  });

  $("#getBtn").on('click', function() {
/*    chrome.storage.sync.get("savedData", function(data) {
      alert(data.savedData.password);
    });*/
final();
  });

  chrome.storage.onChanged.addListener(function() {

    $("#upcomingBookings").empty();
    chrome.storage.sync.get('savedData', function(data) {
      console.log(data)
      if (data.savedData) {
        console.log(data.savedData.date)
        $("#upcomingBookings").append("<p style='color: green'>Upcoming bookings:</p>" +
          "<p>" + data.savedData.room + "</p>" +
          "<p>" + data.savedData.fromTime + " - " + data.savedData.toTime + "</p>" +
          "<p>" + data.savedData.date + "</p>");
      } else {
        $("#upcomingBookings").empty();
      }
    });
  });
});

function bookingBtnOnClick() {
  var liuid = $("#liuId").val();
  var password = encrypt($("#psw").val(), "dP32Ckcqow7e3Kkd");
  var room = $("#roonName").val();
  var dates = $('#datePicker').multiDatesPicker('getDates');
  var fromTime = $("#fromTime").val();
  var toTime = $("#toTime").val();
  if (!liuid || !password || !room || !fromTime || !toTime) {
    alert("Please fill the required fields.");
    return;
  }
  var savedData = {
    "liuid": liuid,
    "password": password,
    "room": room,
    "date": dates,
    "fromTime": fromTime,
    "toTime": toTime
  };
  //chrome.storage.sync.clear();
  chrome.storage.sync.set({"savedData": savedData}, function() {
    alert("information stored");
  });
  cdBooking();
}


