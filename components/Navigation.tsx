'use client'

import { Activity } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8" />
            <h1 className="text-2xl font-bold">系排寒訓菜單</h1>
          </div>
        </div>
      </div>
    </nav>
  )
}
