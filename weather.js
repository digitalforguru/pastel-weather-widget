const weatherWidget = document.getElementById("weatherWidget");
const weatherIcon = document.getElementById("weatherIcon");
const locationElement = document.getElementById("locationName");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const themeSelector = document.getElementById("themeSelector");
const cityInput = document.getElementById("cityInput");

const cloudIconURL = "https://i.pinimg.com/originals/e3/9d/e9/e39de96ddbf852ed53a4e9a993550641.gif";
const apiKey = "8b38a4d3d6920110547bdaef3d73c0ba"; // Your OpenWeatherMap API key

function getWeather(city) {
  if (!city) return;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

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
    .catch(error => {
      console.error("Error fetching weather:", error);
      descriptionElement.textContent = "Unable to fetch weather";
      temperatureElement.textContent = "";
      locationElement.textContent = "";
      weatherIcon.src = "";
      weatherIcon.alt = "";
    });
}

// Theme selector listener
themeSelector.addEventListener("change", () => {
  const selectedTheme = themeSelector.value;
  weatherWidget.className = `widget ${selectedTheme}`;
});

// City input listener: save city and fetch weather
cityInput.addEventListener("change", () => {
  const city = cityInput.value.trim();
  if (city) {
    localStorage.setItem("userCity", city);
    getWeather(city);
  }
});

// On page load, check saved city or use default
const savedCity = localStorage.getItem("userCity");
if (savedCity) {
  cityInput.value = savedCity;
  getWeather(savedCity);
} else {
  getWeather("Los Angeles"); // Default city if none saved
}
