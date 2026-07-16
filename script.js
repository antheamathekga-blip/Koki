// Dynamic Toggle & Dropdown System
function showTab(event, tabId) {
    const contentCard = document.getElementById('contentBox');
    const targetSection = document.getElementById(tabId);
    
    // If the pressed button is already active, close the dropdown
    if (event.currentTarget.classList.contains('active')) {
        event.currentTarget.classList.remove('active');
        targetSection.classList.remove('active-content');
        contentCard.classList.remove('revealed');
        return;
    }

    // Ensure the main data white container reveals
    contentCard.classList.add('revealed');

    // Hide all other section text contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active-content'));
    
    // Clear active highlight states from all layout buttons
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Reveal the selected info block and highlight the clicked button
    targetSection.classList.add('active-content');
    event.currentTarget.classList.add('active');
}

// Automatic Geolocation Activation
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, handleGeoFallback, {
            timeout: 4000,
            enableHighAccuracy: false
        });
    } else {
        handleGeoFallback();
    }
});

function getWeather(position) {
    fetchWeatherData(position.coords.latitude, position.coords.longitude, `Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}`);
}

function handleGeoFallback() {
    fetchWeatherData(-26.20, 28.04, "Johannesburg South (Default Base)");
}

function fetchWeatherData(lat, lon, locationLabel) {
    const apiURL = `https://open-meteo.com{lat}&longitude=${lon}&current_weather=true`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const temp = data.current_weather.temperature;
            const weatherCode = data.current_weather.weathercode;
            
            let description = "Clear skies";
            if (weatherCode > 0 && weatherCode <= 3) description = "Partly Cloudy";
            else if (weatherCode >= 45 && weatherCode <= 48) description = "Foggy";
            else if (weatherCode >= 51 && weatherCode <= 67) description = "Rainy";
            else if (weatherCode >= 71) description = "Stormy";

            document.getElementById('location').innerText = locationLabel;
            document.getElementById('weather-desc').innerText = description;
            document.getElementById('temperature').innerText = `${temp}°C`;
        })
        .catch(() => {
            document.getElementById('weather-desc').innerText = "Weather system offline";
        });
}
