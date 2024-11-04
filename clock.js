let is24HourFormat = true;
let isDarkTheme = false;
let stopwatchInterval;
let stopwatchTime = 0;
let timerInterval;
let timerRemainingTime = 0;
let alarmTime = null;
let alarmTimeout;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');

    if (!is24HourFormat) {
        hours = hours % 12 || 12;
        document.getElementById('toggle-format').innerText = 'Alternar para 24h';
    } else {
        document.getElementById('toggle-format').innerText = 'Alternar para 12h';
    }

    hours = String(hours).padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;
    
    const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const day = daysOfWeek[now.getDay()];
    const date = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    document.getElementById('date').innerText = `${day}, ${date}/${month}/${year}`;
}

document.getElementById('toggle-format').addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    updateClock();
});

function startStopwatch() {
    if (!stopwatchInterval) {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            let hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
            let minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
            let seconds = String(stopwatchTime % 60).padStart(2, '0');
            document.getElementById('stopwatch').innerText = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    }
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    stopwatchTime = 0;
    document.getElementById('stopwatch').innerText = '00:00:00';
}

function startTimer() {
    let minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    let seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
    timerRemainingTime = minutes * 60 + seconds;

    if (timerRemainingTime > 0 && !timerInterval) {
        timerInterval = setInterval(() => {
            if (timerRemainingTime > 0) {
                timerRemainingTime--;
                let displayMinutes = String(Math.floor(timerRemainingTime / 60)).padStart(2, '0');
                let displaySeconds = String(timerRemainingTime % 60).padStart(2, '0');
                document.getElementById('timer-display').innerText = `${displayMinutes}:${displaySeconds}`;
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert("Tempo esgotado!");
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRemainingTime = 0;
    document.getElementById('timer-display').innerText = '00:00';
    document.getElementById('timer-minutes').value = '';
    document.getElementById('timer-seconds').value = '';
}

function setAlarm() {
    alarmTime = document.getElementById('alarm-time').value;
    if (alarmTime) {
        const [hours, minutes] = alarmTime.split(':');
        const now = new Date();
        const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        const timeToAlarm = alarmDate.getTime() - now.getTime();
        if (timeToAlarm > 0) {
            alarmTimeout = setTimeout(() => {
                alert("Alarme!");
                alarmTimeout = null;
            }, timeToAlarm);
            document.getElementById('alarm-status').innerText = `Alarme definido para ${alarmTime}`;
        } else {
            alert("Defina um horário no futuro");
        }
    } else {
        alert("Insira um horário válido para o alarme");
    }
}

function updateTimeZoneClock() {
    const timezoneOffset = parseInt(document.getElementById('timezone-select').value) || 0;
    const now = new Date();
    now.setHours(now.getUTCHours() + timezoneOffset);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('timezone-clock').innerText = `${hours}:${minutes}:${seconds}`;
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme');
    document.querySelector('.clock-container').classList.toggle('dark-theme');
}

setInterval(updateClock, 1000);
setInterval(updateTimeZoneClock, 1000);
updateClock();
updateTimeZoneClock();
