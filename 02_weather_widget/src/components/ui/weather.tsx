"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WeatherWidget() {
  const [location, setLocation] = useState<string>("");
  return (
    <div className="flex items-center justify-center h-screen">
      <form action="">
        <Input
          type="text"
          placeholder="Enter a city name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <Button type="submit">Search</Button>
      </form>
    </div>
  );
}
