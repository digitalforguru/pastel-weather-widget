const apiKey = "8b38a4d3d6920110547bdaef3d73c0ba"; // replace with your OpenWeather API key

document.addEventListener("DOMContentLoaded", () => {
  const locationElement = document.getElementById("location");
  const temperatureElement = document.getElementById("temperature");
  const descriptionElement = document.getElementById("description");
  const iconElement = document.getElementById("weatherIcon");
  const widget = document.querySelector(".widget");
  const themeSelector = document.getElementById("themeSelector");

  // Theme change
  themeSelector.addEventListener("change", (e) => {
    widget.className = "widget " + e.target.value;
  });

  // Get location & weather
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    locationElement.textContent = "Geolocation not supported";
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        locationElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;

        // Set weather icon
        const iconCode = data.weather[0].icon;
        iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        iconElement.alt = data.weather[0].description;
      })
      .catch(() => {
        locationElement.textContent = "Unable to get weather";
      });
  }

  function error() {
    locationElement.textContent = "Location access denied";
  }
});
