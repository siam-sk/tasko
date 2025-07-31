import React from 'react';
import CongratsIcon from '../assets/congrats.svg';

const CongratsModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-70 bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-2xl p-16 flex flex-col items-center max-w-xl w-full relative">
        <button
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={CongratsIcon} alt="Congrats" className="w-96 h-72 mb-8" />
        <h2 className="text-2xl font-bold text-[#222] mb-4">Successfully completed the task!</h2>
        <p className="text-base text-gray-600 mb-4 text-center">
          Congratulations! You have successfully completed the task and you got 20 points.
        </p>
      </div>
    </div>
  );
};

export default CongratsModal;