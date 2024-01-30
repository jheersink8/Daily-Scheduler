$(function () {
  // If the user ever wants to change the parameters of the scheduler outside 9-5 hours, they just need to change the values here. The rest of the code in the page will dynamically react to these two values and no other code needs to be changed. The start MUST be less than or equal to the end, and both values need to be between 0 (for 12:00AM) and 23 (for 11:00PM).//
  var userDefinedStart = 9;
  var userDefinedEnd = 17;

  // -----------------------------CREATE PAGE-----------------------------//
  //  This code will generate the display for the user based on the userDefinedStart and userDefinedEnd values above.//
  for (var i = userDefinedStart; i < userDefinedEnd + 1; i++) {
    var timeValues = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];
    $(".container-lg").append(
      $("<div>", { id: "hour-" + i, class: "row time-block" }).append(
        $("<div>", { class: "col-2 col-md-1 hour text-center py-3", text: timeValues[i] }),
        $("<textarea>", { class: "col-8 col-md-10 description", rows: "3" }),
        $("<button>", { class: "btn saveBtn col-2 col-md-1", "aria-label": "save" }).append(
          $("<i>", { class: "fas fa-save", "aria-hidden": "true" }))
      )
    )
  };

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
  var hour12 = dayjs().format("hA");
  var hour24 = dayjs().format("H");
  for (var i = userDefinedStart; i < userDefinedEnd + 1; i++) {
    var hourNum = "#hour-" + i;
    // If the text in the left column of the calendar is equal to the time in a "hA" format, set class to present.//
    if (($(hourNum).children().eq(0).text()) === hour12) {
      $(hourNum).attr("class", "row time-block present")
      //  If the "i" value from the loop is less than the current hour, set the class to "past". Also, past events cannot be edited.//
    } else if (i < hour24) {
      $(hourNum).attr("class", "row time-block past"),
      $(hourNum).children().eq(1).prop("readonly", true);
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