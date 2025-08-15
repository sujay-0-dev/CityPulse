"use client"

import { useState, useEffect } from "react"

export default function useGamification() {
  const [points, setPoints] = useState(0)
  const [level, setLevel] = useState(1)
  const [totalCitiesExplored, setTotalCitiesExplored] = useState(0)
  const [achievements, setAchievements] = useState([])

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("citypulse-progress")
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setPoints(progress.points || 0)
      setLevel(progress.level || 1)
      setTotalCitiesExplored(progress.totalCitiesExplored || 0)
      setAchievements(progress.achievements || [])
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    const progress = {
      points,
      level,
      totalCitiesExplored,
      achievements,
    }
    localStorage.setItem("citypulse-progress", JSON.stringify(progress))
  }, [points, level, totalCitiesExplored, achievements])

  // Check for level up
  useEffect(() => {
    const requiredPoints = level * 100
    if (points >= requiredPoints && points > 0) {
      setLevel((prev) => prev + 1)
    }
  }, [points, level])

  const addPoints = (pointsToAdd, reason = "") => {
    setPoints((prev) => prev + pointsToAdd)

    // Show point notification
    if (typeof window !== "undefined") {
      const notification = document.createElement("div")
      notification.className = "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50 animate-bounce"
      notification.textContent = `+${pointsToAdd} points${reason ? ` - ${reason}` : ""}`
      document.body.appendChild(notification)

      setTimeout(() => {
        notification.remove()
      }, 2000)
    }
  }

  const exploreNewCity = (cityName) => {
    setTotalCitiesExplored((prev) => prev + 1)
    addPoints(25, `Explored ${cityName}`)
  }

  const unlockAchievement = (achievementId, name, description) => {
    if (!achievements.find((a) => a.id === achievementId)) {
      const newAchievement = {
        id: achievementId,
        name,
        description,
        unlockedAt: new Date().toISOString(),
      }
      setAchievements((prev) => [...prev, newAchievement])
      addPoints(50, `Achievement: ${name}`)
    }
  }

  const getPointsForAction = (action) => {
    const pointValues = {
      weather: 10,
      traffic: 8,
      airQuality: 12,
      events: 15,
      map: 20,
      citySearch: 25,
    }
    return pointValues[action] || 5
  }

  return {
    points,
    level,
    totalCitiesExplored,
    achievements,
    addPoints,
    exploreNewCity,
    unlockAchievement,
    getPointsForAction,
  }
}
