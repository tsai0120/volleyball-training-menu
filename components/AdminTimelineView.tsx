'use client'

import { useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { format, parseISO } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { useTrainingData } from '@/hooks/useTrainingData'
import { TrainingItem, TrainingCategory } from '@/types'
import { Plus, Edit2, GripVertical } from 'lucide-react'
import AdminPanel from './AdminPanel'

const categoryLabels: Record<TrainingCategory, string> = {
  warmup: '熱身',
  practice: '練球',
  fitness: '體能',
}

const categoryColors: Record<TrainingCategory, string> = {
  warmup: 'bg-yellow-100 border-yellow-300',
  practice: 'bg-blue-100 border-blue-300',
  fitness: 'bg-red-100 border-red-300',
}

interface DraggableCardProps {
  item: TrainingItem
  onEdit: (item: TrainingItem) => void
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

function DraggableCard({ item, onEdit, index, moveCard }: DraggableCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'card',
    hover: (draggedItem: { id: string; index: number }) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index)
        draggedItem.index = index
      }
    },
  })

  const ref = (node: HTMLDivElement | null) => {
    drag(drop(node))
  }

  return (
    <div
      ref={ref}
      className={`p-4 rounded-lg border-2 cursor-move transition-all ${
        categoryColors[item.category]
      } ${isDragging ? 'opacity-50' : 'hover:shadow-lg'}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <GripVertical className="w-4 h-4 text-gray-400" />
            <h4 className="font-bold text-lg text-gray-800">{item.title}</h4>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div>{item.duration} 分鐘</div>
            {item.groupSize && <div>{item.groupSize} 人一組</div>}
            {item.requirements && <div>{item.requirements}</div>}
          </div>
        </div>
        <button
          onClick={() => onEdit(item)}
          className="p-2 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default function AdminTimelineView() {
  const { trainingDays, updateTrainingDays, attendanceData } = useTrainingData()
  const [selectedDay, setSelectedDay] = useState(0)
  const [editingItem, setEditingItem] = useState<TrainingItem | null>(null)
  const [showAddCard, setShowAddCard] = useState(false)
  const [newCardCategory, setNewCardCategory] = useState<TrainingCategory>('warmup')

  const currentDay = trainingDays[selectedDay]

  const itemsByCategory = {
    warmup: currentDay.items.filter((item) => item.category === 'warmup'),
    practice: currentDay.items.filter((item) => item.category === 'practice'),
    fitness: currentDay.items.filter((item) => item.category === 'fitness'),
  }

  const moveCard = (
    dragIndex: number,
    hoverIndex: number,
    category: TrainingCategory
  ) => {
    const categoryItems = itemsByCategory[category]
    const draggedItem = categoryItems[dragIndex]
    const newItems = [...categoryItems]
    newItems.splice(dragIndex, 1)
    newItems.splice(hoverIndex, 0, draggedItem)

    const updatedDay = {
      ...currentDay,
      items: [
        ...currentDay.items.filter((item) => item.category !== category),
        ...newItems,
      ],
    }

    const updatedDays = [...trainingDays]
    updatedDays[selectedDay] = updatedDay
    updateTrainingDays(updatedDays)
  }

  const handleSaveItem = (item: TrainingItem) => {
    const updatedDay = {
      ...currentDay,
      items: currentDay.items.map((i) => (i.id === item.id ? item : i)),
    }
    const updatedDays = [...trainingDays]
    updatedDays[selectedDay] = updatedDay
    updateTrainingDays(updatedDays)
    setEditingItem(null)
  }

  const handleAddCard = (category: TrainingCategory, type?: 'rest' | 'meal' | 'setup' | 'cleanup') => {
    const newItem: TrainingItem = {
      id: `new-${Date.now()}`,
      title: type === 'rest' ? '休息' : type === 'meal' ? '吃飯' : type === 'setup' ? '場佈' : type === 'cleanup' ? '場復' : '新項目',
      duration: type === 'rest' || type === 'meal' ? 15 : 10,
      category,
      customType: type,
    }

    const updatedDay = {
      ...currentDay,
      items: [...currentDay.items, newItem],
    }
    const updatedDays = [...trainingDays]
    updatedDays[selectedDay] = updatedDay
    updateTrainingDays(updatedDays)
    setEditingItem(newItem)
    setShowAddCard(false)
  }

  const getAttendanceList = () => {
    return attendanceData
      .filter((person) => person.days[selectedDay])
      .map((person) => person.name)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">管理寒訓菜單</h2>

        {/* Day Selector */}
        <div className="flex gap-4 mb-8">
          {trainingDays.map((day, index) => (
            <button
              key={day.date}
              onClick={() => {
                setSelectedDay(index)
                setEditingItem(null)
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedDay === index
                  ? 'bg-orange-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {format(parseISO(day.date), 'M月d日', { locale: zhTW })}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {(Object.keys(itemsByCategory) as TrainingCategory[]).map((category) => (
            <div
              key={category}
              className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`px-4 py-2 rounded-lg font-bold text-lg ${categoryColors[category]}`}
                  >
                    {categoryLabels[category]}
                  </div>
                  <div className="text-sm text-gray-500">
                    {itemsByCategory[category].length} 個項目
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setNewCardCategory(category)
                      setShowAddCard(true)
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    新增項目
                  </button>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleAddCard(category, 'rest')}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                    >
                      休息
                    </button>
                    <button
                      onClick={() => handleAddCard(category, 'meal')}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                    >
                      吃飯
                    </button>
                    <button
                      onClick={() => handleAddCard(category, 'setup')}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                    >
                      場佈
                    </button>
                    <button
                      onClick={() => handleAddCard(category, 'cleanup')}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                    >
                      場復
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {itemsByCategory[category].map((item, index) => (
                  <DraggableCard
                    key={item.id}
                    item={item}
                    onEdit={setEditingItem}
                    index={index}
                    moveCard={(dragIndex, hoverIndex) =>
                      moveCard(dragIndex, hoverIndex, category)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Edit Panel */}
        {editingItem && (
          <AdminPanel
            item={editingItem}
            onSave={handleSaveItem}
            onCancel={() => setEditingItem(null)}
            attendanceList={getAttendanceList()}
            onGroup={(item, groups) => {
              handleSaveItem({ ...item, groupList: groups })
            }}
          />
        )}
      </div>
    </DndProvider>
  )
}

