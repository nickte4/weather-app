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
const WEATHER_API_URL = `https://api.tomorrow.io/v4/weather/forecast?location=${LOCATION}&timesteps=1d&units=${UNITS}&apikey=3ZWiuIKuEA1fS4w8g9704ILIuJEwtbpO`;

/* renders picture onto document */
function renderPicture(weatherCode) {
  let srcLink = `/assets/icons/large/png/${weatherCode}${isDay}_large.png`;
  let picture = document.getElementById("weather__picture");
  picture.src = srcLink;
}

/* api calls to tomorrow.io weather api */

async function getWeatherData() {
  const response = await fetch(WEATHER_API_URL);
  const data = await response.json();
  console.log(data);
  // grabs the weather code of the current day (goes up to next four days)
  console.log(data.timelines.daily[0].values.weatherCodeMax);
  renderPicture(data.timelines.daily[0].values.weatherCodeMax);
}

/* loads the current time*/
function loadCurrTime() {
  const currDate = new Date();
  let suffix = "AM";
  let hour = currDate.getHours();
  if (hour > 12) {
    if (hour >= 20) {
      isDay = 1; // indicate that it is night;
    }
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

function deployAll() {
  loadCurrTime();
  // refreshes time every 5 seconds
  setInterval(loadCurrTime, 5 * 1000);
  getWeatherData();
}

deployAll();
