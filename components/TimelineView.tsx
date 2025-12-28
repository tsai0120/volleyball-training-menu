'use client'

import React, { useState, useMemo } from 'react'
import { format, parseISO } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { useTrainingData } from '@/hooks/useTrainingData'
import { TrainingItem, TrainingCategory } from '@/types'
import { Clock, Users, Target, Image as ImageIcon } from 'lucide-react'
import TrainingCard from './TrainingCard'

const categoryLabels: Record<TrainingCategory, string> = {
  warmup: '熱身',
  practice: '練球',
  fitness: '體能',
}

const categoryColors: Record<TrainingCategory, string> = {
  warmup: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  practice: 'bg-blue-100 border-blue-300 text-blue-800',
  fitness: 'bg-red-100 border-red-300 text-red-800',
}

// 将时间字符串转换为分钟数
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// 计算结束时间
const getEndTime = (startTime: string, duration: number): string => {
  const startMinutes = timeToMinutes(startTime)
  const endMinutes = startMinutes + duration
  const hours = Math.floor(endMinutes / 60)
  const mins = endMinutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

// 计算时间在时间轴上的位置（13:00-17:00）
const getTimePosition = (time: string): number => {
  const timeMinutes = timeToMinutes(time)
  const startMinutes = 13 * 60 // 13:00
  const endMinutes = 17 * 60 // 17:00
  const totalMinutes = endMinutes - startMinutes
  const position = ((timeMinutes - startMinutes) / totalMinutes) * 100
  return Math.max(0, Math.min(100, position))
}

// 计算时间长度在时间轴上的百分比
const getTimeHeight = (duration: number): number => {
  const totalMinutes = 4 * 60 // 13:00-17:00 = 4小时 = 240分钟
  return (duration / totalMinutes) * 100
}

export default function TimelineView() {
  const { trainingDays } = useTrainingData()
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedCard, setSelectedCard] = useState<TrainingItem | null>(null)

  const currentDay = trainingDays[selectedDay]

  // 按时间排序所有项目
  const sortedItems = useMemo(() => {
    return [...currentDay.items]
      .filter(item => item.startTime)
      .sort((a, b) => {
        if (!a.startTime || !b.startTime) return 0
        return timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
      })
  }, [currentDay])

  // 按类别分组（用于显示分类标签）
  const itemsByCategory = useMemo(() => {
    return {
      warmup: currentDay.items.filter((item) => item.category === 'warmup'),
      practice: currentDay.items.filter((item) => item.category === 'practice'),
      fitness: currentDay.items.filter((item) => item.category === 'fitness'),
    }
  }, [currentDay])

  return React.createElement('div', null,
    React.createElement('h2', { className: 'text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3' },
      React.createElement(Clock, { className: 'w-8 h-8 text-orange-500' }),
      '寒訓三天菜單'
    ),

    // 日期选择器
    React.createElement('div', { className: 'flex gap-4 mb-8' },
      trainingDays.map((day, index) =>
        React.createElement('button', {
          key: day.date,
          onClick: () => {
            setSelectedDay(index)
            setSelectedCard(null)
          },
          className: `px-6 py-3 rounded-lg font-semibold transition-all ${
            selectedDay === index
              ? 'bg-orange-500 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`
        }, format(parseISO(day.date), 'M月d日', { locale: zhTW }))
      )
    ),

    // 垂直时间轴布局
    React.createElement('div', { className: 'flex flex-col md:flex-row gap-6' },
      // 左侧垂直时间轴（桌面版显示，手机版隐藏）
      React.createElement('div', { 
        className: 'hidden md:flex flex-col items-start w-24 flex-shrink-0 relative'
      },
        // 时间轴容器
        React.createElement('div', {
          className: 'relative w-full h-full min-h-[600px]'
        },
          // 时间标记
          ['13:00', '14:00', '15:00', '16:00', '17:00'].map((time, index, array) =>
            React.createElement(React.Fragment, { key: time },
              React.createElement('div', {
                className: 'absolute left-0 flex items-center gap-2',
                style: { top: `${(index / (array.length - 1)) * 100}%` }
              },
                React.createElement('div', {
                  className: 'text-sm font-semibold text-gray-700 whitespace-nowrap'
                }, time),
                React.createElement('div', {
                  className: 'w-32 h-0.5 bg-gray-300'
                })
              ),
              index < array.length - 1 && React.createElement('div', {
                className: 'absolute left-0 w-0.5 bg-gray-300',
                style: {
                  top: `${(index / (array.length - 1)) * 100}%`,
                  height: `${(100 / (array.length - 1))}%`
                }
              })
            )
          ),
          // 项目时间块
          sortedItems.map((item) => {
            if (!item.startTime) return null
            const position = getTimePosition(item.startTime)
            const height = getTimeHeight(item.duration)
            const categoryColor = {
              warmup: 'bg-yellow-400',
              practice: 'bg-blue-400',
              fitness: 'bg-red-400',
            }[item.category] || 'bg-gray-400'
            
            return React.createElement('div', {
              key: item.id,
              className: `absolute left-0 w-2 ${categoryColor} rounded opacity-60`,
              style: {
                top: `${position}%`,
                height: `${height}%`
              },
              title: `${item.title} (${item.duration}分鐘)`
            })
          })
        )
      ),

      // 右侧内容区域
      React.createElement('div', { className: 'flex-1 overflow-y-auto max-h-[800px]' },
        // 按类别显示
        (Object.keys(itemsByCategory) as TrainingCategory[]).map((category) => {
          const categoryItems = sortedItems.filter(item => item.category === category)
          
          if (categoryItems.length === 0) return null
          
          return React.createElement('div', {
            key: category,
            className: 'mb-8'
          },
            // 类别标题
            React.createElement('div', { className: 'flex items-center gap-3 mb-4' },
              React.createElement('div', {
                className: `px-4 py-2 rounded-lg font-bold text-lg ${categoryColors[category]}`
              }, categoryLabels[category]),
              React.createElement('div', { className: 'text-sm text-gray-500' },
                `${itemsByCategory[category].length} 個項目`
              )
            ),

            // 该类别下的项目，按时间排序
            React.createElement('div', { className: 'space-y-4' },
              categoryItems.map((item) => {
                const startTime = item.startTime || '13:00'
                const endTime = getEndTime(startTime, item.duration)
                
                return React.createElement('div', {
                  key: item.id,
                  className: 'w-full'
                },
                  // 时间显示（外部，在卡片上方）
                  React.createElement('div', { 
                    className: 'flex items-center gap-2 mb-2 text-sm text-gray-600 font-medium'
                  },
                    React.createElement(Clock, { className: 'w-4 h-4 text-blue-500' }),
                    React.createElement('span', null, startTime),
                    React.createElement('span', { className: 'text-gray-400' }, '-'),
                    React.createElement('span', null, endTime),
                    React.createElement('span', { className: 'text-gray-400 ml-1' }, `(${item.duration}分鐘)`)
                  ),
                  // 卡片（手机版一行一张，桌面版可以多张）
                  React.createElement('div', { className: 'w-full' },
                    React.createElement(TrainingCard, {
                      item: item,
                      onClick: () => setSelectedCard(item),
                      isSelected: selectedCard?.id === item.id,
                      showTime: false
                    })
                  )
                )
              })
            )
          )
        })
      )
    ),

    // 卡片详情模态框
    selectedCard && React.createElement('div', {
      className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4',
      onClick: () => setSelectedCard(null)
    },
      React.createElement('div', {
        className: 'bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl',
        onClick: (e: React.MouseEvent) => e.stopPropagation()
      },
        React.createElement('div', { className: 'flex items-center justify-between mb-4' },
          React.createElement('h3', { className: 'text-2xl font-bold text-gray-800' }, selectedCard.title),
          React.createElement('button', {
            onClick: () => setSelectedCard(null),
            className: 'text-gray-500 hover:text-gray-700 text-2xl'
          }, '×')
        ),
        React.createElement('div', { className: 'space-y-4' },
          React.createElement('div', { className: 'flex items-center gap-2 text-gray-700' },
            React.createElement(Clock, { className: 'w-5 h-5 text-blue-500' }),
            React.createElement('span', { className: 'font-semibold' }, '所需時間：'),
            React.createElement('span', null, `${selectedCard.duration} 分鐘`)
          ),
          selectedCard.groupSize && React.createElement('div', { className: 'flex items-center gap-2 text-gray-700' },
            React.createElement(Users, { className: 'w-5 h-5 text-green-500' }),
            React.createElement('span', { className: 'font-semibold' }, '分組：'),
            React.createElement('span', null, `${selectedCard.groupSize} 人一組`)
          ),
          selectedCard.requirements && React.createElement('div', { className: 'flex items-start gap-2 text-gray-700' },
            React.createElement(Target, { className: 'w-5 h-5 text-red-500 mt-0.5' }),
            React.createElement('div', null,
              React.createElement('span', { className: 'font-semibold' }, '要求：'),
              React.createElement('span', { className: 'ml-2' }, selectedCard.requirements)
            )
          ),
          selectedCard.rounds && React.createElement('div', { className: 'text-gray-700' },
            React.createElement('span', { className: 'font-semibold' }, '趟數：'),
            React.createElement('span', { className: 'ml-2' }, `${selectedCard.rounds} 趟`)
          ),
          selectedCard.description && React.createElement('div', { className: 'bg-gray-50 rounded-lg p-4' },
            React.createElement('div', { className: 'font-semibold text-gray-700 mb-2' }, '詳細說明：'),
            React.createElement('div', { className: 'text-gray-600 whitespace-pre-line' }, selectedCard.description)
          ),
          selectedCard.imageUrl ? React.createElement('div', null,
            React.createElement('div', { className: 'font-semibold text-gray-700 mb-2 flex items-center gap-2' },
              React.createElement(ImageIcon, { className: 'w-5 h-5' }),
              '圖示說明：'
            ),
            React.createElement('img', {
              src: selectedCard.imageUrl,
              alt: selectedCard.title,
              className: 'w-full rounded-lg shadow-md'
            })
          ) : React.createElement('div', { className: 'text-gray-400 text-sm flex items-center gap-2' },
            React.createElement(ImageIcon, { className: 'w-4 h-4' }),
            '尚未上傳圖示'
          ),
          selectedCard.groupList && selectedCard.groupList.length > 0 && React.createElement('div', null,
            React.createElement('div', { className: 'font-semibold text-gray-700 mb-3' }, '分組名單：'),
            React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
              selectedCard.groupList.map((group, index) =>
                React.createElement('div', {
                  key: index,
                  className: 'bg-blue-50 rounded-lg p-3 border border-blue-200'
                },
                  React.createElement('div', { className: 'font-semibold text-blue-700 mb-2' }, `第 ${index + 1} 組`),
                  React.createElement('div', { className: 'space-y-1' },
                    group.map((name, nameIndex) =>
                      React.createElement('div', {
                        key: nameIndex,
                        className: 'text-sm text-gray-700'
                      }, name)
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )
}
