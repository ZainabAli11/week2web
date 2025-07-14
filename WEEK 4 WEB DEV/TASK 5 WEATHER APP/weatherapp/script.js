function searchCityWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return;

  const apiKey = "6a8331e54b674eb3b31130807251407";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const weather = data.current;
      const location = data.location;

      const condition = weather.condition.text.toLowerCase();
      let bgImage = "default.jpg";

      if (condition.includes("sunny") || condition.includes("clear")) {
        bgImage = "sunny.jpeg";
      } else if (condition.includes("overcast")) {
        bgImage = "overcast.jpeg";
      } else if (condition.includes("partly") && condition.includes("cloudy")) {
        bgImage = "partly cloudy.webp";
      } else if (condition.includes("cloud")) {
        bgImage = "cloudy.jpg";
      } else if (condition.includes("rain") || condition.includes("drizzle")) {
        bgImage = "rainy.jpg";
      } else if (condition.includes("snow") || condition.includes("blizzard")) {
        bgImage = "snowy.jpeg";
      } else if (condition.includes("fog") || condition.includes("mist") || condition.includes("haze")) {
        bgImage = "fog.jpeg";
      } else {
        bgImage = "clear.jpg";
      }

      document.body.style.backgroundImage = `url('images/${bgImage}')`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";

      // === Create Weather Card ===
      const card = document.createElement("div");
      card.className = "city-card";

      const icon = condition.includes("sunny") ? "☀️" :
                   condition.includes("overcast") ? "⛅" :
                   (condition.includes("partly") && condition.includes("cloudy")) ? "⛅" :
                   condition.includes("cloud") ? "☁️" :
                   condition.includes("rain") ? "🌧️" :
                   condition.includes("snow") ? "❄️" :
                   condition.includes("fog") ? "🌫️" :
                   "🌡️";

      card.innerHTML = `
        <div class="city-name">${location.name}, ${location.country}</div>
        <div class="weather-icon">${icon}</div>
        <p><strong>Condition:</strong> ${weather.condition.text}</p>
        <p><strong>Temp:</strong> ${weather.temp_c}°C</p>
        <p><strong>Humidity:</strong> ${weather.humidity}%</p>
        <p><strong>Wind:</strong> ${weather.wind_kph} km/h</p>
        <p><strong>Time:</strong> ${location.localtime}</p>
      `;

      const container = document.getElementById("weather");
      container.innerHTML = '';
      container.appendChild(card);
    })
    .catch(err => {
      document.getElementById("weather").innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
    });
}
