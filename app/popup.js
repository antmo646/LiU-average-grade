document.addEventListener('DOMContentLoaded', function () {

  chrome.storage.sync.get('savedData', function(data) {
    if (data.savedData) {
      $("#upcomingBookings").append("<p style='color: green'>Upcoming bookings:</p>" +
        "<p>" + data.savedData.room + "</p>" +
        "<p>" + data.savedData.fromTime + " - " + data.savedData.toTime + "</p>" +
        "<p>" + data.savedData.date + "</p>" +
        "<button type='button' id='getBtn'>Delete All Upcoming Booking</button>");

      $("#getBtn").on('click', function() {
        chrome.storage.sync.clear(function(data) {
          alert("All stored data has been cleared.");
        });
      });
    };

  });
  var bookingBtn = $("#setBookingBtn");

  bookingBtn.on('click', bookingBtnOnClick);
  var TodaysDate = new Date();
  $('#datePicker').multiDatesPicker({
    dateFormat: "yy-mm-dd",
    minDate: TodaysDate
  });


  chrome.storage.onChanged.addListener(function() {

    $("#upcomingBookings").empty();
    chrome.storage.sync.get('savedData', function(data) {
      if (data.savedData) {
        $("#upcomingBookings").append("<p style='color: green'>Upcoming bookings:</p>" +
          "<p>" + data.savedData.room + "</p>" +
          "<p>" + data.savedData.fromTime + " - " + data.savedData.toTime + "</p>" +
          "<p>" + data.savedData.date + "</p>" +
          "<button type='button' id='getBtn'>Delete All Upcoming Booking</button>");
        $("#getBtn").on('click', function() {
          chrome.storage.sync.clear(function(data) {
            alert("All stored data has been cleared.");
          });
        });
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
  chrome.storage.sync.set({"savedData": savedData}, function() {
    alert("information stored");
  });
  cdBooking(savedData.date[0]);
}


