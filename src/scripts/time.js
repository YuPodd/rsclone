import ElementsCreator from './utils/elementsCreator';

const navbarName = document.querySelector("#navbar-panel");
const timeContainer = ElementsCreator.createElement('div', 'time-container', navbarName);
const timeDiv = ElementsCreator.createElement('div', 'time', timeContainer);
const dateDiv = ElementsCreator.createElement('div', 'date', timeContainer);

//variabes for time & data changes
const time = document.querySelector(".time");
const date = document.querySelector(".date");
let hour;

setInterval(showTimeAndDate, 1000);

export function showTimeAndDate() {
    showTime();
    showDate();
}

function showTime() {
    let displayTime = new Date(),
        hour = displayTime.getHours(),
        min = displayTime.getMinutes(),
        sec = displayTime.getSeconds();

    min = (min < 10) ? '0' + min : min;
    sec = (sec < 10) ? '0' + sec : sec;

    timeDiv.innerHTML = hour + ':' + min + ':' + sec;
}

function showDate() {
    let displayDate = new Date(),
        date = displayDate.getDate(),
        month = displayDate.getMonth(),
        year = displayDate.getFullYear(),
        weekDay = displayDate.getDay();
    switch (month) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    };
    switch (weekDay) {
        case 0:
            weekDay = "Sunday";
            break;
        case 1:
            weekDay = "Monday";
            break;
        case 2:
            weekDay = "Tuesday";
            break;
        case 3:
            weekDay = "Wednesday";
            break;
        case 4:
            weekDay = "Thursday";
            break;
        case 5:
            weekDay = "Friday";
            break;
        case 6:
            weekDay = "Saturday";
            break;
    };
    dateDiv.innerHTML = weekDay + ', ' + date + ' ' + month + ' ' + year;
}
