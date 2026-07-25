// ==========================================
// weather.js — OpenWeatherMap current + forecast
// ==========================================

// TODO: Replace with your own free OpenWeatherMap API key
// Sign up at https://openweathermap.org/api
const WEATHER_API_KEY = 'Y2323b02f175610e08f28791643adb792';

// Davao City, Philippines coordinates
const CHAMBER_LAT = 7.1907;
const CHAMBER_LON = 125.4553;

const currentTempEl = document.getElementById('currentTemp');
const currentDescEl = document.getElementById('currentDesc');
const currentLocationEl = document.getElementById('currentLocation');
const forecastListEl = document.getElementById('forecastList');

async function getCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${CHAMBER_LAT}&lon=${CHAMBER_LON}&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather request failed (${response.status})`);
    }
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    console.error('Error fetching current weather:', error);
    if (currentDescEl) {
      currentDescEl.textContent = 'Weather unavailable right now';
    }
  }
}

function displayCurrentWeather(data) {
  if (currentTempEl) {
    currentTempEl.textContent = `${Math.round(data.main.temp)}°C`;
  }
  if (currentDescEl) {
    currentDescEl.textContent = data.weather[0].description;
  }
  if (currentLocationEl) {
    currentLocationEl.textContent = data.name || 'Davao City';
  }
}

async function getForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${CHAMBER_LAT}&lon=${CHAMBER_LON}&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Forecast request failed (${response.status})`);
    }
    const data = await response.json();
    displayForecast(data.list);
  } catch (error) {
    console.error('Error fetching forecast:', error);
    if (forecastListEl) {
      forecastListEl.innerHTML = '<p class="weather-note">3-day forecast unavailable right now.</p>';
    }
  }
}

// The 5 day / 3 hour forecast endpoint returns 3-hour steps.
// Group them by calendar day and pick the midday (closest to 12:00) reading
// for each of the next 3 days as a representative daily temperature.
function displayForecast(list) {
  if (!forecastListEl) return;

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().toDateString();
  const byDay = {};

  list.forEach((entry) => {
    const entryDate = new Date(entry.dt * 1000);
    const dateKey = entryDate.toDateString();

    if (dateKey === today) return; // skip today, we already show current weather

    const hour = entryDate.getHours();
    if (!byDay[dateKey] || Math.abs(hour - 12) < Math.abs(byDay[dateKey].hour - 12)) {
      byDay[dateKey] = { hour, temp: entry.main.temp, dayIndex: entryDate.getDay(), icon: entry.weather[0].icon };
    }
  });

  const nextThreeDays = Object.keys(byDay).slice(0, 3);

  forecastListEl.innerHTML = nextThreeDays
    .map((dateKey) => {
      const day = byDay[dateKey];
      return `
        <div class="forecast-day">
          <span class="day-label">${dayLabels[day.dayIndex]}</span>
          <span class="day-temp">${Math.round(day.temp)}°C</span>
        </div>
      `;
    })
    .join('');
}

getCurrentWeather();
getForecast();