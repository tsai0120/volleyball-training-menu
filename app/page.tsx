'use client'

import { useState } from 'react'
import CalendarView from '@/components/CalendarView'
import TimelineView from '@/components/TimelineView'
import AttendanceView from '@/components/AttendanceView'
import { Calendar, Clock, Users } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'timeline' | 'attendance'>('calendar')

  return (
    <div className="max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-8 bg-white rounded-lg shadow-md p-4">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'calendar'
              ? 'bg-blue-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Calendar className="w-5 h-5" />
          訓練時間場地
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'timeline'
              ? 'bg-orange-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Clock className="w-5 h-5" />
          寒訓三天菜單
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'attendance'
              ? 'bg-green-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Users className="w-5 h-5" />
          寒訓三天出席人員
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'timeline' && <TimelineView />}
        {activeTab === 'attendance' && <AttendanceView />}
      </div>
    </div>
  )
}
