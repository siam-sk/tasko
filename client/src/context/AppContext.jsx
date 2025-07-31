import { createContext, useContext, useEffect, useState } from 'react'
import api from '../utils/api'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    api.get('/users/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
  }, [])

  return (
    <AppContext.Provider value={{ user, setUser, tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  )
}


export function useAppContext() {
  return useContext(AppContext)
}

