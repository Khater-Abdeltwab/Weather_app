import { useState, type ChangeEvent } from "react"
import type { CityData, CityDataAPIResponse } from "../types/CityData";

type SearchCityProps = {
    handleAddCity: (city: CityData) => void;
}
function SearchCity({ handleAddCity }: SearchCityProps) {
    const [query, setQuery] = useState("");
    const [results, setResult] = useState<CityData[]>([]);
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        setQuery(newQuery);
        if (e.target.value.length <= 3) {
            setResult([]);
            return;
        }
        const fetchCities = async () => {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${newQuery}`);
            const data: CityDataAPIResponse = await response.json();
            setResult(data.results ?? []);
        }

        fetchCities()
    }

    const handleAddCityClick = (city: CityData) => {
        setQuery("");
        setResult([]);
        handleAddCity({...city, updatedAt: new Date()});
    }

    return (
        <div className="relative flex flex-col w-full max-w-xl mx-auto">
            <div className="flex justify-between items-center gap-4 w-full">
                <input
                    
                    value={query}
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search City..."
                    className="border-2 border-gray-200 focus:border-blue-400 rounded-xl px-4 py-3 outline-none text-lg w-full transition-all duration-300 shadow-sm"
                />
            </div>
            {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50 flex flex-col gap-1 border border-gray-100 rounded-xl p-2 bg-white/95 backdrop-blur-md shadow-xl max-h-60 overflow-y-auto transition-all duration-300">
                    {results.map(result => (
                        <div
                            
                            onClick={() => handleAddCityClick(result)}
                            key={result.id}
                            className="flex justify-start items-center gap-2 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-lg cursor-pointer transition-colors duration-150 text-gray-700 font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-map-pin-icon lucide-map-pin">
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                            <circle cx="12" cy="10" r="3"/></svg>
                            {result.name}, {result.country}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchCity 