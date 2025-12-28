export type TrainingCategory = 'warmup' | 'practice' | 'fitness';

export interface TrainingItem {
  id: string;
  title: string;
  duration: number; // 分钟
  category: TrainingCategory;
  groupSize?: number; // 几人一组
  requirements?: string; // 要求（如：要接几颗好球）
  rounds?: number; // 几趟
  description?: string;
  imageUrl?: string;
  groupList?: string[][]; // 分组名单
  startTime?: string; // 时间轴上的开始时间 (HH:mm)
  customType?: 'rest' | 'meal' | 'setup' | 'cleanup'; // 自定义类型
}

export interface TrainingDay {
  date: string; // YYYY-MM-DD
  items: TrainingItem[];
}

export interface Attendance {
  grade: string; // 系级
  name: string;
  days: boolean[]; // 三天出席情况 [day1, day2, day3]
}

export interface CalendarEvent {
  date: string;
  week: number;
  dayOfWeek?: string;
  morning?: string; // 前
  afternoon?: string; // 后
  isExam?: boolean;
  isTraining?: boolean;
}

