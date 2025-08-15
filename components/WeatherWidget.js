"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export default function WeatherWidget({ city, onDataFetch }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (city) {
      fetchWeather()
    }
  }, [city])

  const fetchWeather = async () => {
    setLoading(true)
    try {
      // Mock data for demo - replace with actual API call
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`)
      // const data = await response.json()

      // Mock weather data
      const mockData = {
        temp: Math.floor(Math.random() * 30) + 5,
        condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        icon: "☀️",
      }

      setTimeout(() => {
        setWeather(mockData)
        setLoading(false)
        onDataFetch && onDataFetch(10) // Award points for data fetch
      }, 1000)
    } catch (error) {
      console.error("Weather fetch error:", error)
      setLoading(false)
    }
  }

  const getWeatherIcon = (condition) => {
    const icons = {
      Sunny: "☀️",
      Cloudy: "☁️",
      Rainy: "🌧️",
      "Partly Cloudy": "⛅",
    }
    return icons[condition] || "☀️"
  }

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Weather</h3>
        {loading && <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>}
      </div>

      {weather ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-3xl">{getWeatherIcon(weather.condition)}</div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{weather.temp}°C</div>
              <div className="text-sm text-white/70">{weather.condition}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/20">
            <div>
              <div className="text-xs text-white/60">Humidity</div>
              <div className="text-sm font-medium text-white">{weather.humidity}%</div>
            </div>
            <div>
              <div className="text-xs text-white/60">Wind</div>
              <div className="text-sm font-medium text-white">{weather.windSpeed} km/h</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-white/60 py-8">
          {city ? "Loading weather data..." : "Select a city to view weather"}
        </div>
      )}
    </Card>
  )
}
