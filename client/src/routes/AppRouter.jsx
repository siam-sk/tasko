import { Routes, Route, Navigate } from 'react-router'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import ResetPassword from '../pages/ResetPassword.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Error404 from '../pages/Error404.jsx'

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default AppRouter