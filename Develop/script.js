console.log($("#hour-11").text());
console.log($("#hour-11").children().text());


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
  // -----------------------------SAVE BUTTON-----------------------------//
  var saveButtons = $(".saveBtn")
  saveButtons.each(function (event) {
    $(this).on("click", function () {
      console.log(this.previousSibling);

      // console.log("Works!" + (event + 1));
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

