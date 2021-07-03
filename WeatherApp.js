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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey ="267c42e32a005ebd3d86d6022f9f9baf";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}& units=metric`;
console.log(apiURL);
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
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

getForecast(response.data.coord);
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
displayForecast();

 function displayForecast()  {
   let forecastElement = document.querySelector ("#forecast");
   let forecastHTML = `<div class="row predictions">`;
   let days = ["Sun",  "Mon",  "Tues",  "Weds",  "Thurs",  "Fri"];
   days.forEach(function(day) {
   forecastHTML = forecastHTML + `
   
        <div class="col-2">
          <div class ="weather forecast" id="forecast"></div>
          <div class="card days-weather1">
            <div class="card-body">
              <h5 class="card-title">${day}</h5>
              <h6 class="card-subtitle mb-2 text-muted">
                <i class="fas fa-cloud-rain emojis"></i>
              </h6>
              <img
                src="http://openweathermap.org/img/wn/50d@2x.png"
                alt=""
                width="36"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max"> 11°C </span>
                <span class="weather-forecast-temperature-min"> 5°C </span>
              </div>
            </div>
          </div>
          </div>
        
          `;
          });
          forecastHTML = forecastHTML + `</div>`;
          forecastElement.innerHTML = forecastHTML;
          console.log (forecastHTML);
 }