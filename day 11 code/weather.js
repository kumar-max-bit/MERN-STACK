const apiKey = "61962479962d4c0ab0a160437262102";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherDetails = document.getElementById("weather-details");
const cityNameDisplay = document.getElementById("city-name");
const tempDisplay = document.getElementById("temp");
const conditionDisplay = document.getElementById("condition");
const humidityDisplay = document.getElementById("humidity");
const windDisplay = document.getElementById("wind");
const weatherIcon = document.getElementById("weather-icon");
const weatherContainer = document.querySelector(".weather-container");

function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    // Show a loading spinner on the button while fetching
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found or API error.");
            }
            return response.json();
        })
        .then((data) => {
            // Update DOM elements
            cityNameDisplay.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location.name}, ${data.location.country}`;
            
            tempDisplay.innerHTML = `${data.current.temp_c}<span>°C</span>`;
            conditionDisplay.textContent = data.current.condition.text;

            // Update background and theme based on weather
            updateDynamicBackground(data.current.condition.text, data.current.is_day);

            humidityDisplay.textContent = `${data.current.humidity}%`;
            windDisplay.textContent = `${data.current.wind_kph} km/h`;
            
            // The icon URL string starts with // so we prepend https:
            weatherIcon.src = `https:${data.current.condition.icon}`;
            weatherIcon.alt = data.current.condition.text;
            
            // Reveal the details area smoothly
            weatherDetails.classList.add("active");
        })
        .catch((err) => {
            console.error("Error fetching weather data:", err);
            alert("Could not fetch weather data. Please ensure the city is correct.");
            // Reset to default state on error
            setDefaultBackground();
            weatherDetails.classList.remove("active");
        })
        .finally(() => {
            // Restore the search icon
            searchBtn.innerHTML = '<i class="fas fa-search"></i>';
        });
}

function setDefaultBackground() {
    document.body.style.backgroundImage = 'linear-gradient(-45deg, #1e3c72, #2a5298, #00d2ff, #3a7bd5)';
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'gradientBG 15s ease infinite';
    weatherContainer.style.background = 'rgba(255, 255, 255, 0.1)';
}

function updateDynamicBackground(condition, isDay) {
    let imageUrl = '';
    const conditionLower = condition.toLowerCase();

    if (isDay) {
        weatherContainer.style.background = 'rgba(255, 255, 255, 0.1)';
        if (conditionLower.includes('sun') || conditionLower.includes('clear')) {
            imageUrl = 'https://images.unsplash.com/photo-1590687286822-e426438833c7?auto=format&fit=crop&w=1280&q=80';
        } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
            imageUrl = 'https://images.unsplash.com/photo-1499956827185-0d63ee4b5394?auto=format&fit=crop&w=1280&q=80';
        } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
            imageUrl = 'https://images.unsplash.com/photo-1515694346937-94d85e41e622?auto=format&fit=crop&w=1280&q=80';
        } else if (conditionLower.includes('snow') || conditionLower.includes('sleet') || conditionLower.includes('blizzard')) {
            imageUrl = 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1280&q=80';
        } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
            imageUrl = 'https://images.unsplash.com/photo-1485236102642-f34273b7b512?auto=format&fit=crop&w=1280&q=80';
        }
    } else { // It's night
        weatherContainer.style.background = 'rgba(0, 0, 0, 0.2)';
        if (conditionLower.includes('clear')) {
            imageUrl = 'https://images.unsplash.com/photo-1472552944129-b035e9ea3744?auto=format&fit=crop&w=1280&q=80';
        } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
            imageUrl = 'https://images.unsplash.com/photo-1509719331225-02d3c995f583?auto=format&fit=crop&w=1280&q=80';
        } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
            imageUrl = 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1280&q=80';
        } else if (conditionLower.includes('snow') || conditionLower.includes('sleet') || conditionLower.includes('blizzard')) {
            imageUrl = 'https://images.unsplash.com/photo-1542601098-3e1d404cb365?auto=format&fit=crop&w=1280&q=80';
        } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
            imageUrl = 'https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=1280&q=80';
        }
    }

    if (imageUrl) {
        document.body.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.2)), url('${imageUrl}')`;
        document.body.style.animation = 'none'; // Stop the gradient animation
    } else {
        // If no specific image is found, revert to the default gradient
        setDefaultBackground();
    }
}

// Set the default animated background when the page loads
setDefaultBackground();

// Trigger search on button click
searchBtn.addEventListener("click", fetchWeather);

// Trigger search on 'Enter' key press
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchWeather();
    }
});