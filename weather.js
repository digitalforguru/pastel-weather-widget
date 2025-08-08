const API_KEY = "8b38a4d3d6920110547bdaef3d73c0ba"; // Replace with your OpenWeather API key

const widget = document.querySelector('.widget');
const themeSelector = document.getElementById('themeSelector');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');

themeSelector.addEventListener('change', () => {
  // Remove any of the pastel color classes first
  widget.classList.remove('pink', 'sage', 'lavender', 'sky');
  // Add the selected color class
  widget.classList.add(themeSelector.value);
});

// Set default theme
widget.classList.add('pink');

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showWeather, showError);
} else {
  locationEl.textContent = "Geolocation not supported";
}

function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${8b38a4d3d6920110547bdaef3d73c0ba}&units=metric`)
    .then(response => response.json())
    .then(data => {
      locationEl.textContent = data.name;
      temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionEl.textContent = data.weather[0].description;
    })
    .catch(() => {
      locationEl.textContent = "Couldn't get weather";
      temperatureEl.textContent = "";
      descriptionEl.textContent = "";
    });
}

function showError() {
  locationEl.textContent = "Couldn't get location";
  temperatureEl.textContent = "";
  descriptionEl.textContent = "";
}
