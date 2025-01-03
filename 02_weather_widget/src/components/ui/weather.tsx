"use client";

import { useState, FormEvent } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

interface WeatherData {
  temperature: number;
  description: string;
  location: string;
}

export default function WeatherWidget() {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsLoading(true);
    // setError(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}`
      );

      const data = await response.json();
      setWeather({
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        location: data.location.name,
      });

      // const trimmedLocation = location.trim();
      // if (trimmedLocation === "") {
      //   setError("Please Enter a valid location");
      //   return;
      // }
      // const response = await fetch(
      //   `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${trimmedLocation}`
      // );

      // if (!response.ok) {
      //   throw new Error("City not found");
      // }
      // const data = await response.json();
      // console.log("Weather data: ", data);

      // console.log("Search Location: ", location);
    } catch (err) {
      console.error(err);
      //   setError("City not found. Please try again");
      // } finally {
      //   setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSearch} className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Enter a city name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>
      {weather && (
        <div>
          <p>Temperature: {weather.temperature}</p>
          <p>Description: {weather.description}</p>
          <p>Location: {weather.location}</p>
        </div>
      )}
      {/* {error && <p className="">{error}</p>} */}
    </div>
  );
}
