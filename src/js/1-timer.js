import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("button[data-start]");
const dataInput = document.querySelector("#datetime-picker");
const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMinutes = document.querySelector("span[data-minutes]");
const dataSeconds = document.querySelector("span[data-seconds]");

let userSelectedTime = 0;
let timeoutId = null;
startBtn.disabled = true;

// На промисах

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//     onClose(selectedDates) {
//         const pickedDate = selectedDates[0];
//         console.log(selectedDates[0]);
//         if (!pickedDate) {
//             return;
//         }
//         const pickedTime = pickedDate.getTime();
//         const now = Date.now();
//         if (pickedTime <= now) {
//             iziToast.show({
//                 message: "Please choose a date in the future",
//                 color: "red",
//                 position: "topRight",
//             });
//             startBtn.disabled = true;
//             userSelectedTime = 0;
//             return;
//         }
//         userSelectedTime = pickedTime;
//         startBtn.disabled = false;
//     },
// };

// flatpickr("#datetime-picker", options);

// function onStart() {
//     if (!userSelectedTime) {
//         return;
//     }
//     startBtn.disabled = true;
//     dataInput.disabled = true;
//     if (timeoutId !== null) {
//         clearTimeout(timeoutId);
//         timeoutId = null;
//     }
//     runCountdown(userSelectedTime)
//         .then(() => {
//             dataInput.disabled = false;
//             startBtn.disabled = true;
//             userSelectedTime = 0;
//         })
//         .catch((error) => {
//             console.error("Timer Error", error);
//             dataInput.disabled = false;
//             startBtn.disabled = true;
            
//         })
// };

// function runCountdown(targetTime) {
//     return new Promise((resolve, reject) => {
//         function next() {
//             try {
//                 const now = Date.now();
//                 const difference = targetTime - now;
//                 if (difference <= 0) {
//                     const zeroTime = convertMs(0);
//                     const formattedZero = formatTime(zeroTime);
//                     updateClock(formattedZero);
//                     timeoutId = null;
//                     resolve();
//                     return;
//                 };
//                 const timeObj = convertMs(difference);
//                 const formatted = formatTime(timeObj);
//                 updateClock(formatted);

//                 const reminder = difference % 1000;
//                 let delay;
//                 if (reminder > 0) {
//                     delay = reminder;
//                 } else {
//                     delay = 1000;
//                 }
//                 timeoutId = setTimeout(next, delay);
//             } catch (err) {
//                 reject(err);
//             }
//         }
//         next();
//     })
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function formatTime({ days, hours, minutes, seconds }) {
//   if (days < 10) {
//     days = '0' + days;
//   }
//   if (hours < 10) {
//     hours = '0' + hours;
//   }
//   if (minutes < 10) {
//     minutes = '0' + minutes;
//   }
//   if (seconds < 10) {
//     seconds = '0' + seconds;
//   }

//   return { days, hours, minutes, seconds };
// }

// function updateClock({ days, hours, minutes, seconds }) {
//   dataDays.textContent    = days;
//   dataHours.textContent   = hours;
//   dataMinutes.textContent = minutes;
//   dataSeconds.textContent = seconds;
// }

// startBtn.addEventListener('click', onStart);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const pickedDate = selectedDates[0];
        console.log(selectedDates[0]);
        if (!pickedDate) {
            return;
        }
        const pickedTime = pickedDate.getTime();
        const now = Date.now();
        if (pickedTime <= now) {
            iziToast.show({
                message: "Please choose a date in the future",
                color: "red",
                position: "topRight",
            });
            startBtn.disabled = true;
            userSelectedTime = 0;
            return;
        }
        userSelectedTime = pickedTime;
        startBtn.disabled = false;
    },
};

flatpickr("#datetime-picker", options);

function onStart() { 
    if (!userSelectedTime) {
        return;
    }
    startBtn.disabled = true;
    dataInput.disabled = true;
    if (timeoutId !== null) { 
        clearInterval(timeoutId);
    };
    timeoutId = setInterval(() => {
        const now = Date.now();
        const difference = userSelectedTime - now;
        if (difference <= 0) {
            clearInterval(timeoutId);
            timeoutId = null;
            updateClock(formatTime(convertMs(0)));
            startBtn.disabled = true;
            dataInput.disabled = false;
            userSelectedTime = 0;
            return;
        };
        const timeObj = convertMs(difference);
        const formatted = formatTime(timeObj);
        updateClock(formatted);
    }, 1000);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatTime({ days, hours, minutes, seconds }) {
  if (days < 10) {
    days = '0' + days;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return { days, hours, minutes, seconds };
}

function updateClock({ days, hours, minutes, seconds }) {
  dataDays.textContent    = days;
  dataHours.textContent   = hours;
  dataMinutes.textContent = minutes;
  dataSeconds.textContent = seconds;
}

startBtn.addEventListener('click', onStart);