const weatherWidget = document.getElementById("weatherWidget");
const weatherIcon = document.getElementById("weatherIcon");
const locationElement = document.getElementById("locationName");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const themeSelector = document.getElementById("themeSelector");
const cityInput = document.getElementById("cityInput");
const themeColors = {
  pink: '#722f44',     // dark pinkish text
  sage: '#3a4a32',     // deep green
  lavender: '#4a3a64', // deep purple
  sky: '#243447'       // dark blue-gray
};
// Set initial colors based on default theme selection
const initialTheme = themeSelector.value;
weatherWidget.style.color = themeColors[initialTheme];
cityInput.style.borderColor = themeColors[initialTheme];
themeSelector.style.borderColor = themeColors[initialTheme];


const cloudIconURL = "https://i.pinimg.com/originals/e3/9d/e9/e39de96ddbf852ed53a4e9a993550641.gif";
const apiKey = "8b38a4d3d6920110547bdaef3d73c0ba"; // Replace with your OpenWeatherMap API key

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
    });
}

// Theme change
themeSelector.addEventListener('change', () => {
  const selectedTheme = themeSelector.value;
  weatherWidget.className = `widget ${selectedTheme}`;
  weatherWidget.style.color = themeColors[selectedTheme] || '#000';
    // Update focus border color on inputs
  const focusColor = themeColors[selectedTheme] || '#722f44';
  cityInput.style.borderColor = focusColor;
  themeSelector.style.borderColor = focusColor;
});
  // Change text color dynamically:
  weatherWidget.style.color = themeColors[selectedTheme] || '#000';
});
// City change
cityInput.addEventListener("change", () => {
  getWeather(cityInput.value.trim());
});

// Load default city
getWeather("Los Angeles");
