"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

const useStore = create(
  persist(
    (set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,

      // City and data state
      selectedCity: null,
      cityData: {
        weather: null,
        traffic: null,
        airQuality: null,
        events: [],
      },

      // UI state
      isDarkMode: true,
      isLoading: false,

      // Gamification state
      points: 0,
      level: 1,
      badges: [],
      citiesExplored: [],

      // Favorite cities
      favoriteCities: [],

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),

      setSelectedCity: (city) => {
        const { citiesExplored, points } = get()
        const isNewCity = !citiesExplored.find((c) => c.name === city.name)

        set({
          selectedCity: city,
          citiesExplored: isNewCity
            ? [...citiesExplored, { ...city, exploredAt: new Date().toISOString() }]
            : citiesExplored,
          points: isNewCity ? points + 25 : points,
        })
      },

      setCityData: (dataType, data) =>
        set((state) => ({
          cityData: {
            ...state.cityData,
            [dataType]: data,
          },
        })),

      addPoints: (pointsToAdd, reason) =>
        set((state) => {
          const newPoints = state.points + pointsToAdd
          const newLevel = Math.floor(newPoints / 100) + 1

          return {
            points: newPoints,
            level: newLevel > state.level ? newLevel : state.level,
          }
        }),

      addBadge: (badge) =>
        set((state) => ({
          badges: state.badges.find((b) => b.id === badge.id)
            ? state.badges
            : [...state.badges, { ...badge, earnedAt: new Date().toISOString() }],
        })),

      toggleFavoriteCity: (city) =>
        set((state) => {
          const isFavorite = state.favoriteCities.find((c) => c.name === city.name)
          return {
            favoriteCities: isFavorite
              ? state.favoriteCities.filter((c) => c.name !== city.name)
              : [...state.favoriteCities, city],
          }
        }),

      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      setLoading: (isLoading) => set({ isLoading }),

      // Reset all data
      resetData: () =>
        set({
          selectedCity: null,
          cityData: { weather: null, traffic: null, airQuality: null, events: [] },
          points: 0,
          level: 1,
          badges: [],
          citiesExplored: [],
          favoriteCities: [],
        }),
    }),
    {
      name: "citypulse-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isDarkMode: state.isDarkMode,
        points: state.points,
        level: state.level,
        badges: state.badges,
        citiesExplored: state.citiesExplored,
        favoriteCities: state.favoriteCities,
      }),
    },
  ),
)

export default useStore
