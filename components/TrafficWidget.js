"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export default function TrafficWidget({ city, onDataFetch }) {
  const [traffic, setTraffic] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (city) {
      fetchTraffic()
    }
  }, [city])

  const fetchTraffic = async () => {
    setLoading(true)
    try {
      // Mock traffic data
      const conditions = ["Light", "Moderate", "Heavy", "Severe"]
      const colors = ["#10B981", "#F59E0B", "#EF4444", "#7C2D12"]
      const randomIndex = Math.floor(Math.random() * conditions.length)

      const mockData = {
        condition: conditions[randomIndex],
        color: colors[randomIndex],
        incidents: Math.floor(Math.random() * 15),
        avgSpeed: Math.floor(Math.random() * 40) + 20,
        congestionLevel: Math.floor(Math.random() * 100),
      }

      setTimeout(() => {
        setTraffic(mockData)
        setLoading(false)
        onDataFetch && onDataFetch(8)
      }, 1200)
    } catch (error) {
      console.error("Traffic fetch error:", error)
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Traffic Status</h3>
        {loading && <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>}
      </div>

      {traffic ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: traffic.color }}></div>
              <span className="text-white font-medium">{traffic.condition}</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60">Avg Speed</div>
              <div className="text-lg font-bold text-white">{traffic.avgSpeed} km/h</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Congestion</span>
              <span className="text-white">{traffic.congestionLevel}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${traffic.congestionLevel}%`,
                  backgroundColor: traffic.color,
                }}
              ></div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/20">
            <div className="text-xs text-white/60">Active Incidents</div>
            <div className="text-lg font-bold text-white">{traffic.incidents}</div>
          </div>
        </div>
      ) : (
        <div className="text-center text-white/60 py-8">
          {city ? "Loading traffic data..." : "Select a city to view traffic"}
        </div>
      )}
    </Card>
  )
}
