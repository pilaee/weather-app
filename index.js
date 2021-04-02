const apiKey ="78e84724dd24f5c8d15376301785551";
const apiUrlWeather = "https://api.openweathermap.org/data/2.5/weather?";
const apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?";
const units = "metric";


function formatDate(){
    let now = new Date();

    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];
    let currentDay = days[now.getDay()];

    let months = ["January",
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
    "December",
    ];
    let month = months[now.getMonth()];
    let date = now.getDate();
    let year = now.getFullYear();
    let hour = now.getHours();
    if (hour < 10){
        hour = `0${hour}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }

    let dateTimeElement= document.querySelector("#date");
    dateTimeElement.innerHTML= `${currentDay}, ${month} ${date}, ${year} | ${hour}:${minutes}`;
}
formatDate();

function formatDays(timestamp) {
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
  return `${day}`;
}

function formatHours (timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10){
        hours= `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes= `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function showWeather(response){
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement= document.querySelector("#sky");
    let maxElement = document.querySelector("#max-temp");
    let minElement = document.querySelector("#min-temp");
    let feelsElement = document.querySelector("#feels-like");
    let windElement = document.querySelector("#wind");
    let humidityElement = document.querySelector("#humidity");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    cityElement.innerHTML= response.data.name;
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    descriptionElement.innerHTML= response.data.weather[0].main;
    maxElement.innerHTML = Math.round(response.data.main.temp_max);
    minElement.innerHTML = Math.round(response.data.main.temp_min);
    feelsElement.innerHTML=Math.round(response.data.main.feels_like);
    windElement.innerHTML= response.data.wind.speed;
    humidityElement.innerHTML=response.data.main.humidity;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    let latitude = response.data.coord.lon;
    let longitude = response.data.coord.lat;
    //forecastDaily(latitude, longitude);
}


//function forecastDaily(latitude, longitude){
    //let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
    //axios.get(apiUrl).then(showForecast);
//}

function showForecast(response){
    let forecastElement = document.querySelector("#hour-forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0 ; index < 6; index++){
        forecast = response.data.list[index];

        forecastElement.innerHTML += `
           <div class="col-2">
           <h3>
            ${formatHours(forecast.dt* 1000)}
            </h3>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="clear" id="icon-2" />
            <div class="maxmin"> 
            <strong>
            ${Math.round(forecast.main.temp_max)}º
            </strong> |
            ${Math.round(forecast.main.temp_min)}º
            </div>
            </div>`;
    }
}

function displayCityWeather(city){
    let apiWeatherstring = `${apiUrlWeather}q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiWeatherstring).then(showWeather);

    let apiForecastString = `${apiUrlForecast}q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiForecastString).then(showForecast);
}

function searchCity(event){
    event.preventDefault();
    let cityInput = document.querySelector("#search-city");
    displayCityWeather(cityInput.value);    
}

function displayFahrenheitTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiustemp.classList.remove("active");
    fahrenheittemp.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiustemp.classList.add("active");
    fahrenheittemp.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let celsiusTemperature = null;

let fahrenheittemp= document.querySelector("#Fahrenheit");
fahrenheittemp.addEventListener("click", displayFahrenheitTemperature);

let celsiustemp= document.querySelector("#Celsius");
celsiustemp.addEventListener("click", displayCelsiusTemperature);

displayCityWeather("Berlin");

 
