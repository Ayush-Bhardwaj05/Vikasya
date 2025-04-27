"use client"

import { useState, useEffect } from "react"
import { TrendingUp, AlertTriangle } from "lucide-react"
import IssueCard from "./components/IssueCard"

interface IssueCategory {
  id: string
  title: string
  emoji: string
  feedbackCount: number
  sentiment: number
}

interface TrendingIssue {
  id: string
  category: string
  location: string
  count: number
}

export default function PublicIssuesPage() {
  const [location, setLocation] = useState("Loading...")
  const [categories, setCategories] = useState<IssueCategory[]>([])
  const [trendingIssues, setTrendingIssues] = useState<TrendingIssue[]>([])

  useEffect(() => {
    // Get user location with better accuracy
    const getLocation = async () => {
      try {
        if (!navigator.geolocation) {
          setLocation("Geolocation Not Supported")
          return
        }

        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            { 
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0
            }
          )
        })

        const { latitude, longitude } = position.coords
        
        // Add proper headers and parameters for Nominatim API
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'PublicIssuesApp/1.0'
            }
          }
        )

        if (!response.ok) throw new Error('Location fetch failed')
        
        const data = await response.json()
        
        // More comprehensive location extraction
        const locationParts = [
          data.address.neighbourhood,
          data.address.suburb,
          data.address.village,
          data.address.town,
          data.address.city_district,
          data.address.city,
          data.address.county,
          data.address.state
        ].filter(Boolean) // Remove undefined values

        setLocation("Mailsandra")
        
      } catch (error) {
        console.error("Location error:", error)
        setLocation("Your Area") // Fallback
      }
    }

    // Load mock data
    const loadData = () => {
      setCategories([
        { id: "1", title: "Public Sanitation", emoji: "🚽", feedbackCount: 24, sentiment: -0.3 },
        { id: "2", title: "Garbage Collection", emoji: "🗑️", feedbackCount: 42, sentiment: -0.7 },
        { id: "3", title: "Road Conditions", emoji: "🛣️", feedbackCount: 38, sentiment: -0.5 },
        { id: "4", title: "Street Lighting", emoji: "💡", feedbackCount: 56, sentiment: -0.8 },
        { id: "5", title: "Water Supply", emoji: "🚰", feedbackCount: 31, sentiment: 0.2 },
        { id: "6", title: "Public Transport", emoji: "🚌", feedbackCount: 47, sentiment: -0.4 },
        { id: "7", title: "Noise Pollution", emoji: "🔊", feedbackCount: 19, sentiment: -0.6 },
        { id: "8", title: "Green Spaces / Parks", emoji: "🌳", feedbackCount: 28, sentiment: 0.7 },
        { id: "9", title: "Public Safety", emoji: "👮", feedbackCount: 15, sentiment: 0.1 },
        { id: "10", title: "Others", emoji: "📢", feedbackCount: 12, sentiment: 0 },
      ])
      
      setTrendingIssues([
        { id: "1", category: "Street Lighting", location: "Sector 45", count: 23 },
        // Add other trending issues...
      ])
    }

    getLocation()
    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0011] to-[#1E0B33] pt-24 px-6 pb-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Public Issues in <span className="text-purple-400">{location}</span>
          </h1>
          <p className="text-lg text-purple-200">
            Report and view community feedback on local public services
          </p>
        </div>

        {/* Trending Issues */}
        {trendingIssues.length > 0 && (
          <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 rounded-xl border border-purple-500/30 p-6 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Trending Issues</h2>
            </div>
            <div className="space-y-3">
              {trendingIssues.map((issue) => (
                <div key={issue.id} className="flex items-center gap-3 p-3 bg-purple-900/30 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <span className="text-sm font-medium text-purple-100">
                    {issue.category} issues reported by {issue.count}+ users
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Issue Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <IssueCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}