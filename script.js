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

        // Set weather icon based on weather condition
        let weatherCondition = data.weather[0].main;
        switch (weatherCondition) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                document.body.style.backgroundColor = "#d3d3d3"; // Light gray for cloudy
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                updateBackgroundTime(); // Uses time-based background
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                document.body.style.backgroundColor = "#6e6e6e"; // Dark gray for rain
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                document.body.style.backgroundColor = "#b3cde0"; // Light blue for drizzle
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                document.body.style.backgroundColor = "#a9a9a9"; // Gray for mist
                break;
            case "Snow":
                weatherIcon.src = "images/snow.png";
                document.body.style.backgroundColor = "#ffffff"; // White for snow
                break;
            default:
                weatherIcon.src = "images/default.png";
                updateBackgroundTime();
                break;
        }

        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        alert("Invalid city name. Please try again.");
        document.querySelector(".weather").style.display = "none"; // Hide the weather data on error
    }
}

// Change background color based on time
function updateBackgroundTime() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
        document.body.style.backgroundColor = "#ffffff"; // Day
        document.body.style.color = "#000"; // Dark text
    } else {
        document.body.style.backgroundColor = "#000000"; // Night
        document.body.style.color = "#fff"; // Light text
    }
}

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
