let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let records = [];

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    display.textContent = formatTime(elapsedTime);
}

function storeRecord(type, time) {
    records.push({ type, time });
    console.log(records);
}

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
        storeRecord('Start', formatTime(elapsedTime));
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
        storeRecord('Pause', formatTime(elapsedTime));
    }
});

document.getElementById('resume').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
        storeRecord('Resume', formatTime(elapsedTime));
    }
});

document.getElementById('stop').addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
        storeRecord('Stop', formatTime(elapsedTime));
    }
});

document.getElementById('reset').addEventListener('click', () => {
    isRunning = false;
    clearInterval(intervalId);
    elapsedTime = 0;
    display.textContent = '00:00:00.000';
    lapsContainer.innerHTML = '';
    storeRecord('Reset', '00:00:00.000');
});

document.getElementById('lap').addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('p');
        lapElement.textContent = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
        storeRecord('Lap', lapTime);
    }
});