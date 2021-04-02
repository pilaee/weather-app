
  //show date

function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let date = currentDate.getDate();
  
  let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December" 
  ];
  let month = months[currentDate.getMonth()];
  let year = currentDate.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[currentDate.getDay()];

  return `${day}, ${date} ${month} ${year}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;

}


//change icons

let changeIcon = {
  "01d": "Images/sun.png",
  "01n": "Images/moon.png",
  "02d": "Images/few_clouds.png",
  "02n": "Images/moon_few_clouds.png",
  "03d": "Images/cloud.png",
  "03n": "Images/cloud.png",
  "04d": "Images/broken_clouds.png",
  "04n": "Images/broken_clouds.png",
  "09d": "Images/rain.png",
  "09n": "Images/rain.png",
  "10d": "Images/few_rain.png",
  "10n": "Images/few_rain.png", 
  "11d": "Images/thunder.png",
  "11n": "Images/thunder.png",
  "13d": "Images/snow.png",
  "13n": "Images/snow.png",
  "50d": "Images/mist.png",
  "50n": "Images/mist.png",
}


//show weather

function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let code = response.data.weather[0].icon;
  if (code === "11d" || code === "11n") {
      document.body.style.background =
    "linear-gradient(-15deg, #0d324d, #7f5a83)";
    iconElement.setAttribute("src", "Images/thunder.png");
  } else if (code === "10d" || code === "10n") {
      document.body.style.background =
    "linear-gradient(-15deg, #30cfd0, #330867)";
    iconElement.setAttribute("src", "Images/few_rain.png");
  } else if (code === "09d" || code === "09n") {
      document.body.style.background =
    "linear-gradient(-15deg, #1a3c58, #15016d)";
    iconElement.setAttribute("src", "Images/rain.png");
  } else if (code === "13d" || code === "13n") {
      document.body.style.background =
    "linear-gradient(-15deg, #67085f, #85d030";
    iconElement.setAttribute("src", "Images/snow.png");
  } else if (code === "50d"|| code === "50n") {
      document.body.style.background =
    "linear-gradient(-15deg, #bdc3c7, #2c3e50)";
    iconElement.setAttribute("src", "Images/mist.png");
  } else if (code === "01d") {
      document.body.style.background =
    "linear-gradient(-15deg,#f9d423, #ff4e50)";
    iconElement.setAttribute("src", "Images/sun.png");
  } else if (code === "01n") {
      document.body.style.background =
    "linear-gradient(-15deg, #1f4e6d, #032033)";
    iconElement.setAttribute("src", "Images/moon.png");
  } else if (code === "02d") {
      document.body.style.background =
    "linear-gradient(-15deg, #45B649, #DCE35B)";
    iconElement.setAttribute("src", "Images/few_clouds.png");
  } else if (code === "02n") {
      document.body.style.background =
    "linear-gradient(-15deg, #525522, #143615)";
    iconElement.setAttribute("src", "Images/moon_few_clouds.png");
  } else if (code === "03d" || code === "03n") {
      document.body.style.background =
    "linear-gradient(-15deg, #78ffd6, #007991)";
    iconElement.setAttribute("src", "Images/cloud.png");
  } else if (code === "04d" || code === "04n") {
        document.body.style.background =
    "linear-gradient(-15deg, #a4bfef, #3275d1)";
    iconElement.setAttribute("src", "Images/broken_clouds.png");
  }
  displayWeather(response);
}


//forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecast = null;
  forecastElement.innerHTML = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML +=
    `<div class="col">
      <p>
        ${formatHours(forecast.dt * 1000)}
      </p>
        <img src="${changeIcon[forecast.weather[0].icon]}" alt="icon"/>
          <div class="weather-forecast-temperature">
            <strong>${Math.round(forecast.main.temp)}°</strong>
           </div>
     </div>
    `;
  }
}


//city search

function search(city) {
  let units = "metric";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}


//city input

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Berlin");


//convert units

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahreinheitTemperature = (celsiusTemperature * 9 / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahreinheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
 
