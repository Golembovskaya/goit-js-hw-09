import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
const btnStart = document.querySelector('button[data-start]');
let inputEl = document.querySelector('#datetime-picker');
let timerId = null;
let selectedDate = Date.now();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.setAttribute('disabled', true);
    } else {
      btnStart.removeAttribute('disabled', '');
    }
  },
};
btnStart.addEventListener('click', () => {
    btnStart.setAttribute('disabled', '');
    inputEl.setAttribute('disabled', '');
    timerId = setInterval(timeOut, 1000);
});
function timeOut() {
    const getTimeComponent = selectedDate - new Date();
    if (getTimeComponent <= 0) {
        Notiflix.Notify.success('Timer is Over!');
        clearInterval(timerId);
        return;
    };
    const { days, hours, minutes, seconds } = convertMs(getTimeComponent);
    document.querySelector('span[data-days]').textContent = pad(days);
    document.querySelector('span[data-hours]').textContent = pad(hours);;
    document.querySelector('span[data-minutes]').textContent = pad(minutes);;
    document.querySelector('span[data-seconds]').textContent = pad(seconds);;
};
function pad(value) {
    return String(value).padStart(2, 0);
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('input#datetime-picker', options);