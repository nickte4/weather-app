import "../styles/modern-normalize.css";
import "../styles/style.css";
// import component files here
import "../styles/components/weather.css";
import "../styles/utils.css";

function loadCurrTime() {
  const currDate = new Date();
  let suffix = "AM";
  let hour = currDate.getHours();
  if (hour > 12) {
    hour = hour - 12;
    suffix = "PM";
  }
  let min = currDate.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let time = document.getElementById("weather__time-amt");
  time.textContent = hour + ":" + min + " " + suffix;
}

loadCurrTime();
// refreshes time every 5 seconds
setInterval(loadCurrTime, 5 * 1000);
