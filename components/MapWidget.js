"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

export default function MapWidget({ city, events, onDataFetch }) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (city && !map.current) {
      initializeMap()
    } else if (city && map.current) {
      updateMapLocation()
    }
  }, [city])

  const initializeMap = async () => {
    setLoading(true)
    try {
      // Mock map initialization - replace with actual Mapbox GL JS
      // const mapboxgl = await import('mapbox-gl')
      // mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'

      // For demo purposes, we'll create a mock map visualization
      setTimeout(() => {
        setMapLoaded(true)
        setLoading(false)
        onDataFetch && onDataFetch(20)
      }, 1500)
    } catch (error) {
      console.error("Map initialization error:", error)
      setLoading(false)
    }
  }

  const updateMapLocation = () => {
    setLoading(true)
    // Mock location update
    setTimeout(() => {
      setLoading(false)
      onDataFetch && onDataFetch(5)
    }, 800)
  }

  const mockMapData = {
    trafficHotspots: [
      { id: 1, lat: 40.7128, lng: -74.006, intensity: "high" },
      { id: 2, lat: 40.7589, lng: -73.9851, intensity: "medium" },
      { id: 3, lat: 40.7505, lng: -73.9934, intensity: "low" },
    ],
    pollutionZones: [
      { id: 1, lat: 40.7282, lng: -74.0776, level: "moderate" },
      { id: 2, lat: 40.7614, lng: -73.9776, level: "high" },
    ],
  }

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group col-span-full lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Interactive City Map</h3>
        {loading && <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>}
      </div>

      <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/50 to-purple-900/50">
        {mapLoaded ? (
          <div className="w-full h-full relative">
            {/* Mock map visualization */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 to-green-800/30 rounded-lg">
              {/* Mock city grid */}
              <div className="absolute inset-4 grid grid-cols-8 grid-rows-6 gap-1">
                {Array.from({ length: 48 }, (_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      Math.random() > 0.7
                        ? "bg-red-400/60"
                        : Math.random() > 0.5
                          ? "bg-yellow-400/40"
                          : "bg-green-400/30"
                    }`}
                  />
                ))}
              </div>

              {/* Mock event pins */}
              {events.slice(0, 3).map((event, index) => (
                <div
                  key={event.id}
                  className="absolute w-3 h-3 bg-white rounded-full border-2 border-blue-400 animate-pulse"
                  style={{
                    left: `${20 + index * 25}%`,
                    top: `${30 + index * 15}%`,
                  }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {event.name}
                  </div>
                </div>
              ))}

              {/* Mock traffic indicators */}
              <div className="absolute bottom-4 left-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-white/80">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Light Traffic</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-white/80">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span>Moderate Traffic</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-white/80">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span>Heavy Traffic</span>
                </div>
              </div>

              {/* Mock pollution overlay */}
              <div className="absolute top-4 right-4 bg-black/60 rounded-lg p-3">
                <div className="text-xs text-white/80 mb-2">Air Quality Zones</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white/70">Good</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white/70">Moderate</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-white/70">Unhealthy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
              <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                +
              </button>
              <button className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                -
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-white/60">
            {city ? "Loading interactive map..." : "Select a city to view map"}
          </div>
        )}
      </div>

      {mapLoaded && (
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="text-center">
            <div className="text-white/60">Event Pins</div>
            <div className="text-white font-medium">{events.length}</div>
          </div>
          <div className="text-center">
            <div className="text-white/60">Traffic Zones</div>
            <div className="text-white font-medium">{mockMapData.trafficHotspots.length}</div>
          </div>
          <div className="text-center">
            <div className="text-white/60">Pollution Areas</div>
            <div className="text-white font-medium">{mockMapData.pollutionZones.length}</div>
          </div>
          <div className="text-center">
            <div className="text-white/60">Data Points</div>
            <div className="text-white font-medium">48</div>
          </div>
        </div>
      )}
    </Card>
  )
}
