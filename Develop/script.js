// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  // -----------------------------SAVE BUTTONS-----------------------------//
  // Use "for each" with "this" to determine which queried button has been clicked.//
  var saveButtons = $(".saveBtn")

  saveButtons.each(function () {
    $(this).on("click", function () {
      // Define variables for clicked "div ID" and "text content". Saves those values to local storage with the "div ID" (var = hourID) as the key and the "text content" (var = meetingText) as the saved value.//
      var hourID = ($(this).closest("div").attr("id"));
      var meetingText = ($(this).prev("textarea").val());
      localStorage.setItem(hourID, meetingText);
      load();
    })
  });

  // -----------------------------TIME LOGIC-----------------------------//
  // For loop to see if events are in the past, present, or future. Future expansion note: If the work day ever starts at a different time than 9, change the "userDefinedStart" variable below accordingly.//
  var userDefinedStart = 0;
  var hour12 = dayjs().format("hA");
  var hour24 = dayjs().format("H");
  for (var i = userDefinedStart; i < $(".hour").length + userDefinedStart; i++) {
    var hourNum = "#hour-" + i;
    // If the text in the left column of the calendar is equal to the time in a "hA" format, set class to present.//
    if (($(hourNum).children().eq(0).text()) === hour12) {
      $(hourNum).attr("class", "row time-block present")
      //  If the "i" value from the loop is less than the current hour, set the class to "past".//
    } else if (i < hour24) {
      $(hourNum).attr("class", "row time-block past")
      //  If the "i" value from the loop is greater than the current hour, set the class to "future".//
    } else {
      $(hourNum).attr("class", "row time-block future")
    }
  };

  // -----------------------------LOAD DATA-----------------------------//
  // Look through each key item in local storage and fill it in textarea.//
  function load() {
    for (var j = 0; j < $(".hour").length + userDefinedStart; j++) {
      var hourNum = "#hour-" + j;
      var key = "hour-" + j;
      $(hourNum).children().eq(1).val(localStorage.getItem(key));
    }
  };
  load();

  // -----------------------------DISPLAY HEADER DATE-----------------------------//
  // Sets the current time in the header of the page.//
  var currentDay = $("#currentDay");
  var today = dayjs().format("dddd, MMMM D");
  currentDay.text(today);
});