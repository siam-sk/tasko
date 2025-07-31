import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import api from '../utils/api';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';

import LoginImage from '../assets/login.png';
import NoTasksImage from '../assets/no-tasks.svg';

import DashboardNavbar from '../components/DashboardNavbar.jsx';
import CustomDropdown from '../components/CustomDropdown.jsx';
import TaskCard from '../components/TaskCard.jsx';
import SpinWheel from '../components/SpinWheel.jsx';
import AddTaskModal from '../components/AddTaskModal.jsx';
import TaskDetailsModal from '../components/TaskDetailsModal.jsx';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal.jsx';
import CongratsModal from '../components/CongratsModal.jsx';

const statusColors = {
  'Pending': "#E343E6",
  'In Progress': "#DD9221",
  'Done': "#21D789",
  'Completed': "#21D789"
};

const Dashboard = () => {
  const { user, setUser, tasks, setTasks } = useAppContext();
  const navigate = useNavigate();

  // State
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [taskToView, setTaskToView] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [error, setError] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeNav, setActiveNav] = useState('tasklist');

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, categoryRes, tasksRes] = await Promise.all([
          api.get('/tasks/status-options'),
          api.get('/tasks/category-options'),
          api.get('/tasks')
        ]);
        setStatusOptions(statusRes.data);
        setCategories(categoryRes.data.map(cat => ({ value: cat, label: cat })));
        setTasks(tasksRes.data);
      } catch (err) {
        setError('Failed to fetch initial data');
        console.error(err);
      }
    };
    fetchData();
  }, [setTasks]);

  // API Handlers
  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleAddTask = async (newTask) => {
    setError('');
    try {
      const res = await api.post('/tasks', newTask);
      setTasks(prev => [...prev, res.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task');
      throw err; 
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    setError('');
    const originalTask = tasks.find(t => t._id === taskId);
    const isCompletingTask = (updates.status === 'Done' || updates.status === 'Completed') && originalTask?.status !== 'Done' && originalTask?.status !== 'Completed';

    try {
      const res = await api.put(`/tasks/${taskId}`, updates);
      setTasks(prev => prev.map(t => t._id === taskId ? res.data : t));
      setTaskToView(null);

      if (isCompletingTask) {
        setShowCongratsModal(true);
        // Update user points and level
        const updatedUserRes = await api.patch('/users/me/score', { points: 20 });
        setUser(updatedUserRes.data);
      }
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) return;
    setError('');
    try {
      await api.delete(`/tasks/${taskToDelete._id}`);
      setTasks(prev => prev.filter(t => t._id !== taskToDelete._id));
      if (taskToView?._id === taskToDelete._id) {
        setTaskToView(null);
      }
      setTaskToDelete(null);
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    }
  };

  const filteredTasks = useMemo(() => tasks.filter(task => {
    const categoryMatch = !filterCategory || task.category === filterCategory;
    const statusMatch = !filterStatus || task.status === filterStatus;
    return categoryMatch && statusMatch;
  }), [tasks, filterCategory, filterStatus]);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <div className="relative h-[40vh] bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#60E5AE33] to-[#60E5AE] opacity-40"></div>
        <DashboardNavbar activeNav={activeNav} setActiveNav={setActiveNav} user={user} onLogout={handleLogout} />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 h-[80%] flex items-center"><img src={LoginImage} alt="Illustration" className="w-full h-full object-contain" /></div>
        <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-start z-10">
          <h1 className="text-2xl font-bold text-[#60E5AE]">Hi {user?.name || 'User'},</h1>
          <p className="text-4xl font-semibold text-white mt-2">Welcome to Dashboard</p>
        </div>
      </div>

      <main className="absolute top-[30vh] left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 z-30">
        <div className="bg-white shadow-2xl rounded-2xl min-h-[65vh] flex flex-col" style={{ maxHeight: 'calc(70vh)', overflowY: 'auto' }}>
          {activeNav === 'tasklist' ? (
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <span className="text-2xl font-bold text-[#222]">All Task List</span>
                <div className="flex items-center gap-4 flex-wrap justify-center">
                  <CustomDropdown options={categories} value={filterCategory} onChange={setFilterCategory} placeholder="Filter by Category" />
                  <CustomDropdown options={[{ value: '', label: 'All Tasks' }, ...statusOptions.map(opt => ({ value: opt, label: opt }))]} value={filterStatus} onChange={setFilterStatus} placeholder="Filter by Status" />
                  <button className="btn flex items-center gap-2 text-black" style={{ backgroundColor: '#60E5AE', border: 'none' }} onClick={() => setShowAddModal(true)}><FiPlus size={20} />Add New Task</button>
                </div>
              </div>
              {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTasks.map(task => (<TaskCard key={task._id} task={task} statusColors={statusColors} onViewDetails={setTaskToView} onDeleteClick={setTaskToDelete} />))}
                </div>
              ) : (
                <div className="col-span-3 flex flex-col items-center justify-center py-16">
                  <img src={NoTasksImage} alt="No Tasks" className="w-48 h-48 mb-6" />
                  <p className="text-xl font-semibold text-gray-500 text-center">No tasks found. Add a new task to get started!</p>
                </div>
              )}
            </div>
          ) : (
            <SpinWheel categories={categories} onNavigateToTasks={() => setActiveNav('tasklist')} />
          )}
        </div>
      </main>

      {/* Modals */}
      <AddTaskModal show={showAddModal} onClose={() => setShowAddModal(false)} onAddTask={handleAddTask} categories={categories} statusOptions={statusOptions} />
      <TaskDetailsModal show={!!taskToView} task={taskToView} onClose={() => setTaskToView(null)} onUpdateTask={handleUpdateTask} onDelete={setTaskToDelete} statusOptions={statusOptions} statusColors={statusColors} />
      <DeleteConfirmationModal show={!!taskToDelete} onClose={() => setTaskToDelete(null)} onConfirm={handleDeleteTask} />
      <CongratsModal show={showCongratsModal} onClose={() => setShowCongratsModal(false)} />
      {error && <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-[100]">{error}</div>}
    </div>
  );
};

export default Dashboard;
