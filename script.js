// Get elements from the DOM
const weatherForm = document.getElementById('weatherForm');
const weatherContainer = document.getElementById('weather');

// Add event listener to form submission
weatherForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const city = document.getElementById('city').value;
    getWeather(city);
});

function getWeather(city) {
    const apiKey = 'dcd79caefc293ff08db3f25fbcf2a398'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        });
}

function displayWeather(data) {
    const weatherHTML = `
        <h2>${data.name}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
    weatherContainer.innerHTML = weatherHTML;
}