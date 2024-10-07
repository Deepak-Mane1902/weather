const CityName = document.querySelector('.weather_city');
let dateTime = document.querySelector("weather_date_time");
let w_forecast = document.querySelector("weather_forecast");
let w_icon = document.querySelector("weather_icon");
let w_temperature = document.querySelector("weather_temperature");
let w_minTem = document.querySelector("weather_min");
let w_maxTem = document.querySelector("weather_max");

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

const getWeatherData= async()=>{
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=pune&appid=d8aa6a5f2f0f2c28e7416e4e0a240b54`;
    try{
        const response = await fetch(weatherUrl)
        const data = await response.json();
        console.log(data);
        const {main,name,weather,wind,sys,dt}=data;
        CityName.innerHTML =`${name},${getCountryCode(sys.country)}`;
        dateTime.innerHTML = getDatetime(dt);
    }
    catch(error){
        console.log(error);
        
    }
}
document.body.addEventListener("load",getWeatherData());