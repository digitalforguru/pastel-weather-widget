const API_KEY = "8b38a4d3d6920110547bdaef3d73c0ba"; // Replace with your OpenWeather API key

const widget = document.querySelector('.widget');
const themeSelector = document.getElementById('themeSelector');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');

themeSelector.addEventListener('change', () => {
  widget.classList.remove('pink', 'sage', 'lavender', 'sky');
  widget.classList.add(themeSelector.value);
});

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
      locationEl.textContent = data.name;
      temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;

      // Get icon code and URL
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      // Show icon + description text
      descriptionEl.innerHTML = `<img src="${iconUrl}" alt="Weather Icon" style="vertical-align: middle; width: 40px; height: 40px; margin-right: 8px;" /> ${data.weather[0].description}`;
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
