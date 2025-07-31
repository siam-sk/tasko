import { useNavigate } from 'react-router'
import LoginImage from '../assets/login.png';
import Error404Image from '../assets/404.svg';

const Error404 = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative">
     
      <div className="relative h-[20vh] bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#60E5AE33] to-[#60E5AE] opacity-40 pointer-events-none"></div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 h-[80%] flex items-center">
          <img
            src={LoginImage}
            alt="404"
            className="w-full h-full object-contain opacity-80 mix-blend-multiply"
            style={{ filter: 'brightness(0.7)' }}
          />
        </div>
      </div>
      
      <div className="h-[80vh] bg-base-200"></div>
      
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
        <div className="w-full flex justify-center pointer-events-auto">
          <div className="max-w-6xl w-full bg-base-100 shadow-2xl rounded-2xl px-80 py-32 my-52 flex flex-col items-center">
            <img src={Error404Image} alt="404" className="w-96 h-96 mb-12" />
            <button
              className="btn w-full text-lg"
              style={{ backgroundColor: '#60E5AE', color: '#222', border: 'none' }}
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error404