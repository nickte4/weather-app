import "../styles/modern-normalize.css";
import "../styles/style.css";
// import component files here
import "../styles/components/weather.css";
import "../styles/utils.css";

/* const, global vars */
// weather codes suffix: '0' => day, '1' => night
let isDay = 0;
const LOCATION = "43219";
const UNITS = "imperial";
const API_KEY = "3ZWiuIKuEA1fS4w8g9704ILIuJEwtbpO";
const WEATHER_API_URL = `https://api.tomorrow.io/v4/weather/forecast?location=${LOCATION}&timesteps=1d&units=${UNITS}&apikey=${API_KEY}`;

/* change to night time */
function changeToNightMode() {
  document.body.style.background = "var(--clr-dark-purple)";
  document.querySelector(".weather__box").style.background =
    "var(--clr-purple)";
}

/* renders additional weather data onto document */
function renderMiscData(data) {
  /* extract data from json */
  let windSpeed = data.windSpeedAvg; // mph
  let precipitationChance = data.precipitationProbabilityAvg;
  let humidity = data.humidityAvg; // fahrenheit
  let UVindex = data.uvIndexAvg; // out of 10

  /* update textContent of misc data */
  document.getElementById("weather__wind").textContent =
    Math.round(windSpeed) + " mph";
  document.getElementById("weather__precipitation").textContent =
    Math.round(precipitationChance) + "%";
  document.getElementById("weather__humidity").textContent =
    Math.round(humidity) + "%";
  document.getElementById("weather__uvindex").textContent = UVindex + "/10";
}

/* render degrees onto document */
function renderDegrees(todayDegrees) {
  let degrees = document.getElementById("weather__degrees");
  degrees.textContent = Math.round(todayDegrees) + "°";
}

/* renders picture onto document */
function renderPicture(todayCode) {
  let srcLink = `/assets/icons/large/png/${todayCode}${isDay}_large.png`;
  let picture = document.getElementById("weather__picture");
  picture.src = srcLink;
}

/* api calls to tomorrow.io weather api */

async function getAndRenderWeatherData() {
  const response = await fetch(WEATHER_API_URL);
  const data = await response.json();
  const todayData = data.timelines.daily[0].values;

  renderPicture(todayData.weatherCodeMax);
  renderDegrees(todayData.temperatureAvg);
  renderMiscData(todayData);
}

/* loads the current time*/
function loadCurrTime() {
  const currDate = new Date();
  let suffix = "AM";
  let hour = currDate.getHours();
  if (hour == 12 || hour > 12) {
    if (hour > 12) {
      if (hour >= 20) {
        isDay = 1; // indicate that it is night;
        changeToNightMode();
      }
      hour = hour - 12;
    }
    suffix = "PM";
  }

  let min = currDate.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let time = document.getElementById("weather__time-amt");
  time.textContent = hour + ":" + min + " " + suffix;
}

function deployAll() {
  loadCurrTime();
  // refreshes time every 5 seconds
  setInterval(loadCurrTime, 5 * 1000);
  getAndRenderWeatherData(); // API CALL, disabled due to rate limiting
}

deployAll();
