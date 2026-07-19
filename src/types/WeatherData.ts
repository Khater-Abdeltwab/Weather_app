
type CurrentWeather = {
  time:string;
  interval:number;
  temperature:number;
  windspeed:number;
  winddirection:number;
  is_day:number;
  weathercode:number;
}

/*
weather codes mapping:
0: Clear sky
3: Cloudy
67:Rainy
77:Snowy
else: Cloudy
*/ 



type CurrentWeatherUnits = {
  time:string;
  interval:string;
  temperature:string;
  windspeed:string;
  winddirection:string;
  is_day:string;
  weathercode:string;
}

export type WeatherDataAPIResponse = {
  latitude:number;
  longitude:number;
  generationtime_ms:number;
  utc_offset_seconds:number;
  timezone:string;
  timezone_abbreviation:string;
  current_weather:CurrentWeather;
  current_weather_units:CurrentWeatherUnits;
}