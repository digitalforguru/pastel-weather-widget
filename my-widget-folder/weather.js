const API_KEY = "8b38a4d3d6920110547bdaef3d73c0ba"; // Replace with your real key

const widget = document.querySelector('.widget');
const themeSelector = document.getElementById('themeSelector');
const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const weatherIcon = document.getElementById('weatherIcon');

const iconMap = {
  Clear: "https://raw.githubusercontent.com/rodrigokamada/openweathermap/master/images/01d_t.png",
  Clouds: "https://raw.githubusercontent.com/rodrigokamada/openweathermap/master/images/03d_t.png",
  Rain: "https://raw.githubusercontent.com/rodrigokamada/openweathermap/master/images/10d_t.png",
  Drizzle: "https://raw.githubusercontent.com/rodrigokamada/openweathermap/master/images/09d_t.png",
  Thunderstorm: "https://raw.githubusercontent.com/rodrigokamada/openweathermap/master/images/11d_t.png",
  Snow: "https://raw.githubusercontent.com/rodrigokamada/openweathermap/master/images/13d_t.png",
  Mist: "https://raw.githubusercontent.com/rodrigokamada/openweathermap/master/images/50d_t.png",
  Default: "https://raw.githubusercontent.com/rodrigokamada/openweathermap/master/images/01d_t.png"
};

themeSelector.addEventListener('change', () => {
  widget.classList.remove('pink', 'sage', 'lavender', 'sky');
  widget.classList.add(themeSelector.value);
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showWeather, showError);
} else {
  locationEl.textContent = "Geolocation not supported";
  weatherIcon.src = iconMap.Default;
}

function showWeather(position) {
  const { latitude: lat, longitude: lon } = position.coords;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod !== 200) throw new Error(data.message);
      locationEl.textContent = data.name;
      temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionEl.textContent = data.weather[0].description;

      const cond = data.weather[0].main;
      weatherIcon.src = iconMap[cond] || iconMap.Default;
      weatherIcon.alt = data.weather[0].description;
    })
    .catch(err => {
      locationEl.textContent = err.message || "Weather Error";
      temperatureEl.textContent = "";
      descriptionEl.textContent = "";
      weatherIcon.src = iconMap.Default;
    });
}

function showError() {
  locationEl.textContent = "Location denied";
  temperatureEl.textContent = "";
  descriptionEl.textContent = "";
  weatherIcon.src = iconMap.Default;
}
