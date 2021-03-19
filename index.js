// Update current time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

let today = document.querySelector("p#date");
today.innerHTML = `<i class="far fa-calendar-alt"></i> ${day}   <i class="far fa-clock"></i>   ${hour}:${minute}`;

// Search City Update Weather
function showWeatherCity(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("h1.temperature");
  tempToday.innerHTML = `${currentTemp} °C`;

  let descrWeather = response.data.weather[0].description;
  let descrToday = document.querySelector("p#descrToday");
  descrToday.innerHTML = `${descrWeather}`;
}

function updateCityTemp(event) {
  event.preventDefault();
  let formInput = document.querySelector("#city-input");
  let cityName = document.querySelector("h1#city");
  cityName.innerHTML = `${formInput.value}`;

  let apiKey = "78e84724dd24f5c8d15376301785551c";
  let city = formInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCity);
}

let form = document.querySelector("form");
form.addEventListener("submit", updateCityTemp);

let buttonCity = document.querySelector("button#change-city");
buttonCity.addEventListener("click", updateCityTemp);

//Search Current Logation Weather
function showWeatherPosition(response) {
  let currentPosition = response.data.name;
  currentPosition.toUpperCase();
  console.log(response.data);
  let cityName = document.querySelector("h1#city");
  cityName.innerHTML = `${currentPosition}`;

  let currentTemp = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("h1.temperature");
  tempToday.innerHTML = `${currentTemp} °C`;

  let descrWeather = response.data.weather[0].description;
  console.log(descrWeather);
  let descrToday = document.querySelector("p#descrToday");
  descrToday.innerHTML = `${descrWeather}`;
}

function retrievePosition(position) {
  let apiKey = "78e84724dd24f5c8d15376301785551c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherPosition);
}

function updateLocationTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let buttonLocation = document.querySelector("button#currentLocation");
buttonLocation.addEventListener("click", "updateLocationTe");