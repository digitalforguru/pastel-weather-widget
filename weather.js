// Elements
const weatherWidget = document.getElementById("weatherWidget");
const weatherIcon = document.getElementById("weatherIcon");
const locationElement = document.getElementById("locationName");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const themeSelector = document.getElementById("themeSelector");

// Your pretty Pinterest cloud PNG
const cloudIconURL = "https://i.pinimg.com/originals/e3/9d/e9/e39de96ddbf852ed53a4e9a993550641.gif";

// Weather API setup
const apiKey = "8b38a4d3d6920110547bdaef3d73c0ba"; // Replace with your OpenWeatherMap API key

function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Fetch in Fahrenheit
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Always use the pretty cloud PNG
          weatherIcon.src = cloudIconURL;
          weatherIcon.alt = data.weather[0].description;

          // Lowercase city name
          locationElement.textContent = data.name.toLowerCase();

          // Fahrenheit temperature
          temperatureElement.textContent = `${Math.round(data.main.temp)}°F`;

          descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
          console.error("Error fetching weather:", error);
          descriptionElement.textContent = "Unable to fetch weather";
        });
    }, () => {
      descriptionElement.textContent = "Location access denied";
    });
  } else {
    descriptionElement.textContent = "Geolocation not supported";
  }
}

// Change theme color
themeSelector.addEventListener("change", () => {
  const selectedTheme = themeSelector.value;
  weatherWidget.className = `widget ${selectedTheme}`;
});

// Load weather on start
getWeather();
