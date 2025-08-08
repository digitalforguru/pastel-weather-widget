const weatherWidget = document.getElementById("weatherWidget");
const weatherIcon = document.getElementById("weatherIcon");
const locationElement = document.getElementById("locationName");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const themeSelector = document.getElementById("themeSelector");
const cityInput = document.getElementById("cityInput");

// Cute cloud gif as placeholder icon
const cloudIconURL = "https://i.pinimg.com/originals/e3/9d/e9/e39de96ddbf852ed53a4e9a993550641.gif";

// Your OpenWeatherMap API key here
const apiKey = "8b38a4d3d6920110547bdaef3d73c0ba";

function getWeather(city) {
  if (!city) return;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      weatherIcon.src = cloudIconURL;
      weatherIcon.alt = data.weather[0].description;

      locationElement.textContent = data.name.toLowerCase();
      temperatureElement.textContent = `${Math.round(data.main.temp)}°F`;
      descriptionElement.textContent = data.weather[0].description;
    })
    .catch(() => {
      weatherIcon.src = "";
      weatherIcon.alt = "";
      locationElement.textContent = "Unable to fetch weather";
      temperatureElement.textContent = "";
      descriptionElement.textContent = "";
    });
}

// Change theme on selection
themeSelector.addEventListener("change", () => {
  weatherWidget.className = "widget " + themeSelector.value;
});

// When city input changes, save and fetch weather
cityInput.addEventListener("change", () => {
  const city = cityInput.value.trim();
  if (city) {
    localStorage.setItem("userCity", city);
    getWeather(city);
  }
});

// On load: load saved city or default to LA
window.addEventListener("DOMContentLoaded", () => {
  const savedCity = localStorage.getItem("userCity");
  if (savedCity) {
    cityInput.value = savedCity;
    getWeather(savedCity);
  } else {
    getWeather("Los Angeles");
  }
});
