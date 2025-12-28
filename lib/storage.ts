import { TrainingDay, Attendance } from '@/types'

const STORAGE_KEYS = {
  TRAINING_DAYS: 'volleyball_training_days',
  ATTENDANCE: 'volleyball_attendance',
}

// 保存训练数据
export function saveTrainingDays(days: TrainingDay[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.TRAINING_DAYS, JSON.stringify(days))
  }
}

// 加载训练数据
export function loadTrainingDays(): TrainingDay[] | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.TRAINING_DAYS)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse training days:', e)
      }
    }
  }
  return null
}

// 保存出席数据
export function saveAttendance(attendance: Attendance[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance))
  }
}

// 加载出席数据
export function loadAttendance(): Attendance[] | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error('Failed to parse attendance:', e)
      }
    }
  }
  return null
}

