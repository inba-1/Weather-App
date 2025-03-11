 const apikey="8110f53172c44af5f6ab8d4729ebe377";
        const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchBox=document.querySelector(".search input");
        const searchBtn=document.querySelector(".search button");
        const weatherIcon=document.querySelector(".weather-icon");
        async function checkWeather(city) {
            try{
            const response=await fetch (apiUrl + city+`&appid=${apikey}`);
            if(!response.ok) throw new Error("City not found");
            var data=await response.json();

            console.log(data);
            document.querySelector(".city").innerHTML=data.name;
            document.querySelector(".temp").innerHTML= Math.round(data.main.temp) +"°c";
            document.querySelector(".humidity").innerHTML=data.main.humidity +"%";
            document.querySelector(".wind").innerHTML=data.wind.speed + "km/hr";
            if(data.weather[0].main=="Clouds"){
                weatherIcon.src="images/clouds.png";
            }else if(data.weather[0].main=="Clear"){
                weatherIcon.src="images/clear.png";
            }else if(data.weather[0].main=="Rain"){
                weatherIcon.src="images/rain.png";
            }else if(data.weather[0].main=="Drizzle"){
                weatherIcon.src="images/drizzle.png";
            }else if(data.weather[0].main=="Mist"){
                weatherIcon.src="images/mist.png";
            }else if(data.weather[0].main=="Snow"){
                weatherIcon.src="images/snow.png";
            }
            document.querySelector(".weather").style.display="block";
        }catch(error){
            alert("Invalid city name. Please try again.");
        }
    }
        searchBtn.addEventListener("click",()=>{
        checkWeather(searchBox.value);
        });
        searchBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && searchBox.value.trim() !== "") {
          checkWeather(searchBox.value);
        }
      });
