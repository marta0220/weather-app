let apiWeatherKey = "d873f8799b310a5282754959e9912176";
let units = "metric";
let now = new Date();
let dateNow = document.querySelector("#date-today");
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
let searchingForm = document.querySelector("#searching-form");
let submitForm = document.querySelector("#submit-form");
let geolocationButton = document.querySelector("#geolocation-button");
let city = document.querySelector("#current-city");
let temperatureToday = document.querySelector("#celsius-temperature-today");
let fahrenheitSign = document.querySelector("#fahrenheit-sign");
let celsiusSign = document.querySelector("#celsius-sign");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");
let description = document.querySelector("#description");
let visibility = document.querySelector("#visibility");
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
  event.preventDefault();
  let city = submitForm.value;
  searchCity(city);
}
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiWeatherKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {
  console.log(response.data.visibility);
  city.innerHTML = response.data.name;
  temperatureToday.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  visibility.innerHTML = response.data.visibility / 1000;
  description.innerHTML = response.data.weather[0].main;
}
geolocationButton.addEventListener("click", useGeolocation);
searchingForm.addEventListener("submit", handleCity);
dateNow.innerHTML = `${day}, ${hours}:${minutes}`;
searchCity("Kyiv");
