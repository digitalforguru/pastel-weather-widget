const API_KEY = "8b38a4d3d6920110547bdaef3d73c0ba"; // Replace with your key
const widget = document.querySelector('.widget');
const themeSelector = document.getElementById('themeSelector');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');

// Cute icon pack mapping (local or CDN)
const iconMap = {
  Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
  Clouds: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  Rain: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
  Drizzle: "https://cdn-icons-png.flaticon.com/512/1163/1163657.png",
  Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png",
  Snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  Mist: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  Default: "https://cdn-icons-png.flaticon.com/512/869/869869.png" // fallback sunny
};

// Theme selector handler
themeSelector.addEventListener('change', () => {
  widget.classList.remove('pink', 'sage', 'lavender', 'sky');
  widget.classList.add(themeSelector.value);
});

// Get location & weather
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showWeather, showError);
} else {
  locationEl.textContent = "Geolocation not supported";
  weatherIcon.src = iconMap.Default;
}

function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      locationEl.textContent = data.name || "Unknown Location";
      temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionEl.textContent = data.weather[0].description;

      const mainCondition = data.weather[0].main;
      weatherIcon.src = iconMap[mainCondition] || iconMap.Default;
    })
    .catch(() => {
      locationEl.textContent = "Error loading weather";
      temperatureEl.textContent = "";
      descriptionEl.textContent = "";
      weatherIcon.src = iconMap.Default;
    });
}

function showError() {
  locationEl.textContent = "Couldn't get location";
  weatherIcon.src = iconMap.Default;
}
