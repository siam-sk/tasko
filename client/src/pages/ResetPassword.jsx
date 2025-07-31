import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import api from '../utils/api'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    try {
      await api.post('/users/reset-password', {
        email,
        password,
      })
      setSuccess('Password reset successful!')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Password reset failed. Please try again.'
      )
    }
  }

  return (
    <div className="min-h-screen relative">
      
      <div className="relative h-[20vh] bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#60E5AE33] to-[#60E5AE] opacity-40 pointer-events-none"></div>
        
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 h-[80%] flex items-center">
          <img
            src="/src/assets/login.png"
            alt="Login"
            className="w-full h-full object-contain opacity-80 mix-blend-multiply"
            style={{ filter: 'brightness(0.7)' }}
          />
        </div>
      </div>
      
      <div className="h-[80vh] bg-base-200"></div>
      
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
        <div className="w-full flex justify-center pointer-events-auto">
          <div className="max-w-6xl w-full bg-base-100 shadow-2xl rounded-2xl px-80 py-32 my-52">
            <div className="flex flex-col items-center mb-8">
              <img src="/src/assets/clock-icon.png" alt="Clock" className="w-12 h-12 mb-2" />
              <h2 className="text-3xl font-bold mb-1 text-center">Reset your Password</h2>
              <p className="text-sm text-base-content/70 text-center">
                Strong passwords include numbers, letters or punctuation marks.
              </p>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-8 px-10">
              <div>
                <label className="block mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Enter New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
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
              <div>
                <label className="block mb-1 font-semibold">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Retype password"
                    className="input input-bordered w-full pr-10"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-base-content/60"
                    onClick={() => setShowConfirm(!showConfirm)}
                    tabIndex={-1}
                  >
                    {showConfirm ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                  </button>
                </div>
              </div>
              <button
                className="btn w-full"
                style={{ backgroundColor: '#60E5AE', color: '#222', border: 'none' }}
                type="submit"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword