const weatherWidget = document.getElementById("weatherWidget");
const weatherIcon = document.getElementById("weatherIcon");
const locationElement = document.getElementById("locationName");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const cityInput = document.getElementById("cityInput");
const locationPopup = document.getElementById("locationPopup");
const locationBtn = document.getElementById("locationBtn");
const themeToggle = document.getElementById("themeToggle");
const themeOptions = document.getElementById("themeOptions");
const themeCircles = document.querySelectorAll(".theme-circle");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const params = new URLSearchParams(window.location.search);
const isEmbed = params.get("embed") === "true";

const iconMap = {
  "Clear": "https://i.pinimg.com/originals/09/fb/e5/09fbe54e3fdbf459e490006c56f999f9.gif",
  "Clouds": "https://i.pinimg.com/originals/e3/9d/e9/e39de96ddbf852ed53a4e9a993550641.gif",
  "Rain": "https://i.pinimg.com/originals/2e/50/b8/2e50b8f6c94ecce01cbc30eb275fc6ea.gif",
  "Snow": "https://i.pinimg.com/originals/6e/36/7c/6e367ce95ab109121d03f12ed7d250c8.gif",
  "Thunderstorm": "https://i.pinimg.com/originals/86/5e/10/865e10e7bcc6a739e01598dfbe38e300.gif",
};

const cloudIconURL = "https://i.pinimg.com/originals/e3/9d/e9/e39de96ddbf852ed53a4e9a993550641.gif";
const apiKey = "8b38a4d3d6920110547bdaef3d73c0ba";

if (isEmbed) {
  const builderUI = document.querySelector(".builder-ui");
  if (builderUI) builderUI.style.display = "none";
}

function buildWidgetURL(city, theme) {
  const base = window.location.origin + window.location.pathname;
  return `${base}?city=${encodeURIComponent(city)}&theme=${theme}&embed=true`;
}

function copyWidgetLink() {
  const city = localStorage.getItem("userCity") || "Los Angeles";
  const theme = localStorage.getItem("userTheme") || "pink";

  const url = buildWidgetURL(city, theme);

  navigator.clipboard.writeText(url);

  const message = document.getElementById("copyMessage");

  if (message) {
    message.classList.remove("hidden");
    message.classList.add("show");
  }
  if (!isEmbed && copyLinkBtn) {
  copyLinkBtn.style.display = "none";
}

} // ✅ CLOSE FUNCTION RIGHT HERE

  // 🌸 hide button after copying (ONLY in builder mode)
 
locationBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  const isHidden = locationPopup.classList.contains("hidden");

  if (isHidden) {
    locationPopup.classList.remove("hidden");
    cityInput.focus();
  } else {
    locationPopup.classList.add("hidden");
  }
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const city = cityInput.value.trim();

    if (city) {
      localStorage.setItem("userCity", city);
      getWeather(city);

      locationPopup.classList.add("hidden");
    }
  }
});
cityInput.addEventListener("blur", () => {
  locationPopup.classList.add("hidden");
});
document.addEventListener("click", (e) => {
  const isClickInsidePopup = locationPopup?.contains(e.target);
  const isClickLocationBtn = locationBtn.contains(e.target);

  if (!isClickInsidePopup && !isClickLocationBtn) {
    locationPopup.classList.add("hidden");
  }
});

// Load saved city & theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const urlCity = params.get("city");
  const urlTheme = params.get("theme");

  const savedCity = urlCity || localStorage.getItem("userCity");
  const savedTheme = urlTheme || localStorage.getItem("userTheme");

  if (savedCity) {
    cityInput.value = savedCity;
    getWeather(savedCity);
  } else {
    getWeather("Los Angeles");
  }

  if (savedTheme) {
    weatherWidget.className = `widget ${savedTheme} small-square`;
  } else {
    weatherWidget.className = `widget pink small-square`;
  }
});

// Fetch weather and update UI
function getWeather(city) {
  if (!city) return;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error("city not found");
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


if (copyLinkBtn) {
  copyLinkBtn.addEventListener("click", copyWidgetLink);
}

// Show/hide city input on location icon button click

// Toggle theme dropdown on main theme circle button click
themeToggle.addEventListener("click", () => {
  themeOptions.classList.toggle("hidden");
});

// When a theme circle is clicked, update theme and save
themeCircles.forEach(circle => {
  circle.addEventListener("click", () => {
    const theme = circle.getAttribute("data-theme");

    weatherWidget.className = `widget ${theme} small-square`;
    localStorage.setItem("userTheme", theme);
    
    themeOptions.classList.add("hidden");
  });
});
