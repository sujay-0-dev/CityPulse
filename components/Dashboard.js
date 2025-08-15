"use client"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import useStore from "../store/useStore"
import CitySearch from "./CitySearch"
import WeatherWidget from "./WeatherWidget"
import TrafficWidget from "./TrafficWidget"
import AirQualityWidget from "./AirQualityWidget"
import EventsWidget from "./EventsWidget"
import MapWidget from "./MapWidget"
import GamificationPanel from "./GamificationPanel"
import useGamification from "../hooks/useGamification"
import { LogOut, Sun, Moon, Activity } from "lucide-react"

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const { selectedCity, isDarkMode, toggleDarkMode } = useStore()
  const { points, level, addPoints, exploreNewCity } = useGamification()
  const [events, setEvents] = useState([])

  const handleSignOut = async () => {
    await signOut()
  }

  const handleDataFetch = (pointsToAdd, reason) => {
    addPoints(pointsToAdd, reason)
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      {/* Header */}
      <header
        className={`backdrop-blur-xl border-b transition-all duration-300 ${
          isDarkMode ? "bg-gray-900/50 border-gray-700/50" : "bg-white/50 border-gray-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>CityPulse</h1>
            </div>

            {/* User controls */}
            <div className="flex items-center space-x-4">
              {/* Points display */}
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  isDarkMode ? "bg-gray-800/50" : "bg-white/50"
                }`}
              >
                <div className="text-lg">🏆</div>
                <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Level {level}</span>
                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{points} pts</span>
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/50 text-yellow-400 hover:bg-gray-700/50"
                    : "bg-white/50 text-gray-600 hover:bg-white/70"
                }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* User menu */}
              <div className="flex items-center space-x-3">
                <div className={`text-right ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <p className="text-sm font-medium">{user?.email}</p>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Urban Explorer</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isDarkMode
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      : "bg-red-50 text-red-600 hover:bg-red-100"
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* City Search */}
        <div className="mb-8">
          <CitySearch />
        </div>

        {/* Current city header */}
        {selectedCity && (
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              {selectedCity.name}
            </h2>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {selectedCity.country} • Population: {selectedCity.population}
            </p>
          </div>
        )}

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Left column - Data widgets */}
          <div className="lg:col-span-3 space-y-6">
            {/* Data widgets row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <WeatherWidget city={selectedCity?.name} onDataFetch={handleDataFetch} />
              <TrafficWidget city={selectedCity?.name} onDataFetch={handleDataFetch} />
              <AirQualityWidget city={selectedCity?.name} onDataFetch={handleDataFetch} />
              <EventsWidget city={selectedCity?.name} onDataFetch={handleDataFetch} onEventsLoad={setEvents} />
            </div>

            {/* Map widget */}
            <MapWidget city={selectedCity} events={events} onDataFetch={handleDataFetch} />
          </div>

          {/* Right column - Gamification panel */}
          <div className="lg:col-span-1">
            <GamificationPanel points={points} level={level} />
          </div>
        </div>
      </main>
    </div>
  )
}
