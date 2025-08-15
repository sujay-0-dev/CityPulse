"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export default function AirQualityWidget({ city, onDataFetch }) {
  const [airQuality, setAirQuality] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (city) {
      fetchAirQuality()
    }
  }, [city])

  const fetchAirQuality = async () => {
    setLoading(true)
    try {
      // Mock AQI data
      const aqi = Math.floor(Math.random() * 200) + 1
      const mockData = {
        aqi,
        level: getAQILevel(aqi),
        color: getAQIColor(aqi),
        pm25: Math.floor(Math.random() * 50) + 10,
        pm10: Math.floor(Math.random() * 80) + 20,
        o3: Math.floor(Math.random() * 100) + 30,
      }

      setTimeout(() => {
        setAirQuality(mockData)
        setLoading(false)
        onDataFetch && onDataFetch(12)
      }, 800)
    } catch (error) {
      console.error("Air quality fetch error:", error)
      setLoading(false)
    }
  }

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return "Good"
    if (aqi <= 100) return "Moderate"
    if (aqi <= 150) return "Unhealthy for Sensitive"
    if (aqi <= 200) return "Unhealthy"
    return "Very Unhealthy"
  }

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return "#10B981"
    if (aqi <= 100) return "#F59E0B"
    if (aqi <= 150) return "#EF4444"
    if (aqi <= 200) return "#7C2D12"
    return "#4C1D95"
  }

  const getHealthTip = (level) => {
    const tips = {
      Good: "Air quality is satisfactory",
      Moderate: "Acceptable for most people",
      "Unhealthy for Sensitive": "Sensitive groups should limit outdoor activities",
      Unhealthy: "Everyone should limit outdoor activities",
      "Very Unhealthy": "Avoid outdoor activities",
    }
    return tips[level] || "Monitor air quality"
  }

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Air Quality</h3>
        {loading && <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>}
      </div>

      {airQuality ? (
        <div className="space-y-4">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke={airQuality.color}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(airQuality.aqi / 200) * 251.2} 251.2`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{airQuality.aqi}</div>
                  <div className="text-xs text-white/60">AQI</div>
                </div>
              </div>
            </div>
            <div className="text-sm font-medium text-white">{airQuality.level}</div>
            <div className="text-xs text-white/60 mt-1">{getHealthTip(airQuality.level)}</div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/20">
            <div className="text-center">
              <div className="text-xs text-white/60">PM2.5</div>
              <div className="text-sm font-medium text-white">{airQuality.pm25}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-white/60">PM10</div>
              <div className="text-sm font-medium text-white">{airQuality.pm10}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-white/60">O3</div>
              <div className="text-sm font-medium text-white">{airQuality.o3}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-white/60 py-8">
          {city ? "Loading air quality data..." : "Select a city to view air quality"}
        </div>
      )}
    </Card>
  )
}
