function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours <10) {
  hours=`0${hours}`;
}
let minutes=date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;

}
function search(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-City");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = inputCity.value;
  searchCity(inputCity.value);
}
let button = document.querySelector(".searchBarForm");
button.addEventListener("submit", search);
function changeToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}
function changeToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeToCelcius);
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", changeToFarenheit);
function searchCity(city) {
  let apiKey = "267c42e32a005ebd3d86d6022f9f9baf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp);
  let h2 = document.querySelector("#current-date-time");
h2.innerHTML = formatDate(response.data.dt *1000);

 let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

}
function currentPosition(position) {
  let apiKey = "267c42e32a005ebd3d86d6022f9f9baf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getPosition);
searchCity("London");

 