'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AdminContextType {
  isAdmin: boolean
  setIsAdmin: (value: boolean) => void
  showLogin: boolean
  setShowLogin: (value: boolean) => void
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

// 默认账号密码（实际应用中应该从环境变量或后端获取）
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      setShowLogin(false)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdmin(false)
  }

  return (
    <AdminContext.Provider value={{ 
      isAdmin, 
      setIsAdmin, 
      showLogin, 
      setShowLogin,
      login,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

