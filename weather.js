document.addEventListener('DOMContentLoaded', function() {
    const fetchWeatherButton = document.getElementById('fetchWeatherButton');
    const locationInput = document.getElementById('locationInput');
    const weatherDisplay = document.getElementById('weatherDisplay');

    const apiKey = 'e50b8e5dadc7e52e36ca7069a47c556d';

    fetchWeatherButton.addEventListener('click', function() {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        } else {
            alert('Please enter a location.');
        }
    });

    function fetchWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '401') {
                    displayError('Invalid API key. Please check your API key and try again.');
                } else if (data.cod === '404') {
                    displayError('Location not found. Please check the location name and try again.');
                } else if (data.cod !== 200) {
                    displayError(`Error: ${data.message}`);
                } else {
                    displayWeather(data);
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                displayError('Network error. Please try again.');
            });
    }

    function displayWeather(data) {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherDisplay.innerHTML = `
            <p><strong>Location:</strong> ${data.name}</p>
            <p><img src="${weatherIcon}" alt="${weatherDescription}" class="weather-icon"> <strong>Weather:</strong> ${weatherDescription}</p>
            <p><strong>Temperature:</strong> ${temperature} °C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        `;
    }

    function displayError(message) {
        weatherDisplay.innerHTML = `<p class="error">${message}</p>`;
    }
});
