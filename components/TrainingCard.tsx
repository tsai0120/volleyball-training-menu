'use client'

import { TrainingItem } from '@/types'
import { Clock, Users, Target } from 'lucide-react'

interface TrainingCardProps {
  item: TrainingItem
  onClick: () => void
  isSelected?: boolean
  showTime?: boolean
}

export default function TrainingCard({ item, onClick, isSelected, showTime = true }: TrainingCardProps) {
  const categoryColors = {
    warmup: 'bg-yellow-50 border-yellow-300 hover:border-yellow-400',
    practice: 'bg-blue-50 border-blue-300 hover:border-blue-400',
    fitness: 'bg-red-50 border-red-300 hover:border-red-400',
  }

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
        categoryColors[item.category]
      } ${isSelected ? 'ring-4 ring-blue-400 scale-105' : 'hover:shadow-lg'}`}
    >
      <h4 className="font-bold text-lg mb-2 text-gray-800">{item.title}</h4>
      <div className="space-y-1 text-sm text-gray-600">
        {showTime && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{item.duration} 分鐘</span>
          </div>
        )}
        {item.groupSize && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{item.groupSize} 人一組</span>
          </div>
        )}
        {item.requirements && (
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span className="truncate">{item.requirements}</span>
          </div>
        )}
        {showTime && item.startTime && (
          <div className="text-xs text-gray-500 mt-2">
            開始時間：{item.startTime}
          </div>
        )}
      </div>
      {item.imageUrl && (
        <div className="mt-2 text-xs text-blue-600">✓ 已上傳圖示</div>
      )}
    </div>
  )
}

