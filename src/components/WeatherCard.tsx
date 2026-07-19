import { useEffect, useState } from "react";
import type { CityData } from "../types/CityData";
import type { WeatherDataAPIResponse } from "../types/WeatherData";

type props = {
    city: CityData
    handleRemoveCity: (id: number) => void
}

const getWeatherCode = (code: number) => {
    switch (code) {
        case 0:
            return "Clear sky";
        case 1:
            return "Mainly clear";
        case 2:
            return "Partly cloudy";
        case 3:
            return "Cloudy";
        case 4:
            return "Overcast";
        case 5:
            return "Foggy";
        case 6:
            return "Light Rain";
        case 7:
            return "Moderate Rain";
        case 8:
            return "Heavy Rain";
        case 9:
            return "Light Snow";
        case 10:
            return "Moderate Snow";
        case 11:
            return "Heavy Snow";
        case 61:
            return "S";
        case 67:
            return "Rainy";
        case 77:
            return "Snowy";
        default:
            return "Cloudy";

    }
}

const getWeatherCodeIcon = (code: number) => {
    switch (code) {
        case 0:
            return "☀️";
        case 1:
            return "🌤️";
        case 2:
            return "⛅";
        case 3:
            return "☁️";
        case 4:
            return "🌫️";
        case 5:
            return "🌫️";
        case 6:
            return "🌧️";
        case 7:
            return "🌧️";
        case 8:
            return "🌧️";
        case 9:
            return "🌨️";
        case 10:
            return "🌨️";
        case 11:
            return "🌨️";
        case 61:
            return "🌧️";
        case 67:
            return "🌧️";
        case 77:
            return "🌨️";
        default:
            return "☁️";

    }
}

function WeatherCard({ city, handleRemoveCity }: props) {
    const [weather, setWeather] = useState<WeatherDataAPIResponse | null>(null);
    const fetchWeather = async () => {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`);
        const data: WeatherDataAPIResponse = await response.json();
        console.log(`data for ${city.name}: `, data);
        setWeather(data);
    }
    useEffect(() => {
        fetchWeather();
    }, [city])

    return (
        <div className="flex flex-col gap-2 border border-gray-200 shadow-sm backdrop-blur-lg rounded-2xl p-4 w-80 hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">{city.name},{city.country}</h1>
            <div
                onClick={() => handleRemoveCity(city.id)}
                className="text-gray-600 hover:text-red-600 flex items-center justify-center cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2-icon lucide-trash-2">
                    <path d="M10 11v6"/>
                    <path d="M14 11v6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                    <path d="M3 6h18"/>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
            </div>
            </div>
            {weather?.current_weather ? (
                <>
                    <p className="text-6xl font-bold mb-4">{Math.round(weather.current_weather.temperature)}°C</p>
                    <p>{getWeatherCode(weather.current_weather.weathercode)} {getWeatherCodeIcon(weather.current_weather.weathercode)}</p>
                    <p>Wind: {Math.round(weather.current_weather.windspeed)} km/h</p>
                    <p>Wind Direction: {weather.current_weather.winddirection}°</p>
                </>
            ) : (
                <div className="py-6 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Loading weather...</p>
                </div>
            )}
            <p className="text-xs text-gray-400 mt-4">Last Updated: {city.updatedAt.toLocaleString()}</p>
        </div>
    )
}

export default WeatherCard;