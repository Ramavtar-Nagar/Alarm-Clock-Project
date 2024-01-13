// accessing different divs according to the requirement

// Accessing set alarm button
const setAlarmButton = document.getElementById("setAlarm");

// Accessing time div
var timeDiv = document.querySelector('.time');

// Accessing alarms-list
const alarmsList = document.getElementById("alarms-list");

// An array for storing different alarm objects
const alarms = [
    {hours: 3, minutes: 36, seconds: 0, ampm: 'PM'},
    {hours: 9, minutes: 49, seconds: 30, ampm: 'PM'},
    {hours: 6, minutes: 13, seconds: 25, ampm: 'AM'}
];


function updateTime() {
  
    // Accessing new date object and assigning it to a variable called currentTime
    const currentTime = new Date();

    // Using different methods ( getHours, getMinutes etc. ) on currentTime variable to get current hour, minutes, and seconds
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    let amPm = 'AM';
    // Adjusting the hour accordingly for PM
    if (hours >= 12) {
        amPm = 'PM';
        if (hours > 12) {
            hours = (hours - 12).toString().padStart(2, '0');
        }
    } else if (hours === 0) {
        hours = 12;
    } else {
        hours = hours.toString().padStart(2, '0');
    }

    // Formating the time as HH:MM:SS AM/PM
    const timeString = `${hours}:${minutes}:${seconds} ${amPm}`;
    timeDiv.textContent = timeString;


    //  Check if the current time matches any alarm

    // Convert hours to 12-hour format for comparison
    let currentHours12 = hours % 12;
    currentHours12 = currentHours12 === 0 ? 12 : currentHours12; // Handle the case for noon (12 PM) and also set12 for midnight


    // Convert hours, minutes, seconds to strings for comparison
    const currentHoursStr = hours.toString().padStart(2, '0');
    const currentMinutesStr = minutes.toString().padStart(2, '0');
    const currentSecondsStr = seconds.toString().padStart(2, '0');

    alarms.forEach(alarm => {
        const alarmHoursStr = alarm.hours.toString().padStart(2, '0');
        const alarmMinutesStr = alarm.minutes.toString().padStart(2, '0');
        const alarmSecondsStr = alarm.seconds.toString().padStart(2, '0');

        if (
            (currentHoursStr === alarmHoursStr || parseInt(currentHoursStr) === alarm.hours) &&
            currentMinutesStr === alarmMinutesStr &&
            currentSecondsStr === alarmSecondsStr &&
            amPm.toLowerCase() === alarm.ampm.toLowerCase()
        ) {
            alert(`Alarm matched for ${alarm.hours}:${alarm.minutes}:${alarm.seconds} ${alarm.ampm}`);
        }
    });

}


// Adding click addEventListener on set alarm button
setAlarmButton.addEventListener('click',  () => {
    
    // Getting user input for hours, minutes, seconds and AM/PM
    const alarmHours = parseInt(document.getElementById('alarmHours').value, 10);
    const alarmMinutes = parseInt(document.getElementById('alarmMinutes').value, 10);
    const alarmSeconds = parseInt(document.getElementById('alarmSeconds').value, 10);
    const ampm = document.getElementById('ampm').value;

    // Validating input values 
    if (isNaN(alarmHours) || alarmHours < 1 || alarmHours > 12 ||
        isNaN(alarmMinutes) || alarmMinutes < 0 || alarmMinutes > 59 ||
        isNaN(alarmSeconds) || alarmSeconds < 0 || alarmSeconds > 59) {
        alert('Invalid Input. Please enter valid time values.');
        return;
    }

    // Creating an alarm object
    const alarm = {
        hours: alarmHours,
        // minutes: alarmMinutes.toString().padStart(2, '0'), // Ensure two-digit format
        seconds: alarmSeconds.toString().padStart(2, '0'), // Ensure two-digit format
        ampm: ampm
    };
    

    // Adding the alarm to the alarms array
    alarms.push(alarm);

    // Clear input fields
    document.getElementById('alarmHours').value = '';
    document.getElementById('alarmMinutes').value = '';
    document.getElementById('alarmSeconds').value = '';

    // Update the alarms list
    displayAlarms();

});


// Function to display all alarms of the list
function displayAlarms() {

    // Clearing the list
    alarmsList.innerHTML = '';

    // Looping through the alarms array and creating list items for each alarm
    alarms.forEach((alarm, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${alarm.hours}:${String(alarm.minutes).padStart(2, '0')}:${String(alarm.seconds).padStart(2, '0')} ${alarm.ampm}`;

    // Adding a delete button for each alarm
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.float = 'right';
    deleteButton.style.backgroundColor = 'peachpuff';
    deleteButton.style.border = '0px';
    deleteButton.addEventListener('click', () => {
        // Removing the alarm from the array when the delete button is clicked
        alarms.splice(index, 1);
        // Updating the alarms list
        displayAlarms();
    });
    listItem.appendChild(deleteButton);
    alarmsList.appendChild(listItem);

});

}

// Updating time at every second
setInterval(updateTime, 1000);

// Calling the displayAlarms function initially to display any existing alarms
displayAlarms();