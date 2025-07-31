import { useAppContext } from '../context/AppContext.jsx'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute