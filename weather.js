const API_KEY = "8b38a4d3d6920110547bdaef3d73c0ba"; // Replace with your actual OpenWeather API key

const widget = document.querySelector('.widget');
const themeSelector = document.getElementById('themeSelector');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');

themeSelector.addEventListener('change', () => {
  // Remove any pastel color classes first
  widget.classList.remove('pink', 'sage', 'lavender', 'sky');
  // Add the selected color class
  widget.classList.add(themeSelector.value);
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showWeather, showError);
} else {
  locationEl.textContent = "Geolocation not supported";
  alert("Geolocation is not supported by your browser.");
}

function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      locationEl.textContent = data.name;
      temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionEl.textContent = data.weather[0].description;
    })
    .catch(() => {
      locationEl.textContent = "Couldn't get weather";
      temperatureEl.textContent = "";
      descriptionEl.textContent = "";
      alert("Sorry, couldn't fetch the weather data.");
    });
}

function showError(error) {
  locationEl.textContent = "Couldn't get location";
  temperatureEl.textContent = "";
  descriptionEl.textContent = "";
  alert("Sorry, couldn't access your location.");
}
