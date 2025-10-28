"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, User } from "lucide-react"
import AppointmentModal from "../../components/AppointmentModel"
import GradientBackground from "../../components/GrandientBackground"

export default function Appointment() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 14)) // September 14, 2025
  const [viewMode, setViewMode] = useState("day")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const timeSlots = [
    { time: "09:00", status: "available" },
    { time: "09:30", status: "booked", name: "John Alan" },
    { time: "10:00", status: "available" },
    { time: "10:30", status: "available" },
    { time: "11:00", status: "available" },
    { time: "11:30", status: "booked", name: "Alex Fierro" },
    { time: "12:00", status: "available" },
    { time: "12:30", status: "available" },
    { time: "13:00", status: "available" },
    { time: "13:30", status: "available" },
    { time: "14:00", status: "unavailable" },
    { time: "14:30", status: "available" },
    { time: "15:00", status: "available" },
    { time: "15:30", status: "available" },
    { time: "16:00", status: "available" },
    { time: "16:30", status: "available" },
    { time: "17:00", status: "available" },
    { time: "17:30", status: "available" },
  ]

  const formatDate = (date) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  const handlePrevDay = () => {
    setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))
  }

  const handleNextDay = () => {
    setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))
  }

  const handleToday = () => {
    setCurrentDate(new Date(2025, 8, 14))
  }

  return (
    <div className="p-8 border-2 border-gray-600 rounded-lg  min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Appointment</h1>
          <p className="text-gray-400">Manage your appointments and availability</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            Block Time
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
          >
            + New Appointment
          </button>
        </div>
      </div>

      {/* Date Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={handlePrevDay} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={handleToday}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Today
          </button>
          <button onClick={handleNextDay} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>

        <div className="flex gap-2">
          {["Day", "Week", "Month"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode.toLowerCase())}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === mode.toLowerCase()
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Date Display */}
      <div className="mb-6">
        <p className="text-gray-400 text-sm">
          <span className="text-white font-semibold">{formatDate(currentDate)}</span>
        </p>
      </div>

      {/* Time Slots */}
      <div className="space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto scroll-smooth">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
              slot.status === "available"
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                : slot.status === "booked"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-800 border-gray-700"
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <span className="text-white font-semibold w-16">{slot.time}</span>
              <span
                className={`${
                  slot.status === "available"
                    ? "text-gray-300"
                    : slot.status === "unavailable"
                      ? "text-red-400"
                      : "text-gray-300"
                }`}
              >
                {slot.status === "available"
                  ? "Available"
                  : slot.status === "unavailable"
                    ? "Not Available"
                    : "Available"}
              </span>
            </div>

            {slot.status === "booked" && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="text-white">{slot.name}</span>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                  Reschedule
                </button>
                <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>

    </div>
  )
}
