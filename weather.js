const API_KEY = "8b38a4d3d6920110547bdaef3d73c0ba";

// Custom icon mapping
const iconMap = {
    "Clear": "https://i.pinimg.com/originals/e7/19/fc/e719fc49e7e4bdcbc369f9f3145b77b3.gif",
    "Clouds": "https://i.pinimg.com/originals/e3/9d/e9/e39de96ddbf852ed53a4e9a993550641.gif",
    "Rain": "https://i.pinimg.com/originals/2e/50/b8/2e50b8f6c94ecce01cbc30eb275fc6ea.gif",
    "Snow": "https://i.pinimg.com/originals/6e/36/7c/6e367ce95ab109121d03f12ed7d250c8.gif",
    "Thunderstorm": "https://i.pinimg.com/originals/86/5e/10/865e10e7bcc6a739e01598dfbe38e300.gif"
};

// DOM elements
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const themeBtn = document.getElementById("theme-btn");
const themeOptions = document.getElementById("theme-options");
const themeOptionButtons = document.querySelectorAll(".theme-option");

const locationBtn = document.getElementById("location-btn");
const cityInputContainer = document.getElementById("city-input-container");
const cityInput = document.getElementById("city-input");
const saveCityBtn = document.getElementById("save-city");

// Load saved city & theme
let savedCity = localStorage.getItem("weatherCity");
let savedTheme = localStorage.getItem("widgetTheme") || "#eed6c1";
document.querySelector(".widget").style.backgroundColor = savedTheme;
themeBtn.style.backgroundColor = savedTheme;

if (savedCity) {
    fetchWeather(savedCity);
}

// Theme toggle
themeBtn.addEventListener("click", () => {
    themeOptions.classList.toggle("hidden");
});

themeOptionButtons.forEach(btn => {
    btn.style.backgroundColor = btn.dataset.color;
    btn.addEventListener("click", () => {
        let newColor = btn.dataset.color;
        document.querySelector(".widget").style.backgroundColor = newColor;
        themeBtn.style.backgroundColor = newColor;
        localStorage.setItem("widgetTheme", newColor);
        themeOptions.classList.add("hidden");
    });
});

// Location input toggle
locationBtn.addEventListener("click", () => {
    cityInputContainer.classList.toggle("hidden");
});

// Save city & fetch weather
saveCityBtn.addEventListener("click", () => {
    let city = cityInput.value.trim();
    if (city) {
        localStorage.setItem("weatherCity", city);
        fetchWeather(city);
        cityInputContainer.classList.add("hidden");
    }
});

// Fetch weather function
function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                cityName.textContent = data.name;
                temperature.textContent = `${Math.round(data.main.temp)}°C`;
                description.textContent = data.weather[0].description;
                let mainWeather = data.weather[0].main;
                weatherIcon.src = iconMap[mainWeather] || "";
            } else {
                cityName.textContent = "City not found";
                weatherIcon.src = "";
                temperature.textContent = "";
                description.textContent = "";
            }
        })
        .catch(err => console.error("Error fetching weather:", err));
}
