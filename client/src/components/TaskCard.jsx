import React from 'react';
import { FiCalendar, FiTrash2 } from 'react-icons/fi';
import TaskIcon from '../assets/task-icon.png';

const TaskCard = ({ task, statusColors, onViewDetails, onDeleteClick }) => {
  return (
    <div key={task._id} className="bg-white border border-gray-300 rounded-xl shadow p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewDetails(task)}>
            <img src={TaskIcon} alt="Task Icon" className="w-7 h-7" />
            <h3 className="text-lg font-bold text-[#222]">{task.title}</h3>
          </div>
          <button className="text-[#E343E6] hover:text-red-600" onClick={() => onDeleteClick(task)}>
            <FiTrash2 size={20} />
          </button>
        </div>
        <p className="text-base-content/70 mb-6">{task.description}</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <FiCalendar size={18} className="text-[#60E5AE]" />
          <span className="text-sm text-base-content">{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}</span>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColors[task.status] || '#ccc' }}
          ></span>
          <span style={{ color: statusColors[task.status] || '#ccc' }}>
            {task.status}
          </span>
        </span>
      </div>
    </div>
  );
};

export default TaskCard;