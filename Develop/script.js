



// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  
// For loop to see if events are in the past, present, or future.//
  for (var i = 0; i < $(".hour").length; i++) {
    var hour12 = dayjs().format("hA");
    var hourNum = "#hour-" + i;
    var dayStart = dayjs().startOf("D").unix();
    var hourStart = dayjs().startOf("h").unix();
// If the text in the left column of the calendar is equal to the time in a "hA" format, set class to present.//
    if ($(hourNum + " .hour").text() === hour12) {
      $(hourNum).attr("class", "row time-block present")
    }
// Check if the hour value for the hour block times 60 (minutes) added to the start of the day is less than the start of the current hour.//
    if ((60 * i + dayStart) < hourStart) {
      $(hourNum).attr("class", "row time-block past")
    }
// Same as the previous check but looking for a greater than value.//
    if ((60 * i + dayStart) > hourStart) {
      $(hourNum).attr("class", "row time-block future")
    }
  };



  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

// Sets the current time in the header of the page.//
  var currentDay = $("#currentDay");
  var today = dayjs().format("dddd, MMMM D");
  currentDay.text(today);
});

