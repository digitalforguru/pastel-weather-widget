const locationEl = document.getElementById('location');
const temperatureEl = document.getElementById('temperature');
const conditionEl = document.getElementById('condition');
const errorEl = document.getElementById('error');

const API_KEY = '8b38a4d3d6920110547bdaef3d73c0ba';

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${8b38a4d3d6920110547bdaef3d73c0ba}`)
    .then(res => res.json())
    .then(data => {
      if(data.cod !== 200) {
        throw new Error(data.message);
      }
      locationEl.textContent = `${data.name}, ${data.sys.country}`;
      temperatureEl.textContent = `${kelvinToCelsius(data.main.temp)} °C`;
      conditionEl.textContent = data.weather[0].description;
    })
    .catch(err => {
      errorEl.textContent = "Couldn't get weather: " + err.message;
      locationEl.textContent = '';
      temperatureEl.textContent = '';
      conditionEl.textContent = '';
    });
}

function requestLocation() {
  if (!navigator.geolocation) {
    errorEl.textContent = 'Geolocation is not supported by your browser.';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      errorEl.textContent = '';
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(lat, lon);
    },
    () => {
      errorEl.textContent = 'Permission denied. Please allow location access.';
    }
  );
}

requestLocation();
