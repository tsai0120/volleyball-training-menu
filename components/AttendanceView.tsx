'use client'

import { useState } from 'react'
import { useTrainingData } from '@/hooks/useTrainingData'
import { useAdmin } from '@/contexts/AdminContext'
import { Attendance } from '@/types'
import { Users, CheckCircle, XCircle, Plus, Trash2, Edit2 } from 'lucide-react'

// 场地费：12/29用1400，12/30和12/31用2400
const VENUE_FEES = [1400, 2400, 2400]

export default function AttendanceView() {
  const { attendanceData, updateAttendance } = useTrainingData()
  const { isAdmin } = useAdmin()
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [editingPerson, setEditingPerson] = useState<{ index: number; person: Attendance } | null>(null)
  const [newPerson, setNewPerson] = useState({ grade: '', name: '', days: [false, false, false] })

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

  const handleSavePerson = () => {
    if (editingPerson) {
      const updated = [...attendanceData]
      updated[editingPerson.index] = editingPerson.person
      updateAttendance(updated)
      setEditingPerson(null)
    }
  }

  const handleAddPerson = () => {
    if (newPerson.name && newPerson.grade) {
      updateAttendance([...attendanceData, { ...newPerson }])
      setNewPerson({ grade: '', name: '', days: [false, false, false] })
    }
  }

  const handleDeletePerson = (index: number) => {
    if (confirm('確定要刪除此人員嗎？')) {
      const updated = [...attendanceData]
      updated.splice(index, 1)
      updateAttendance(updated)
    }
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

      {/* Add New Person (Admin Only) */}
      {isAdmin && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            新增人員
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="系級"
              value={newPerson.grade}
              onChange={(e) => setNewPerson({ ...newPerson, grade: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="姓名"
              value={newPerson.name}
              onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            />
            <div className="flex gap-2">
              {newPerson.days.map((day, dayIndex) => (
                <label key={dayIndex} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={day}
                    onChange={(e) => {
                      const newDays = [...newPerson.days]
                      newDays[dayIndex] = e.target.checked
                      setNewPerson({ ...newPerson, days: newDays })
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{days[dayIndex]}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleAddPerson}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              新增
            </button>
          </div>
        </div>
      )}

      {/* Attendance List by Grade */}
      <div className="space-y-6">
        {Object.entries(groupedByGrade).map(([grade, people]) => (
          <div key={grade} className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800 bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-lg inline-block">
              {grade}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {people.map((person, personIndex) => {
                const globalIndex = attendanceData.findIndex(p => p.name === person.name && p.grade === person.grade)
                const isEditing = editingPerson?.index === globalIndex
                
                return (
                  <div
                    key={personIndex}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                  >
                    {isEditing ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingPerson!.person.name}
                          onChange={(e) => setEditingPerson({
                            ...editingPerson!,
                            person: { ...editingPerson!.person, name: e.target.value }
                          })}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                        <div className="flex gap-2">
                          {editingPerson!.person.days.map((day, dayIndex) => (
                            <label key={dayIndex} className="flex items-center gap-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={day}
                                onChange={(e) => {
                                  const newDays = [...editingPerson!.person.days]
                                  newDays[dayIndex] = e.target.checked
                                  setEditingPerson({
                                    ...editingPerson!,
                                    person: { ...editingPerson!.person, days: newDays }
                                  })
                                }}
                                className="w-4 h-4"
                              />
                              <span className="text-xs">{days[dayIndex]}</span>
                            </label>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleSavePerson}
                            className="flex-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                          >
                            儲存
                          </button>
                          <button
                            onClick={() => setEditingPerson(null)}
                            className="flex-1 px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm"
                          >
                            取消
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-semibold text-gray-800">{person.name}</div>
                          {isAdmin && (
                            <div className="flex gap-1">
                              <button
                                onClick={() => setEditingPerson({ index: globalIndex, person: { ...person } })}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeletePerson(globalIndex)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
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
                        {/* 显示每人平分的场地费 */}
                        <div className="text-xs text-gray-600 space-y-1">
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
                      </>
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
