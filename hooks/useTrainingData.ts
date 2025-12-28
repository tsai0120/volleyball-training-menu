'use client'

import { useState, useEffect } from 'react'
import { TrainingDay, Attendance } from '@/types'
import { trainingDays as initialTrainingDays, attendanceData as initialAttendanceData } from '@/lib/data'
import { saveTrainingDays, loadTrainingDays, saveAttendance, loadAttendance } from '@/lib/storage'

export function useTrainingData() {
  const [trainingDays, setTrainingDays] = useState<TrainingDay[]>(initialTrainingDays)
  const [attendanceData, setAttendanceData] = useState<Attendance[]>(initialAttendanceData)

  // 加载保存的数据（如果有）
  useEffect(() => {
    const savedDays = loadTrainingDays()
    if (savedDays) {
      setTrainingDays(savedDays)
    }

    const savedAttendance = loadAttendance()
    if (savedAttendance) {
      setAttendanceData(savedAttendance)
    }
  }, [])

  // 更新训练数据（保存到 localStorage，但主要数据来源是 lib/data.ts）
  const updateTrainingDays = (days: TrainingDay[]) => {
    setTrainingDays(days)
    saveTrainingDays(days)
  }

  // 更新出席数据（保存到 localStorage，但主要数据来源是 lib/data.ts）
  const updateAttendance = (attendance: Attendance[]) => {
    setAttendanceData(attendance)
    saveAttendance(attendance)
  }

  return {
    trainingDays,
    attendanceData,
    updateTrainingDays,
    updateAttendance,
  }
}
