import { useEffect, useState } from "react";
import Header from "./components/Header"
import SearchCity from "./components/SearchCity"
import WeatherCard from "./components/WeatherCard"
import type { CityData } from "./types/CityData"

function App() {

  const [cities, setCities] = useState<CityData[]>(() => {
    const saved = localStorage.getItem("weather_cities");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CityData[];
        return parsed.map(city => ({
          ...city,
          updatedAt: new Date(city.updatedAt)
        }));
      } catch (e) {
        console.error("Failed to load cities from localStorage", e);
      }
    }
    return [];
  });

  const handleAddCity = (city: CityData) => {
    setCities((prev) => [...prev, city])
  }
  const handleRemoveCity = (id: number) => {
    setCities((prev) => prev.filter(c => c.id !== id))
  }

  useEffect(() => {
    localStorage.setItem("weather_cities", JSON.stringify(cities));
  }, [cities]);

  const touchCities = () => {
    let citiesCopy = [...cities];
    citiesCopy = citiesCopy.map(city => ({ ...city, updatedAt: new Date() }));
    setCities(citiesCopy);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      touchCities()
    }, 15000);
    return () => clearInterval(interval);
  }, [cities]);

  return (
    <>
      <div className="px-8 py-8 flex flex-col gap-10">
        <Header />
        <SearchCity handleAddCity={handleAddCity} />
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl mx-auto">
          {cities.map(city => (<WeatherCard key={city.id} city={city} handleRemoveCity={handleRemoveCity} />))}
        </div>
      </div>
    </>
  )
}

export default App
