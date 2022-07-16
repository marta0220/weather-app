let apiWeatherKey = "d873f8799b310a5282754959e9912176";
let units = "metric";
let searchingForm = document.querySelector("#searching-form");
let geolocationButton = document.querySelector("#geolocation-button");

function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  return `${day}, ${hours}:${minutes}`;
}
function useGeolocation(event) {
  navigator.geolocation.getCurrentPosition(findPosition);
}
function findPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiWeatherKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function handleCity(event) {
  let submitForm = document.querySelector("#submit-form");
  event.preventDefault();
  let city = submitForm.value;
  searchCity(city);
}
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temperatureToday = document.querySelector("#celsius-temperature-today");
  let weatherIconToday = document.querySelector("#weather-icon-today");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let description = document.querySelector("#description");
  let visibility = document.querySelector("#visibility");
  let dateNow = document.querySelector("#date-today");
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;
  temperatureToday.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  visibility.innerHTML = response.data.visibility / 1000;
  description.innerHTML = response.data.weather[0].main;
  dateNow.innerHTML = formatDate(response.data.dt * 1000);
  weatherIconToday.setAttribute(
    "src",
    `img/${response.data.weather[0].icon}.png`
  );
  weatherIconToday.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiWeatherKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index !== 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-3"><img src=img/${
          forecastDay.weather[0].icon
        }.png width="35px" /></div>
          <div class="col-3 weekDays">${formatDay(forecastDay.dt)}</div>
          <div class="col-6 forecast-temperature">${Math.round(
            forecastDay.temp.max
          )}°<span class = min-temperature>/${Math.round(
          forecastDay.temp.min
        )}° </span></div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

geolocationButton.addEventListener("click", useGeolocation);
searchingForm.addEventListener("submit", handleCity);

searchCity("Kyiv");
