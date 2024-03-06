// DOM Elements
let defaultTime = document.getElementById("defaultTime");
let sixtyMinuteTime = document.getElementById("sixtyMinuteTime");
let ninetyMinuteTime = document.getElementById("ninetyMinuteTime");

let focusButton = document.getElementById("focusButton");
let shortBreakButton = document.getElementById("shortBreak");
let longBreakButton = document.getElementById("longBreak");

let time = document.getElementById("time");
let startButton = document.getElementById("startButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");

let background = document.getElementById('background');

let buttons = document.querySelectorAll(".options");

// Timer Variables
let set;
let count = 24 * 60;
let paused = true;
let selectedTime = 24;

// Event Listeners for Time Selection Buttons
defaultTime.addEventListener('click', () => {
    displayTime(24);
    buttonClickSound();
});

sixtyMinuteTime.addEventListener('click', () => {
    displayTime(59);
    buttonClickSound();
});

ninetyMinuteTime.addEventListener('click', () => {
    displayTime(89);
    buttonClickSound();
});

// Function to Display Time
function displayTime(minutes) {
    count = (minutes + 1) * 60;
    updateTimeDisplay();
    selectedTime = minutes;
}

// Function to Update Time Display
function updateTimeDisplay() {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    time.textContent = `${showWithZero(minutes)}:${showWithZero(seconds)}`;
}

// Utility Function to Add Leading Zeros
function showWithZero(value) {
    return value < 10 ? `0${value}` : value;
}

// Event Listeners for Focus, Short Break, and Long Break Buttons
focusButton.addEventListener('click', () => {
    removeFocus();
    focusButton.classList.add('focus');
    pauseTimer();
    displayTime(24);
    showTimeOptions();
    buttonClickSound();
    background.style.backgroundColor = "var(--red)";
});

shortBreakButton.addEventListener('click', () => {
    removeFocus();
    shortBreakButton.classList.add("focus");
    pauseTimer();
    displayTime(4);
    hideTimeOptions();
    buttonClickSound();
    background.style.backgroundColor = "var(--relax1)";
});

longBreakButton.addEventListener('click', () => {
    removeFocus();
    longBreakButton.classList.add("focus");
    pauseTimer();
    displayTime(14);
    hideTimeOptions();
    buttonClickSound();
    background.style.backgroundColor = "var(--relax2)";
});

// Function to Remove Focus from Buttons
function removeFocus() {
    buttons.forEach((button) => {
        button.classList.remove("focus");
    });
}

// Functions to Show and Hide Time Options
function showTimeOptions() {
    let minuteOptions = document.getElementById("minuteOptions");
    minuteOptions.style.display = "flex";
}

function hideTimeOptions() {
    let minuteOptions = document.getElementById("minuteOptions");
    minuteOptions.style.display = "none";
}

// Event Listeners for Start, Pause, and Reset Buttons
startButton.addEventListener('click', () => {
    startTimer();
    buttonClickSound();
});

pauseButton.addEventListener('click', () => {
    pauseTimer();
    buttonClickSound();
});

resetButton.addEventListener('click', () => {
    pauseTimer();
    displayTime(selectedTime);
    buttonClickSound();
});

// Function to Start Timer
function startTimer() {
    if (paused) {
        paused = false;
        set = setInterval(updateTimer, 1000);
        startButton.classList.add("hide");
        pauseButton.classList.add("show");
        resetButton.classList.add("show");
        hideTimeOptions();
    }
}

// Function to Update Timer
function updateTimer() {
    count--;
    clockSound();
    if (count <= 0) {
        pauseTimer();
        playAlarmSound();
        vibrateDevice();
        displayTime(selectedTime);
        return;
    }
    updateTimeDisplay();
}

// Function to Pause Timer
function pauseTimer() {
    paused = true;
    clearInterval(set);
    startButton.classList.remove("hide");
    pauseButton.classList.remove("show");
    resetButton.classList.remove("show");
}

// Function to Play Alarm Sound
function playAlarmSound() {
    let alarmSound = document.getElementById("alarmSound");
    alarmSound.play();
}

function buttonClickSound(){
    let buttonClick = document.getElementById("buttonClick");
    buttonClick.play();
}

function clockSound(){
    let clock = document.getElementById("clock");
    clock.play();
}

// Function to Vibrate Device
function vibrateDevice() {
    if (navigator.vibrate) {
        navigator.vibrate(3000);
    } else {
        console.log("Vibration API is not supported");
    }
}

// Initialization Function
function start() {
    displayTime(24);
    showTimeOptions();
    pauseTimer();
}
start();