"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export default function GamificationPanel({ points, level, onLevelUp }) {
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [badges, setBadges] = useState([])

  const pointsToNextLevel = (level + 1) * 100
  const currentLevelPoints = level * 100
  const progressPercentage = ((points - currentLevelPoints) / (pointsToNextLevel - currentLevelPoints)) * 100

  useEffect(() => {
    checkForNewBadges()
  }, [points, level])

  const checkForNewBadges = () => {
    const newBadges = []

    if (points >= 100 && !badges.find((b) => b.id === "explorer")) {
      newBadges.push({ id: "explorer", name: "City Explorer", icon: "🗺️", description: "Explored your first city" })
    }
    if (points >= 500 && !badges.find((b) => b.id === "data_hunter")) {
      newBadges.push({ id: "data_hunter", name: "Data Hunter", icon: "📊", description: "Collected 500 data points" })
    }
    if (level >= 3 && !badges.find((b) => b.id === "level_master")) {
      newBadges.push({ id: "level_master", name: "Level Master", icon: "⭐", description: "Reached level 3" })
    }
    if (points >= 1000 && !badges.find((b) => b.id === "urban_analyst")) {
      newBadges.push({ id: "urban_analyst", name: "Urban Analyst", icon: "🏙️", description: "Master of city data" })
    }

    if (newBadges.length > 0) {
      setBadges((prev) => [...prev, ...newBadges])
    }
  }

  const achievements = [
    { name: "Weather Watcher", progress: Math.min((points / 50) * 100, 100), target: 50 },
    { name: "Traffic Expert", progress: Math.min((points / 100) * 100, 100), target: 100 },
    { name: "Air Quality Guardian", progress: Math.min((points / 150) * 100, 100), target: 150 },
    { name: "Event Discoverer", progress: Math.min((points / 200) * 100, 100), target: 200 },
  ]

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="space-y-6">
        {/* Level Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="text-2xl">🏆</div>
            <div>
              <div className="text-lg font-bold text-white">Level {level}</div>
              <div className="text-sm text-white/60">City Insights Explorer</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-white/80">
              <span>{points} points</span>
              <span>{pointsToNextLevel} to next level</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                style={{ width: `${Math.max(progressPercentage, 5)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Badges */}
        {badges.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-white mb-3">Recent Badges</h4>
            <div className="grid grid-cols-2 gap-2">
              {badges.slice(-4).map((badge) => (
                <div
                  key={badge.id}
                  className="p-2 bg-white/5 rounded-lg border border-white/10 text-center hover:bg-white/10 transition-colors"
                >
                  <div className="text-lg mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium text-white">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Progress */}
        <div>
          <h4 className="text-sm font-medium text-white mb-3">Achievements</h4>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-xs text-white/80">
                  <span>{achievement.name}</span>
                  <span>{Math.floor(achievement.progress)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{Math.floor(points / 10)}</div>
            <div className="text-xs text-white/60">Cities Explored</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{badges.length}</div>
            <div className="text-xs text-white/60">Badges Earned</div>
          </div>
        </div>
      </div>

      {/* Level Up Animation */}
      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-8 rounded-2xl text-center animate-bounce">
            <div className="text-4xl mb-4">🎉</div>
            <div className="text-2xl font-bold text-white mb-2">Level Up!</div>
            <div className="text-white/80">You reached Level {level}</div>
            <button
              onClick={() => setShowLevelUp(false)}
              className="mt-4 px-6 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}
