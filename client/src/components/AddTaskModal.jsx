import React, { useState } from 'react';

const AddTaskModal = ({ show, onClose, onAddTask, categories, statusOptions }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
    deadline: '',
    category: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onAddTask(newTask);
      onClose(); 
      setNewTask({ title: '', description: '', status: 'Pending', deadline: '', category: '' }); // Reset form
    } catch (err) {
      setError(err.message || 'Failed to add task');
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <form
        className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Create New Task</h2>
       
        <div className="w-full mb-4">
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Task title"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
        </div>
       
        <div className="w-full mb-4">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Task description"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
          />
        </div>
        
        <div className="w-full mb-4">
          <label className="block mb-1 font-semibold">Category</label>
          <select
            className="select select-bordered w-full"
            value={newTask.category}
            onChange={e => setNewTask({ ...newTask, category: e.target.value })}
            required
          >
            <option value="" disabled>Select category</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        
        <div className="w-full mb-4">
          <label className="block mb-1 font-semibold">Status</label>
          <select
            className="select select-bordered w-full"
            value={newTask.status}
            onChange={e => setNewTask({ ...newTask, status: e.target.value })}
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        
        <div className="w-full mb-6">
          <label className="block mb-1 font-semibold">Deadline</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={newTask.deadline}
            onChange={e => setNewTask({ ...newTask, deadline: e.target.value })}
          />
        </div>
        
        <button
          className="btn w-full mb-2 text-black"
          style={{ backgroundColor: '#60E5AE', border: 'none' }}
          type="submit"
        >
          Create Task
        </button>
        <button
          className="btn btn-ghost w-full"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default AddTaskModal;