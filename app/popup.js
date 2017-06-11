document.addEventListener('DOMContentLoaded', function () {
  //var bookingBtn = $("#setBookingBtn");
  var bookingBtn = document.getElementById("setBookingBtn");
  bookingBtn.addEventListener('click', bookingBtnOnClick);
  $('#datePicker').multiDatesPicker({
    dateFormat: "yy-m-d"
  });

  $("#getBtn").on('click', function() {
    chrome.storage.sync.get('liuid', function(data) {
      alert(data.liuid);
    });
  });
});

function bookingBtnOnClick() {
  var liuid = $("#liuId").val();
  var password = $("#psw").val();
  var room = $("#roonName").val();
  var dates = $('#datePicker').multiDatesPicker('getDates');
  var fromTime = $("#fromTime").val();
  var toTime = $("#toTime").val();
  console.log(dates);
  if (!liuid || !password || !room || !fromTime || !toTime) {
    alert("Please fill the required fields.");
    return;
  }
  chrome.storage.sync.set({
    "liuid": liuid,
    "password": password,
    "room": room,
    "date": dates[0],
    "fromTime": fromTime,
    "toTime": toTime
  }, function() {
    alert("information stored");
  });
  cdBooking();
}

