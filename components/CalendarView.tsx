'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { calendarEvents } from '@/lib/data'
import { useTrainingData } from '@/hooks/useTrainingData'
import { MapPin, Users, Calendar as CalendarIcon, Clock } from 'lucide-react'

export default function CalendarView() {
  const { trainingDays, attendanceData } = useTrainingData()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const selectedDay = selectedDate
    ? trainingDays.find((day) => day.date === selectedDate)
    : null

  const selectedAttendance = selectedDate
    ? attendanceData.filter((person) => {
        const dayIndex = trainingDays.findIndex((d) => d.date === selectedDate)
        return person.days[dayIndex]
      })
    : []

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
        <CalendarIcon className="w-8 h-8 text-blue-500" />
        訓練時間場地
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {calendarEvents.map((event) => {
          const date = parseISO(event.date)
          const isSelected = selectedDate === event.date

          return (
            <div
              key={event.date}
              onClick={() => setSelectedDate(event.date)}
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-500">
                  第 {event.week} 週
                </span>
                {event.isTraining && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    寒訓
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {format(date, 'M月d日', { locale: zhTW })}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {format(date, 'EEEE', { locale: zhTW })}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-600">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold">{event.afternoon}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">13:00 - 17:00</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {selectedDay && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl border-2 border-blue-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-blue-500" />
            {format(parseISO(selectedDay.date), 'yyyy年M月d日', { locale: zhTW })}
            訓練詳情
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 出席狀況 */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
                <Users className="w-5 h-5 text-green-500" />
                出席狀況
              </h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 mb-2">
                  共 {selectedAttendance.length} 人
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {selectedAttendance.map((person, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {person.name}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {person.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 訓練菜單預覽 - 可滾動 */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h4 className="text-lg font-semibold mb-3 text-gray-700">
                訓練項目
              </h4>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {selectedDay.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 bg-gray-50 rounded text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-semibold">{item.title}</div>
                    {item.startTime && (
                      <div className="text-xs text-gray-500 mt-1">
                        {item.startTime} ({item.duration}分鐘)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
