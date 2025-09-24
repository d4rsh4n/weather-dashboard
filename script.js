const apiKey ="1ba4ad97343ab74986fa4cf1880af072";

// Get weather by city name
function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }
  fetchWeatherByCity(city);
}

// Fetch weather by city
function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        document.getElementById("weather").innerHTML = "❌ City not found!";
        return;
      }
      displayWeather(data);
    })
    .catch(error => {
      document.getElementById("weather").innerHTML = "⚠️ Error fetching weather data.";
      console.error(error);
    });
}

// Display weather in #weather div
function displayWeather(data) {
  const weatherHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>🌡️ ${data.main.temp}°C</p>
    <p>☁️ ${data.weather[0].description}</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
  `;
  document.getElementById("weather").innerHTML = weatherHTML;
}

// Auto detect user location
window.onload = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
          .then(response => response.json())
          .then(data => displayWeather(data))
          .catch(error => {
            document.getElementById("weather").innerHTML = "⚠️ Error fetching weather data.";
            console.error(error);
          });
      },
      error => {
        console.warn("Geolocation not allowed or unavailable. You can search manually.");
      }
    );
  }
};

// Wire the search button
document.getElementById("searchBtn").addEventListener("click", getWeather);
