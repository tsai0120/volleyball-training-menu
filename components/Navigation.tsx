'use client'

import { Activity, Settings, LogOut } from 'lucide-react'
import { useAdmin } from '@/contexts/AdminContext'
import AdminLogin from './AdminLogin'

export default function Navigation() {
  const { isAdmin, showLogin, setShowLogin, logout, login } = useAdmin()

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8" />
              <h1 className="text-2xl font-bold">系排寒訓菜單</h1>
            </div>
            {isAdmin ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all shadow-md"
              >
                <LogOut className="w-5 h-5" />
                登出
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
              >
                <Settings className="w-5 h-5" />
                管理員登入
              </button>
            )}
          </div>
        </div>
      </nav>
      {showLogin && (
        <AdminLogin
          onLogin={(username, password) => {
            const success = login(username, password)
            return success
          }}
          onCancel={() => setShowLogin(false)}
        />
      )}
    </>
  )
}

