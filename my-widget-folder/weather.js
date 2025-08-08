const weatherWidget = document.getElementById("weatherWidget");
const weatherIcon = document.getElementById("weatherIcon");
const locationElement = document.getElementById("locationName");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const themeSelector = document.getElementById("themeSelector");
const cityInput = document.getElementById("cityInput");

// Default icon fallback
const defaultIconURL = "https://i.pinimg.com/originals/e3/9d/e9/e39de96ddbf852ed53a4e9a993550641.gif";

const apiKey = "8b38a4d3d6920110547bdaef3d73c0ba"; // Replace with your OpenWeather API key

// Fetch weather data for city
function getWeather(city) {
  if (!city) return;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      // Use icon from OpenWeather or fallback
      const iconCode = data.weather[0].icon;
      weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png` || defaultIconURL;
      weatherIcon.alt = data.weather[0].description;

      locationElement.textContent = data.name.toLowerCase();
      temperatureElement.textContent = `${Math.round(data.main.temp)}°F`;
      descriptionElement.textContent = data.weather[0].description;
    })
    .catch(() => {
      weatherIcon.src = defaultIconURL;
      weatherIcon.alt = "weather icon";
      locationElement.textContent = "city not found";
      temperatureElement.textContent = "";
      descriptionElement.textContent = "";
    });
}

// Theme change handler
themeSelector.addEventListener("change", () => {
  const selectedTheme = themeSelector.value;
  weatherWidget.className = `widget ${selectedTheme}`;
});

// City input handler
cityInput.addEventListener("change", () => {
  getWeather(cityInput.value.trim());
});

// Load default city on startup
getWeather("Los Angeles");
