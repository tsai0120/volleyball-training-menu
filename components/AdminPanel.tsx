'use client'

import { useState } from 'react'
import { TrainingItem, TrainingCategory } from '@/types'
import { Edit2, Plus, Upload, Users, Save, X } from 'lucide-react'

interface AdminPanelProps {
  item: TrainingItem
  onSave: (item: TrainingItem) => void
  onCancel: () => void
  attendanceList: string[]
  onGroup: (item: TrainingItem, groups: string[][]) => void
}

export default function AdminPanel({
  item,
  onSave,
  onCancel,
  attendanceList,
  onGroup,
}: AdminPanelProps) {
  const [editedItem, setEditedItem] = useState<TrainingItem>({ ...item })
  const [showGrouping, setShowGrouping] = useState(false)
  const [groups, setGroups] = useState<string[][]>(item.groupList || [])
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleSave = () => {
    // 如果有图片文件，转换为base64（实际应用中应该上传到服务器）
    if (imageFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedItem = {
          ...editedItem,
          imageUrl: reader.result as string,
        }
        onSave(updatedItem)
      }
      reader.readAsDataURL(imageFile)
    } else {
      onSave(editedItem)
    }
  }

  const handleAutoGroup = () => {
    if (!editedItem.groupSize || attendanceList.length === 0) return

    const shuffled = [...attendanceList].sort(() => Math.random() - 0.5)
    const newGroups: string[][] = []
    const groupSize = editedItem.groupSize

    for (let i = 0; i < shuffled.length; i += groupSize) {
      newGroups.push(shuffled.slice(i, i + groupSize))
    }

    setGroups(newGroups)
    setEditedItem({ ...editedItem, groupList: newGroups })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedItem({ ...editedItem, imageUrl: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800">編輯項目</h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* 標題 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              標題
            </label>
            <input
              type="text"
              value={editedItem.title}
              onChange={(e) =>
                setEditedItem({ ...editedItem, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 所需時間 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              所需時間（分鐘）
            </label>
            <input
              type="number"
              value={editedItem.duration}
              onChange={(e) =>
                setEditedItem({
                  ...editedItem,
                  duration: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 分組 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              分組（幾人一組）
            </label>
            <input
              type="number"
              value={editedItem.groupSize || ''}
              onChange={(e) =>
                setEditedItem({
                  ...editedItem,
                  groupSize: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="留空表示不分組"
            />
          </div>

          {/* 要求 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              要求
            </label>
            <input
              type="text"
              value={editedItem.requirements || ''}
              onChange={(e) =>
                setEditedItem({ ...editedItem, requirements: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="例如：要接幾顆好球"
            />
          </div>

          {/* 幾趟 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              趟數
            </label>
            <input
              type="number"
              value={editedItem.rounds || ''}
              onChange={(e) =>
                setEditedItem({
                  ...editedItem,
                  rounds: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 詳細說明 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              詳細說明
            </label>
            <textarea
              value={editedItem.description || ''}
              onChange={(e) =>
                setEditedItem({ ...editedItem, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 上傳圖示 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              圖示說明
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                <Upload className="w-5 h-5" />
                上傳圖片
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {editedItem.imageUrl && (
                <div className="flex-1">
                  <img
                    src={editedItem.imageUrl}
                    alt="預覽"
                    className="max-h-32 rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 自動分組 */}
          {editedItem.groupSize && attendanceList.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  分組名單
                </label>
                <button
                  onClick={handleAutoGroup}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  自動分組
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto">
                {groups.map((group, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-lg p-3 border border-blue-200"
                  >
                    <div className="font-semibold text-blue-700 mb-2">
                      第 {index + 1} 組
                    </div>
                    <div className="space-y-1">
                      {group.map((name, nameIndex) => (
                        <div key={nameIndex} className="text-sm text-gray-700">
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 按鈕 */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              <Save className="w-5 h-5" />
              儲存
            </button>
            <button
              onClick={onCancel}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              <X className="w-5 h-5" />
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

