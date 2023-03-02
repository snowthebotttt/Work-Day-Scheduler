var currentDayEl = $("#currentDay");
// Display current day and hour @ top of page
$(document).ready(function () {
  var time = dayjs().format("ddd. MMMM D, hA");
  currentDayEl.text(time);
});

//Get the current hour in 24hr format
var currentHour = dayjs().hour();

// Loop through each time block
$(".time-block").each(function () {
  // Get the hour from the id of the time block
  var hour = parseInt($(this).attr("id").split("-")[1]);

  // Compare the hour to the current hour
  if (hour < currentHour) {
    $(this).removeClass("present").removeClass("future").addClass("past");
  } else if (hour === currentHour) {
    $(this).removeClass("past").removeClass("future").addClass("present");
  } else {
    $(this).removeClass("present").removeClass("present").addClass("future");
  }
});

// on save button click it retrieves the text entered into the sibling element with the class of description it then saves this to local storage

$(".saveBtn").on("click", function () {
  var description = $(this).siblings(".description").val();
  var hour = $(this).parent().attr("id");
  localStorage.setItem(hour, description);
});

// This line retrieves the value saved in local storage using the ID as the key if there is a stored value it will display even if the page is refreshed or closed.

$(".time-block").each(function () {
  var hour = $(this).attr("id");
  var description = localStorage.getItem(hour);
  if (description !== null) {
    $(this).find(".description").val(description);
  }
});
