let weather = {
    apiKey: '20185bb0fe72c5e6422b9b290cf93b9c',
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
        .then((response) => response.json())
    .then((data) => this.displayWeather(data));
    },

    // Metricas a utilizar
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src= "https://openweathermap.org/img/wn/"+ icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity;
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/hs";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1000x1600/?"+ name +"')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
// Funcion para el botón del buscador
document.querySelector(".search button")
.addEventListener("click", function () {
    weather.search();
});
// Función para intro
document.querySelector(".search-bar")
.addEventListener("keyup", function (event) {
    if(event.key == "Enter") {
        weather.search();
    };
});

weather.fetchWeather("Buenos Aires");