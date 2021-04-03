function formatDate(timestamp){
  let date= new Date(timetamp);
  let hours= date.getHours();
  if(hours<10){
    hours=`0${hours}`;
  }
let minutes=date.getMinutes();
if (minutes<10){
  minutes=`o${minutes}`;
}

let days=[
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

}
let day= days[date.getDay()];
return`${day}${hours}:${minutes}`;
{
function displayForecast(){
  let forecastElement=document.querySelector ("#forecast");
  let days=["Thu","Fri","Sat","Sun"];
  let forecastHTML = `<div class="row"`;
  day.forEach(function(day) {
    forecastHTML=
    forecastHTML +
    `<div class="col-2">
    <div class="weather-forcast-date">${day}</div>
    < img
    src="http://openweathermap.org/img/wn/50d@2x.png"
    alt=""
    width="42"
    />
    <div class="weather - forecast-temperatures">
    <span class="weather-forecast-temperature-max">18 </span>
    <span class="weather-forecast-temperature-min"> 12 </span>
    </div>
    <div>
    `;
  });

  forecastHTML = forecastHTML+`</div>`;
  forecastElement.innerHTML=forecastHTML;
  console.log(forecastHTML)
}

function displayTemperature(response){
  let temperatureElement= document.querySelector("# temperature");
  let cityElement=document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let windElement= document.querySelector("#wind");
  let dateElement =document.querySelector ("#date");
  let iconElement =document .querySelector ("#icon")

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML=Math.round(celsiusTemperature);
  cityElement.innerHTML=response.data.name;
  descriptionElement.innerHTML=response.data.weather[0].description;
  humidityElement.innerHTML=response.data.main.humidity;
  windElement.innerHTML= Math.round(response.data.win.speed);
  dateElement.innerHTML= formatDate(response.data.dt*1000);
  

  console.log(response.data.main.temp);
}



let apiKey = "78e84724dd24f5c8d15376301785551";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}&units=metric`;
`
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);  






 
