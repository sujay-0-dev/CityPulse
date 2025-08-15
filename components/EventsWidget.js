"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export default function EventsWidget({ city, onDataFetch, onEventsLoad }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (city) {
      fetchEvents()
    }
  }, [city])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      // Mock events data
      const eventTypes = ["Concert", "Festival", "Conference", "Sports", "Theater", "Exhibition"]
      const venues = ["City Center", "Convention Hall", "Stadium", "Park", "Museum", "Arena"]

      const mockEvents = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `${eventTypes[Math.floor(Math.random() * eventTypes.length)]} Event ${i + 1}`,
        date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        venue: venues[Math.floor(Math.random() * venues.length)],
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        price: Math.random() > 0.3 ? `$${Math.floor(Math.random() * 100) + 20}` : "Free",
        lat: 40.7128 + (Math.random() - 0.5) * 0.1,
        lng: -74.006 + (Math.random() - 0.5) * 0.1,
      }))

      setTimeout(() => {
        setEvents(mockEvents)
        onEventsLoad && onEventsLoad(mockEvents)
        setLoading(false)
        onDataFetch && onDataFetch(15)
      }, 900)
    } catch (error) {
      console.error("Events fetch error:", error)
      setLoading(false)
    }
  }

  const getEventIcon = (type) => {
    const icons = {
      Concert: "🎵",
      Festival: "🎪",
      Conference: "💼",
      Sports: "⚽",
      Theater: "🎭",
      Exhibition: "🎨",
    }
    return icons[type] || "📅"
  }

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
        {loading && <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>}
      </div>

      {events.length > 0 ? (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="text-lg">{getEventIcon(event.type)}</div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white line-clamp-1">{event.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-white/60">{event.date}</span>
                      <span className="text-xs text-white/40">•</span>
                      <span className="text-xs text-white/60">{event.venue}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs font-medium text-white/80">{event.price}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-white/60 py-8">
          {city ? "Loading events..." : "Select a city to view events"}
        </div>
      )}
    </Card>
  )
}
