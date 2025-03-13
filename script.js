const apikey = "8110f53172c44af5f6ab8d4729ebe377";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (city.trim() === "") {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        console.log(data);

        // Display weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        // Update time-based background first
        updateBackgroundTime();

        // Set weather icon and override background if needed
        let weatherCondition = data.weather[0].main;
        switch (weatherCondition) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                setBackground("#d3d3d3"); // Light gray for cloudy
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break; // Keep time-based background
            case "Rain":
                weatherIcon.src = "images/rain.png";
                setBackground("#6e6e6e"); // Dark gray for rain
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                setBackground("#b3cde0"); // Light blue for drizzle
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                setBackground("#a9a9a9"); // Gray for mist
                break;
            case "Snow":
                weatherIcon.src = "images/snow.png";
                setBackground("#ffffff"); // White for snow
                break;
            default:
                weatherIcon.src = "images/default.png";
                break; // Keep time-based background
        }

        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        alert("Invalid city name. Please try again.");
        document.querySelector(".weather").style.display = "none";
    }
}

// Change background color based on time
function updateBackgroundTime() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
        setBackground("#ffffff", "#000"); // Day mode
    } else {
        setBackground("#000000", "#fff"); // Night mode
    }
}

// Helper function to set background and force repaint
function setBackground(color, textColor = null) {
    document.body.style.backgroundColor = color;
    if (textColor) {
        document.body.style.color = textColor;
    }
    document.body.offsetHeight; // Force repaint
}

// Event listeners
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }
});

// Set initial background based on time
updateBackgroundTime();
