import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FiClock, FiList, FiRefreshCw, FiChevronDown } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import api from '../utils/api';
import { useAppContext } from '../context/AppContext';

const DashboardNavbar = ({ activeNav, setActiveNav }) => {
  const { user, setUser } = useAppContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const fullName = user?.name || "Full Name";

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      setUser(null);
      setShowUserMenu(false);
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-12 py-6 bg-transparent z-40">
      <div className="flex items-center gap-2">
        <FiClock size={24} className="text-[#60E5AE]" />
        <span className="font-bold text-xl text-white">Tasko</span>
      </div>
      <div className="flex items-center gap-8">
        <button
          className={`flex items-center gap-2 font-semibold transition ${activeNav === 'tasklist' ? 'text-[#60E5AE]' : 'text-white hover:text-[#60E5AE]'}`}
          onClick={() => setActiveNav('tasklist')}
        >
          <FiList size={22} />
          Task List
        </button>
        <button
          className={`flex items-center gap-2 font-semibold transition ${activeNav === 'spin' ? 'text-[#60E5AE]' : 'text-white hover:text-[#60E5AE]'}`}
          onClick={() => setActiveNav('spin')}
        >
          <FiRefreshCw size={22} />
          Spin
        </button>
      </div>
      <div className="flex items-center gap-3 relative">
        <FaUserCircle size={24} className="text-[#60E5AE]" />
        <span className="text-white font-semibold">{fullName}</span>
        <div className="relative">
          <button
            className="focus:outline-none bg-transparent border-none p-0"
            onClick={() => setShowUserMenu(prev => !prev)}
            type="button"
          >
            <FiChevronDown size={22} className="text-white" />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50 flex flex-col p-2">
              <button
                className="btn btn-error btn-sm w-full"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;