"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import useStore from "@/store/useStore"

export default function CitySearch() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const { selectedCity, setSelectedCity, favoriteCities, addPoints } = useStore()

  // Mock city data - replace with actual API
  const mockCities = [
    { name: "New York", country: "USA", lat: 40.7128, lng: -74.006, population: "8.4M" },
    { name: "London", country: "UK", lat: 51.5074, lng: -0.1278, population: "9.0M" },
    { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503, population: "14.0M" },
    { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522, population: "2.2M" },
    { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, population: "5.3M" },
    { name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832, population: "2.9M" },
    { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405, population: "3.7M" },
    { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198, population: "5.9M" },
    { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708, population: "3.4M" },
    { name: "Mumbai", country: "India", lat: 19.076, lng: 72.8777, population: "20.4M" },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true)
      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = mockCities.filter(
          (city) =>
            city.name.toLowerCase().includes(query.toLowerCase()) ||
            city.country.toLowerCase().includes(query.toLowerCase()),
        )
        setSuggestions(filtered.slice(0, 6))
        setIsOpen(true)
        setLoading(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query])

  const handleCitySelect = (city) => {
    setSelectedCity(city)
    setQuery(city.name)
    setIsOpen(false)
    addPoints(25, `Searched for ${city.name}`)

    // Show selection feedback
    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleCitySelect(suggestions[0])
    } else if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🔍</div>
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => query && setIsOpen(true)}
              placeholder="Search for a city..."
              className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none text-lg"
            />
            {selectedCity && (
              <div className="text-sm text-white/70 mt-1">
                Currently viewing: {selectedCity.name}, {selectedCity.country}
              </div>
            )}
          </div>
          {loading && <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>}
        </div>
      </Card>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-2 bg-white/10 backdrop-blur-md border-white/20 z-50 max-h-64 overflow-y-auto">
          {suggestions.map((city, index) => (
            <div
              key={`${city.name}-${city.country}`}
              onClick={() => handleCitySelect(city)}
              className="p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{city.name}</div>
                  <div className="text-white/60 text-sm">{city.country}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/60 text-xs">Population</div>
                  <div className="text-white text-sm">{city.population}</div>
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Favorite Cities */}
      {favoriteCities.length > 0 && !isOpen && (
        <Card className="mt-4 p-4 bg-white/5 backdrop-blur-md border-white/10">
          <div className="text-sm text-white/80 mb-3">Favorite Cities</div>
          <div className="flex flex-wrap gap-2">
            {favoriteCities.slice(0, 4).map((city) => (
              <button
                key={`fav-${city.name}`}
                onClick={() => handleCitySelect(city)}
                className="px-3 py-1 bg-white/10 rounded-full text-xs text-white hover:bg-white/20 transition-colors"
              >
                {city.name}
              </button>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
