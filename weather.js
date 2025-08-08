const API_KEY = "8b38a4d3d6920110547bdaef3d73c0ba"; // Replace with your own key

const widget = document.querySelector('.widget');
const themeSelector = document.getElementById('themeSelector');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');

// Theme selector change
themeSelector.addEventListener('change', () => {
  widget.classList.remove('pink', 'sage', 'lavender', 'sky');
  widget.classList.add(themeSelector.value);
});

// Get location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showWeather, showError);
} else {
  locationEl.textContent = "Geolocation not supported";
}

function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      console.log("Weather data:", data);

      if (data.cod !== 200) {
        locationEl.textContent = "Error fetching weather";
        return;
      }

      locationEl.textContent = data.name;
      temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionEl.textContent = data.weather[0].description;

      // Get icon code with fallback
      const iconCode = data.weather?.[0]?.icon || "01d";
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      weatherIcon.src = iconUrl;
      weatherIcon.alt = data.weather?.[0]?.description || "Weather icon";
    })
    .catch(() => {
      locationEl.textContent = "Couldn't get weather";
      temperatureEl.textContent = "";
      descriptionEl.textContent = "";
      weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png"; // Fallback sunny icon
    });
}

function showError() {
  locationEl.textContent = "Couldn't get location";
  temperatureEl.textContent = "";
  descriptionEl.textContent = "";
  weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png";
}
