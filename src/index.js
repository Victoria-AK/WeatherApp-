let now = new Date();

let h3 = document.querySelector("h3");
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  " Tuesday",
  " Wednesday",
  " Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[now.getDay()];

let dates = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31"
];
let date = dates[now.getDate()];

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];
let month = months[now.getMonth()];

h3.innerHTML = ` ${day} | ${date}/${month} | ${hours}:${minutes} `;

function showTemperature(response) {
  let cityElement = document.querySelector(".city");
  cityElement.innerHTML = response.data.name;
  let h4 = document.querySelector("h4");
  let temperatureRounded = Math.round(response.data.main.temp);
  h4.innerHTML = `${temperatureRounded} ºC`;
  let description = document.querySelector(".looksLike");
  let displayDesc = response.data.weather[0].description;
  description.innerHTML = `${displayDesc}`;
  let Humidity = document.querySelector(".percentage");
  let displayHumidity = response.data.main.humidity;
  Humidity.innerHTML = `${displayHumidity}`;
  let windSpeed = document.querySelector(".Mph");
  let displayWind = response.data.wind.speed;
  windSpeed.innerHTML = `${displayWind}`;
}

function searchCity(city) {
  let apiKey = "c18394fcc909e55826e68d90aa7686bb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
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
