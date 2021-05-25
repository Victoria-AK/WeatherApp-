
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



function showTemperature(response) {
    
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = response.data.name;
  let h3=document.querySelector("h3");
  h3.innerHTML=`Last Updated |`;
  let h4 = document.querySelector("h4");
  let temperatureRounded = Math.round(response.data.main.temp);
  h4.innerHTML = `${temperatureRounded} `;
  let description = document.querySelector(".looksLike");
  let displayDesc = response.data.weather[0].description;
  description.innerHTML = `${displayDesc}`;
  let Humidity = document.querySelector(".percentage");
  let displayHumidity = response.data.main.humidity;
  Humidity.innerHTML = `${displayHumidity}`;
  let windSpeed = document.querySelector(".Km-h");
  let displayWind = response.data.wind.speed;
  windSpeed.innerHTML = `${displayWind}`;

  let dateElement=document.querySelector(".lastUpdated");
  dateElement.innerHTML= formatDate(response.data.dt * 1000);
  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

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

let button = document.querySelector("#current-btn");
button.addEventListener("click", getCurrentPosition);
