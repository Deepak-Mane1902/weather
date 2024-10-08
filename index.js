const CityName = document.querySelector('.weather_city');
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let citysearch = document.querySelector(".weather_search");

let w_feels = document.querySelector(".weather_feels");
let w_humidity  = document.querySelector(".weather_humidity" );
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");


let city = "Mumbai";

citysearch.addEventListener("submit",(e)=>{
    e.preventDefault();

    let city_name = document.querySelector(".cityName");
    console.log(city_name.value);
    city = city_name.value;
    getWeatherData();
    city_name.value = "";
     
})

const getCountryCode=(code)=>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code );
}
const getDatetime=(dt)=>{
    const curDate = new Date(dt*1000);
    console.log(curDate);

    const option={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
    };
    const formatter = new Intl.DateTimeFormat('en-US',option);
    return  formatter.format(curDate)
}

const getWeatherData = async()=>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d8aa6a5f2f0f2c28e7416e4e0a240b54`;
    try{
        const response = await fetch(weatherUrl)
        const data = await response.json();
        console.log(data);
        const {main,name,weather,wind,sys,dt}=data;
        CityName.innerHTML =`${name},${getCountryCode(sys.country)}`;
        dateTime.innerHTML = getDatetime(dt);

        w_temperature.innerHTML = `${main.temp}&#176`;
        w_minTem.innerHTML = `Min : ${main.temp_min.toFixed()}&#176`;
        w_maxTem.innerHTML = `Max : ${main.temp_max.toFixed()}&#176`;
        w_feels.innerHTML = `${main.feels_like}&#176`;
        w_humidity.innerHTML = `${main.humidity} %`;
        w_wind.innerHTML = `${wind.speed} m/s`;
        w_pressure.innerHTML = `${main.pressure} hPa`;
        
        w_forecast.innerHTML= weather[0].main;
        w_icon.innerHTML= `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;
    }
    catch(error){
        console.log(error);
        
    }
}
document.body.addEventListener('load', getWeatherData());
