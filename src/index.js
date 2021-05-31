
function searchCity(city) {
  let apiKey = "c18394fcc909e55826e68d90aa7686bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}



function formatDate(timestamp){
    let date=new Date(timestamp);
     let hours=date.getHours();
    if(hours < 10){
    hours=`0${hours}`;
    }
     let minutes=date.getMinutes();
    if (minutes< 10){
    minutes=`0${minutes}`;
   
}
   
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[date.getDay()];
return  `${day} | ${hours}:${minutes}`;
}

function showForecast(){
let forecastElement=document.querySelector("#weather-forecast");
let days=["Fri","Sat","Sun","Mon", "Tue", "Wed","Thu"];
let forecastHTML=`<div class="row">`;

days.forEach(function(day){
  forecastHTML= forecastHTML + 
  `<div class="col">
        <div class="weather-forecast-date">${day}</div>
        
        <img src="http://openweathermap.org/img/wn/10d@2x.png"

        width="42"/>
        <div class="weather-forecsr-temperature">
        <span class="weather-forecast-temperature-max">
        18 </span>
        <span class="weather-forecast-temperature-min">
        12 </span>
        </div>
    </div>`;

});


forecastHTML= forecastHTML + `</div>`;
forecastElement.innerHTML=forecastHTML;

}

function getForecast(coordinates){
 console.log(coordinates);
 let apiKey=`c18394fcc909e55826e68d90aa7686bb`;
 let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
 console.log(apiUrl);
}

function showTemperature(response) {
    
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = response.data.name;
  let h3=document.querySelector("h3");
  h3.innerHTML=`Last Updated |`;
  let h4 = document.querySelector("h4");
  let temperatureRounded = Math.round(response.data.main.temp);
  h4.innerHTML = `${temperatureRounded}`;
  let description = document.querySelector(".looksLike");
  let displayDesc = response.data.weather[0].description;
  description.innerHTML = `${displayDesc}`;
  let Humidity = document.querySelector(".humidity-percentage");
  let displayHumidity = response.data.main.humidity;
  Humidity.innerHTML = `${displayHumidity}`;
  let windSpeed = document.querySelector(".Km-h");
  let displayWind = response.data.wind.speed;
  windSpeed.innerHTML = `${displayWind}`;

  let dateElement=document.querySelector(".lastUpdated");
  dateElement.innerHTML= formatDate(response.data.dt * 1000);
  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
  celciusTemp=response.data.main.temp;

  getForecast(response.data.coord);
}



function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-bar");
  let cityElement = document.querySelector(".city");
  if (cityInput.value) {
    cityElement.innerHTML = `${cityInput.value}`;
    searchCity(cityInput.value);
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayPosition(position) {
  let apiKey = "c18394fcc909e55826e68d90aa7686bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(displayPosition);
}


function showFarenheitTemp(event){
event.preventDefault();
celciusLink.classList.add("active");
farenheitLink.classList.remove("active");
let farenheitTemp=( celciusTemp * 9) / 5 + 32;
let temperatureRounded=document.querySelector("h4");
temperatureRounded.innerHTML= Math.round(farenheitTemp);

}

function showCelciusTemp(event){
  event.preventDefault();
   let celciusTemperature=document.querySelector("h4");
   celciusTemperature.innerHTML= Math.round(celciusTemp);


}


showForecast(); 

let celciusTemp=null;
let button = document.querySelector("#current-btn");
button.addEventListener("click", getCurrentPosition);

let farenheitLink=document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celciusLink=document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemp);

