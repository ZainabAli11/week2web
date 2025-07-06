const cities = [
  { name: "Karachi", latitude: 24.8607, longitude: 67.0011 },
  { name: "Lahore", latitude: 31.5497, longitude: 74.3436 },
  { name: "Islamabad", latitude: 33.6844, longitude: 73.0479 },
  { name: "Rawalpindi", latitude: 33.5651, longitude: 73.0169 },
  { name: "Faisalabad", latitude: 31.4504, longitude: 73.1350 },
  { name: "Multan", latitude: 30.1575, longitude: 71.5249 },
  { name: "Peshawar", latitude: 34.0151, longitude: 71.5249 },
  { name: "Quetta", latitude: 30.1798, longitude: 66.9750 },
  { name: "Gujranwala", latitude: 32.1877, longitude: 74.1945 },
  { name: "Sialkot", latitude: 32.4945, longitude: 74.5229 },
  { name: "Bahawalpur", latitude: 29.3956, longitude: 71.6836 },
  { name: "Sukkur", latitude: 27.7052, longitude: 68.8574 },
  { name: "Abbottabad", latitude: 34.1688, longitude: 73.2215 },
  { name: "Hyderabad", latitude: 25.3960, longitude: 68.3578 },
  { name: "Mardan", latitude: 34.1982, longitude: 72.0450 },
];

const weatherIcons = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌧️",
  55: "🌧️",
  56: "🌨️",
  57: "🌨️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  66: "❄️",
  67: "❄️",
  71: "❄️",
  73: "❄️",
  75: "❄️",
  77: "❄️",
  80: "🌧️",
  81: "🌧️",
  82: "🌧️",
  85: "❄️",
  86: "❄️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️"
};

const container = document.getElementById('weather');
container.innerHTML = ''; // clear loading message

cities.forEach(city => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const weather = data.current_weather;
      const icon = weatherIcons[weather.weathercode] || "❓";

      const cityDiv = document.createElement('div');
      cityDiv.classList.add('city-card');
      if (weather.temperature >= 25) cityDiv.classList.add('summer');

      cityDiv.innerHTML = `
        <div class="city-name">${city.name}</div>
        <div class="weather-icon">${icon}</div>
        <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
        <p><strong>Wind Speed:</strong> ${weather.windspeed} km/h</p>
        <p><strong>Wind Direction:</strong> ${weather.winddirection}°</p>
        <p><strong>Time:</strong> ${new Date(weather.time).toLocaleString()}</p>
        ${weather.temperature >= 25 ? `<p class="summer-note">🔥 Summer!</p>` : ''}
      `;

      container.appendChild(cityDiv);
    })
    .catch(err => {
      console.error(`Error fetching weather for ${city.name}:`, err);
      const errorDiv = document.createElement('div');
      errorDiv.textContent = `Weather data not available for ${city.name}`;
      errorDiv.style.color = 'red';
      container.appendChild(errorDiv);
    });
});
