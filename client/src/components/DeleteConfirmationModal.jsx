import React from 'react';
import DeleteIcon from '../assets/delete.svg';

const DeleteConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-60 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
        <img src={DeleteIcon} alt="Delete" className="w-48 h-48 mb-6" />
        <h2 className="text-2xl font-bold text-[#222] mb-2">Are You Sure?</h2>
        <p className="text-base text-gray-600 mb-8 text-center">Do you really want to delete this task?</p>
        <div className="flex gap-6">
          <button
            className="px-8 py-3 rounded-lg font-semibold"
            style={{ background: "#FF4C2426", color: "#FF4C24" }}
            onClick={onClose}
          >
            No
          </button>
          <button
            className="px-8 py-3 rounded-lg font-semibold text-white"
            style={{ background: "#60E5AE" }}
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;