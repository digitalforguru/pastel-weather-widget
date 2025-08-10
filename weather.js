const weatherWidget = document.getElementById("weatherWidget");
const weatherIcon = document.getElementById("weatherIcon");
const locationElement = document.getElementById("locationName");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const themeSelector = document.getElementById("themeSelector");
const cityInput = document.getElementById("cityInput");
const locationBtn = document.getElementById("locationBtn");

// Your custom icon mapping URLs here:
const iconMap = {
  "Clear": "https://i.pinimg.com/originals/09/fb/e5/09fbe54e3fdbf459e490006c56f999f9.gif",
  "Clouds": "https://i.pinimg.com/originals/e3/9d/e9/e39de96ddbf852ed53a4e9a993550641.gif",
  "Rain": "https://i.pinimg.com/originals/2e/50/b8/2e50b8f6c94ecce01cbc30eb275fc6ea.gif",
  "Snow": "https://i.pinimg.com/originals/6e/36/7c/6e367ce95ab109121d03f12ed7d250c8.gif",
  "Thunderstorm": "https://i.pinimg.com/originals/86/5e/10/865e10e7bcc6a739e01598dfbe38e300.gif",
};

const cloudIconURL = "https://i.pinimg.com/originals/e3/9d/e9/e39de96ddbf852ed53a4e9a993550641.gif";

const apiKey = "8b38a4d3d6920110547bdaef3d73c0ba";

// Load saved city & theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedCity = localStorage.getItem("userCity");
  if (savedCity) {
    cityInput.value = savedCity;
    getWeather(savedCity);
  } else {
    getWeather("Los Angeles");
  }

  const savedTheme = localStorage.getItem("userTheme");
  if (savedTheme) {
    themeSelector.value = savedTheme;
    weatherWidget.className = "widget " + savedTheme + " small-square";
  } else {
    weatherWidget.className = "widget pink small-square";
  }
});

// Fetch and show weather
function getWeather(city) {
  if (!city) return;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const mainWeather = data.weather[0].main;
      const iconURL = iconMap[mainWeather] || cloudIconURL;
      weatherIcon.src = iconURL;
      weatherIcon.alt = data.weather[0].description;

      locationElement.textContent = data.name.toLowerCase();
      temperatureElement.textContent = `${Math.round(data.main.temp)}°f`;
      descriptionElement.textContent = data.weather[0].description.toLowerCase();
    })
    .catch(() => {
      weatherIcon.src = "";
      weatherIcon.alt = "";
      locationElement.textContent = "unable to fetch weather";
      temperatureElement.textContent = "";
      descriptionElement.textContent = "";
    });
}

// Save theme on change
themeSelector.addEventListener("change", () => {
  const theme = themeSelector.value;
  weatherWidget.className = "widget " + theme + " small-square";
  localStorage.setItem("userTheme", theme);
});

// When city input changes, save & update weather
cityInput.addEventListener("change", () => {
  const city = cityInput.value.trim();
  if (city) {
    localStorage.setItem("userCity", city);
    getWeather(city);
  }
});

// Location button toggles city input focus
locationBtn.addEventListener("click", () => {
  cityInput.focus();
});
