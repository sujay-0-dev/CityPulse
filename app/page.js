"use client"

import { useAuth, AuthProvider } from "../hooks/useAuth"
import AuthForm from "../components/AuthForm"
import Dashboard from "../components/Dashboard"

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading CityPulse...</p>
          <p className="text-white/60 text-sm mt-2">Preparing your urban data dashboard</p>
        </div>
      </div>
    )
  }

  return user ? <Dashboard /> : <AuthForm />
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
