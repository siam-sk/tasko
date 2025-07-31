import React, { useState, useEffect } from 'react';
import { FiEdit, FiArrowLeft, FiCalendar } from 'react-icons/fi';
import CustomDropdown from './CustomDropdown';
import TaskIcon2 from '../assets/task-icon2.png';

const TaskDetailsModal = ({ task, show, onClose, onUpdateTask, onDelete, statusOptions, statusColors }) => {
    const [currentStatus, setCurrentStatus] = useState(task?.status);

    useEffect(() => {
        if (task) {
            setCurrentStatus(task.status);
        }
    }, [task]);

    if (!show || !task) return null;

    const handleUpdate = () => {
        onUpdateTask(task._id, { status: currentStatus });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-10 relative flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-bold text-[#222]">Task Details</span>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-5 py-3 rounded-lg font-semibold" style={{ background: "#FFAB001A", color: "#FFAB00" }}>
                            <FiEdit size={22} />
                            Edit Task
                        </button>
                        <button
                            className="flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-white"
                            style={{ background: "#60E5AE" }}
                            onClick={onClose}
                        >
                            <FiArrowLeft size={22} />
                            Back
                        </button>
                    </div>
                </div>
                <hr className="border-t border-gray-200 mb-8" />

                
                <div className="flex items-center mb-10">
                    <img src={TaskIcon2} alt="Task Icon" className="w-20 h-20 mr-8" />
                    <div>
                        <h2 className="text-3xl font-bold text-[#222] mb-3">{task.title}</h2>
                        <p className="text-lg text-gray-600">{task.description}</p>
                    </div>
                </div>

                <div className="mb-8 ml-[6.5rem]">
                    <span className="block text-base font-semibold text-gray-500 mb-2">End Date</span>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <FiCalendar size={26} className="text-[#60E5AE]" />
                            <span className="text-lg font-semibold">{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <span className="mx-3 text-gray-400 font-bold text-xl">|</span>
                        <span className="flex items-center gap-2 text-lg font-bold">
                            <span
                                className="inline-block w-4 h-4 rounded-full"
                                style={{ backgroundColor: statusColors[task.status] }}
                            ></span>
                            <span style={{ color: statusColors[task.status] }}>
                                {task.status}
                            </span>
                        </span>
                    </div>
                </div>

                <div className="mb-10 ml-[6.5rem] flex flex-col items-start">
                    <span className="block text-base font-semibold text-gray-500 mb-2">Change Status</span>
                    <CustomDropdown
                        options={statusOptions.map(opt => ({ value: opt, label: opt }))}
                        value={currentStatus}
                        onChange={setCurrentStatus}
                        placeholder="Change Status"
                    />
                </div>

                
                <div className="flex justify-end gap-6 mt-auto">
                    <button
                        className="px-8 py-3 rounded-lg font-semibold"
                        style={{ background: "#FF4C2426", color: "#FF4C24" }}
                        onClick={() => onDelete(task)}
                    >
                        Delete Task
                    </button>
                    <button
                        className="px-8 py-3 rounded-lg font-semibold text-white"
                        style={{ background: "#60E5AE" }}
                        onClick={handleUpdate}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailsModal;