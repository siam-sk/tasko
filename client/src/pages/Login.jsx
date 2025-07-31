import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import api from '../utils/api'
import { useNavigate } from 'react-router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/users/login', { email, password })
      
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Login failed. Please check your credentials.'
      )
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 flex items-center justify-center bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#60E5AE33] to-[#60E5AE] opacity-40 pointer-events-none"></div>
        <img
          src="/src/assets/login.png"
          alt="Login"
          className="z-10 w-4/5 max-w-lg mx-auto"
        />
      </div>
      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center bg-base-200">
        <div className="w-full max-w-md p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-2 text-center">Login</h2>
          <p className="mb-6 text-sm text-base-content/70 text-center">Welcome back, Please Enter your Details to Log in.</p>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pr-10"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-base-content/60"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                <span className="text-sm">Remember me</span>
              </label>
              <a href="/reset-password" className="text-sm text-base-content/60 hover:underline">Forgot password?</a>
            </div>
            <button
              className="btn w-full"
              style={{ backgroundColor: '#60E5AE', color: '#222', border: 'none' }}
              type="submit"
            >
              Login
            </button>
          </form>
          {/* Solid line with "or" */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-solid border-base-300"></div>
            <span className="mx-4 text-base-content/60">or</span>
            <div className="flex-grow border-t border-solid border-base-300"></div>
          </div>
          {/* Signup link */}
          <div className="text-center">
            <span className="text-sm text-base-content/70">Don&apos;t have an account? </span>
            <a href="/signup" className="text-black font-semibold hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login