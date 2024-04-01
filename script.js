let timer;
let time = 25 * 60; // Initial focus time in seconds
let breakTime = 5 * 60; // Initial break time in seconds
let isFocusTimer = true;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const visualTimer = document.getElementById('visual-timer');
const timerCircle = document.getElementById('timer-circle');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const focusTimeInput = document.getElementById('focus-time');
const breakTimeInput = document.getElementById('break-time');

const alarmSound = new Audio('alarm.wav');

function startTimer() {
    isRunning = true;
    timer = setInterval(updateTimer, 1000);
    startButton.disabled = true;
}

function stopTimer() {
    isRunning = false;
    clearInterval(timer);
    startButton.disabled = false;
}

function resetTimer() {
    stopTimer();
    time = parseInt(focusTimeInput.value) * 60;
    breakTime = parseInt(breakTimeInput.value) * 60;
    isFocusTimer = true;
    updateTimerDisplay();
    updateVisualTimer(1);
}

function updateTimer() {
    if (time > 0) {
        time--;
        updateTimerDisplay();
        updateVisualTimer(time / (isFocusTimer ? (parseInt(focusTimeInput.value) * 60) : (parseInt(breakTimeInput.value) * 60)));
    } else {
        clearInterval(timer);
        if (isRunning) {
            alarmSound.play();
            if (isFocusTimer) {
                alert('Focus time is up! Take a break.');
                time = breakTime;
                isFocusTimer = false;
                updateTimerDisplay();
                startTimer();
            } else {
                alert('Break time is up! Start focus time.');
                time = parseInt(focusTimeInput.value) * 60;
                isFocusTimer = true;
                updateTimerDisplay();
                startButton.disabled = false;
            }
        }
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateVisualTimer(progress) {
    const circumference = timerCircle.getTotalLength();
    timerCircle.style.strokeDasharray = circumference;
    timerCircle.style.strokeDashoffset = circumference * (1 - progress);
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

updateTimerDisplay();
updateVisualTimer(1);
