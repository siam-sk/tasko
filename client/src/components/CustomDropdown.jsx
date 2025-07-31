import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';


function CustomDropdown({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);

  
  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <div className="relative min-w-[12rem]">
      <button
        type="button"
        className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 bg-white text-base font-medium focus:outline-none"
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)}
      >
        <span>
          {value ? options.find(o => o.value === value)?.label : placeholder}
        </span>
        <FiChevronDown className="ml-2" />
      </button>
      {open && (
        <div className="absolute left-0 top-full w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
          {options.map(option => (
            <div
              key={option.value}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#60E5AE22]`}
              onMouseDown={() => handleOptionClick(option.value)}
            >
              <span className="mr-2">
                {value === option.value
                  ? (
                    <span className="flex w-4 h-4 rounded-sm border-2 border-[#60E5AE] bg-[#60E5AE] items-center justify-center text-white">
                      &#10003;
                    </span>
                  )
                  : (
                    <span className="inline-block w-4 h-4 rounded-sm border-2 border-gray-300"></span>
                  )
                }
              </span>
              <span className="text-base">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;