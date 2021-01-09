var minWeek = -5;
var maxWeek = 5;

var lastScrollY;

function loadCalendar() {
  var table = document.getElementById("myCalendar");

  for (var i = -5; i <= 5; i++) {
    insertWeek(table, i);
  }
  document.getElementsByClassName("container")[0].scrollTop = vh(20) * 5 + 15;
}

function setScrollEventListener() {
  lastScrollY = scrollPos();

  document.getElementsByClassName("container")[0].onscroll = function(e) {
    var table = document.getElementById("myCalendar");
    
    var offset = document.getElementsByClassName("container")[0].offsetHeight;
    var maxHeight = document.getElementsByClassName("container")[0].scrollHeight - 80;

    if(lastScrollY < 10) {
      insertWeek(table, --minWeek, false);
    } else if (lastScrollY + offset > maxHeight) {
      insertWeek(table, ++maxWeek);
    }
    lastScrollY = scrollPos();
  }
}

function scrollToDate(date) {
  document.getElementsByClassName("container")[0].scrollTop = document.getElementById("day-" + date).parentElement.offsetTop - vh(20)
}



function init() {
  loadCalendar();
  setScrollEventListener();
}


/* Helpers */

function scrollPos() {
  return document.getElementsByClassName("container")[0].scrollTop;
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  return [d.getUTCFullYear(), weekNo];
}

function getRelativeDay(i) {
  var currentDate = new Date();
  return new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + i));
}

function insertWeek(table, relativeWeek, atEnd = true) {
  var rowIdx = table.rows.length;
  if(!atEnd) {
    rowIdx = 0;
  }
  var row = table.insertRow(rowIdx);

  for (var i = 0; i < 7; i++) {
    var cell = row.insertCell(i);
    var dayVal = i + (7 * relativeWeek) + 1;

    var day = getRelativeDay(dayVal);
    cell.innerHTML = "<span class='date' "+(dayVal == 6 ? "id='current'" : "id='day-" + day.getDate()+"/"+(day.getMonth()+1)+"/"+day.getFullYear())+"'>"+ formatDate(day) +"</span>";
    if(dayVal == 6) {
      console.log(cell.parentElement);
      cell.style.backgroundColor = "var(--secondary-color)";
    }
  }
}

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(d) {
  return (d.getDate() > 9 ? d.getDate() : "0" + d.getDate()) + ". " + months[d.getMonth()] + " " + (d.getFullYear() != new Date().getFullYear() ? d.getFullYear() : "");
}

function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

