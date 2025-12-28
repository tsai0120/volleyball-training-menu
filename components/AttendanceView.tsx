'use client'

import { useState } from 'react'
import { useTrainingData } from '@/hooks/useTrainingData'
import { Attendance } from '@/types'
import { Users, CheckCircle, XCircle } from 'lucide-react'

// 场地费：12/29用1400，12/30和12/31用2400
const VENUE_FEES = [1400, 2400, 2400]

export default function AttendanceView() {
  const { attendanceData } = useTrainingData()
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const days = ['12/29', '12/30', '12/31']

  // 按系级分组
  const groupedByGrade = attendanceData.reduce((acc, person) => {
    if (!acc[person.grade]) {
      acc[person.grade] = []
    }
    acc[person.grade].push(person)
    return acc
  }, {} as Record<string, Attendance[]>)

  const getDayCount = (dayIndex: number) => {
    return attendanceData.filter((p) => p.days[dayIndex]).length
  }

  // 计算每人平分的场地费
  const getVenueFeePerPerson = (dayIndex: number) => {
    const count = getDayCount(dayIndex)
    if (count === 0) return 0
    return Math.round((VENUE_FEES[dayIndex] / count) * 100) / 100
  }

  // 计算每人总费用（三天加总）
  const getTotalFeeForPerson = (person: Attendance) => {
    let total = 0
    person.days.forEach((attended, dayIndex) => {
      if (attended) {
        total += getVenueFeePerPerson(dayIndex)
      }
    })
    return Math.round(total * 100) / 100
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
        <Users className="w-8 h-8 text-green-500" />
        寒訓三天出席人員
      </h2>

      {/* Day Stats with Venue Fee */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {days.map((day, index) => {
          const count = getDayCount(index)
          const feePerPerson = getVenueFeePerPerson(index)
          
          return (
            <div
              key={index}
              onClick={() => setSelectedDay(selectedDay === index ? null : index)}
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                selectedDay === index
                  ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
              }`}
            >
              <div className="text-lg font-semibold text-gray-600 mb-2">{day}</div>
              <div className="text-3xl font-bold text-green-600 flex items-center gap-2 mb-2">
                <Users className="w-8 h-8" />
                {count} 人
              </div>
              <div className="text-sm text-gray-600">
                <div>場地費：${VENUE_FEES[index].toLocaleString()}</div>
                <div className="font-semibold text-blue-600 mt-1">
                  每人：${feePerPerson.toLocaleString()}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Attendance List by Grade */}
      <div className="space-y-6">
        {Object.entries(groupedByGrade).map(([grade, people]) => (
          <div key={grade} className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800 bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-lg inline-block">
              {grade}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {people.map((person, personIndex) => {
                const totalFee = getTotalFeeForPerson(person)
                
                return (
                  <div
                    key={personIndex}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="font-semibold text-gray-800 mb-3">{person.name}</div>
                    <div className="flex gap-2 mb-3">
                      {person.days.map((attended, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`flex-1 p-2 rounded text-center text-xs font-semibold ${
                            selectedDay === null || selectedDay === dayIndex
                              ? attended
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-400'
                              : 'bg-gray-50 text-gray-300'
                          }`}
                        >
                          {attended ? (
                            <CheckCircle className="w-4 h-4 mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 mx-auto" />
                          )}
                          <div className="mt-1">{days[dayIndex]}</div>
                        </div>
                      ))}
                    </div>
                    {/* 显示每人每天的场地费 */}
                    <div className="text-xs text-gray-600 space-y-1 mb-3">
                      {person.days.map((attended, dayIndex) => {
                        if (!attended) return null
                        const fee = getVenueFeePerPerson(dayIndex)
                        return (
                          <div key={dayIndex} className="flex justify-between">
                            <span>{days[dayIndex]}：</span>
                            <span className="font-semibold text-blue-600">${fee.toLocaleString()}</span>
                          </div>
                        )
                      })}
                    </div>
                    {/* 总费用 */}
                    {totalFee > 0 && (
                      <div className="pt-3 border-t border-gray-300">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700">總計：</span>
                          <span className="text-lg font-bold text-green-600">${totalFee.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
        <h3 className="text-xl font-bold mb-4 text-gray-800">出席統計</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {days.map((day, index) => {
            const count = getDayCount(index)
            const feePerPerson = getVenueFeePerPerson(index)
            
            return (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">{day}</div>
                <div className="text-2xl font-bold text-green-600">
                  {count} / {attendanceData.length} 人
                </div>
                <div className="text-xs text-gray-500 mt-1 mb-2">
                  {Math.round((count / attendanceData.length) * 100)}% 出席率
                </div>
                <div className="text-sm text-blue-600 font-semibold">
                  每人場地費：${feePerPerson.toLocaleString()}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
