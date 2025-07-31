import React, { useState } from 'react'
import { FiClock, FiList, FiRefreshCw, FiChevronDown, FiPlus, FiTrash2, FiCalendar, FiEdit, FiArrowLeft } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'

const tasks = [
  {
    id: 1,
    title: "Design Landing Page",
    description: "Create a modern landing page for the new product.",
    date: "Thu, Aug 1 - 2025",
    status: "pending"
  },
  {
    id: 2,
    title: "API Integration",
    description: "Integrate payment gateway API.",
    date: "Fri, Aug 2 - 2025",
    status: "inprogress"
  },
  {
    id: 3,
    title: "Write Documentation",
    description: "Complete user guide for dashboard.",
    date: "Sat, Aug 3 - 2025",
    status: "done"
  }
]

const statusColors = {
  pending: "#E343E6",
  inprogress: "#DD9221",
  done: "#21D789"
}

const categories = [
  { value: "Design", label: "Design" },
  { value: "Development", label: "Development" },
  { value: "Documentation", label: "Documentation" }
]

const statuses = [
  { value: "Ongoing", label: "Ongoing" },
  { value: "Pending", label: "Pending" },
  { value: "Done", label: "Done" }
]

// Custom Dropdown Component
function CustomDropdown({ options, value, onChange, placeholder }) {
  const [open, setOpen] = useState(false)
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
              onMouseDown={() => { onChange(option.value); setOpen(false); }}
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
  )
}

const Dashboard = () => {
  const fullName = "Full Name"
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [modalTask, setModalTask] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showCongratsModal, setShowCongratsModal] = useState(false)

  const handleSubmit = () => {
    if (selectedStatus === "Done") {
      setShowCongratsModal(true)
    } else {
      setModalTask(null)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Top 40% */}
      <div className="relative h-[40vh] bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#60E5AE33] to-[#60E5AE] opacity-40 pointer-events-none"></div>
        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-12 py-6 bg-transparent z-20">
          <div className="flex items-center gap-2">
            <FiClock size={24} className="text-[#60E5AE]" />
            <span className="font-bold text-xl text-white">Tasko</span>
          </div>
          <div className="flex items-center gap-8">
            <button className="flex items-center gap-2 text-white font-semibold hover:text-[#60E5AE] transition">
              <FiList size={22} />
              Task List
            </button>
            <button className="flex items-center gap-2 text-white font-semibold hover:text-[#60E5AE] transition">
              <FiRefreshCw size={22} />
              Spin
            </button>
          </div>
          <div className="flex items-center gap-3">
            <FaUserCircle size={24} className="text-[#60E5AE]" />
            <span className="text-white font-semibold">{fullName}</span>
            <FiChevronDown size={22} className="text-white" />
          </div>
        </nav>
        {/* Right Image */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 h-[80%] flex items-center">
          <img
            src="/src/assets/login.png"
            alt="Login"
            className="w-full h-full object-contain opacity-80 mix-blend-multiply"
            style={{ filter: 'brightness(0.7)' }}
          />
        </div>
        {/* Greeting Section */}
        <div className="absolute left-12 top-24 flex flex-col items-start z-10">
          <h1 className="text-2xl font-bold" style={{ color: '#60E5AE' }}>
            Hi {fullName},
          </h1>
          <p className="text-4xl font-semibold text-white mt-2">
            Welcome to Dashboard
          </p>
        </div>
      </div>
      {/* Bottom 60% */}
      <div className="h-[60vh] bg-base-200"></div>
      {/* Floating Dashboard Content */}
      <div className="absolute top-[4vh] left-0 w-full h-[80vh] flex justify-center items-center z-30">
        <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl px-16 py-12 flex flex-col">
          {/* Header Row */}
          <div className="flex justify-between items-center mb-10">
            {/* Left: All Task List */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#222]">All Task List</span>
            </div>
            {/* Right: Custom Dropdowns and Add Button */}
            <div className="flex items-center gap-4">
              <CustomDropdown
                options={categories}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Select Task Category"
              />
              <CustomDropdown
                options={statuses}
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="All Tasks"
              />
              <button className="btn flex items-center gap-2" style={{ backgroundColor: '#60E5AE', color: '#222', border: 'none' }}>
                <FiPlus size={20} />
                Add New Task
              </button>
            </div>
          </div>
          {/* Task Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tasks.map(task => (
              <div key={task.id} className="bg-white border border-gray-300 rounded-xl shadow p-6 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  {/* Title and icon on the left */}
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => setModalTask(task)}>
                    <img src="/src/assets/task-icon.png" alt="Task Icon" className="w-7 h-7" />
                    <h3 className="text-lg font-bold text-[#222]">{task.title}</h3>
                  </div>
                  <button className="text-[#E343E6] hover:text-red-600">
                    <FiTrash2 size={20} />
                  </button>
                </div>
                <p className="text-base-content/70 mb-6">{task.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiCalendar size={18} className="text-[#60E5AE]" />
                    <span className="text-sm text-base-content">{task.date}</span>
                  </div>
                  {/* Task status: colored dot and text */}
                  <span className="flex items-center gap-1 text-xs font-bold">
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: statusColors[task.status] }}
                    ></span>
                    <span style={{ color: statusColors[task.status] }}>
                      {task.status === 'pending' && 'Pending'}
                      {task.status === 'inprogress' && 'In Progress'}
                      {task.status === 'done' && 'Done'}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal */}
      {modalTask && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-16 relative flex flex-col">
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-3xl font-bold text-[#222]">Task Details</span>
              <div className="flex items-center gap-4">
                {selectedStatus === "Done" && (
                  <span
                    className="text-small font-bold"
                    style={{ color: "#C716F3" }}
                  >
                    20 Points
                  </span>
                )}
                <button className="flex items-center gap-2 px-5 py-3 rounded-lg font-semibold" style={{ background: "#FFAB001A", color: "#FFAB00" }}>
                  <FiEdit size={22} />
                  Edit Task
                </button>
                <button
                  className="flex items-center gap-2 px-5 py-3 rounded-lg font-semibold"
                  style={{ background: "#60E5AE", color: "#fff" }}
                  onClick={() => setModalTask(null)}
                >
                  <FiArrowLeft size={22} />
                  Back
                </button>
              </div>
            </div>
            <hr className="border-t border-gray-200 mb-8" />
            
            <div className="flex items-center mb-10">
              <img src="/src/assets/task-icon2.png" alt="Task Icon" className="w-20 h-20 mr-8" />
              <div>
                <h2 className="text-3xl font-bold text-[#222] mb-3">{modalTask.title}</h2>
                <p className="text-lg text-gray-600">{modalTask.description}</p>
              </div>
            </div>
            
            <div className="mb-2 ml-[6.5rem]">
              <span className="block text-base font-semibold text-gray-500 mb-2">End Date</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <FiCalendar size={26} className="text-[#60E5AE]" />
                  <span className="text-lg font-semibold">{modalTask.date}</span>
                </div>
                <span className="mx-3 text-gray-400 font-bold text-xl">|</span>
                <span className="flex items-center gap-2 text-lg font-bold">
                  <span
                    className="inline-block w-4 h-4 rounded-full"
                    style={{ backgroundColor: statusColors[modalTask.status] }}
                  ></span>
                  <span style={{ color: statusColors[modalTask.status] }}>
                    {modalTask.status === 'pending' && 'Pending'}
                    {modalTask.status === 'inprogress' && 'In Progress'}
                    {modalTask.status === 'done' && 'Done'}
                  </span>
                </span>
              </div>
            </div>
            
            <div className="mb-10 ml-[6.5rem] flex flex-col items-start">
              <div className="mb-6"></div>
              <span className="block text-base font-semibold text-gray-500 mb-2">Change Status</span>
              <CustomDropdown
                options={statuses}
                value={selectedStatus || (modalTask.status === 'pending'
                  ? 'Pending'
                  : modalTask.status === 'inprogress'
                  ? 'Ongoing'
                  : 'Done')}
                onChange={setSelectedStatus}
                placeholder="Change Status"
              />
            </div>
            {/* Bottom Buttons */}
            <div className="flex justify-end gap-6 mt-8">
              <button
                className="px-8 py-3 rounded-lg font-semibold"
                style={{ background: "#FF4C2426", color: "#FF4C24" }}
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Task
              </button>
              <button
                className="px-8 py-3 rounded-lg font-semibold"
                style={{ background: "#60E5AE", color: "#fff" }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            
            {showDeleteModal && (
              <div className="fixed inset-0 flex items-center justify-center z-60 bg-black bg-opacity-30">
                <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
                  <img src="/src/assets/delete.svg" alt="Delete" className="w-48 h-48 mb-6" />
                  <h2 className="text-2xl font-bold text-[#222] mb-2">Are You Sure!!</h2>
                  <p className="text-base text-gray-600 mb-8 text-center">Do you want to delete this Task on this app?</p>
                  <div className="flex gap-6">
                    <button
                      className="px-8 py-3 rounded-lg font-semibold"
                      style={{ background: "#FF4C2426", color: "#FF4C24" }}
                      onClick={() => setShowDeleteModal(false)}
                    >
                      No
                    </button>
                    <button
                      className="px-8 py-3 rounded-lg font-semibold"
                      style={{ background: "#60E5AE", color: "#fff" }}
                      onClick={() => {
                        setShowDeleteModal(false)
                        setModalTask(null)
                      }}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {showCongratsModal && (
              <div className="fixed inset-0 flex items-center justify-center z-70 bg-black bg-opacity-30">
                <div className="bg-white rounded-2xl shadow-2xl p-16 flex flex-col items-center max-w-xl w-full relative">
                  <button
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-3xl"
                    onClick={() => {
                      setShowCongratsModal(false)
                      setModalTask(null)
                    }}
                  >
                    &times;
                  </button>
                  <img src="/src/assets/congrats.svg" alt="Congrats" className="w-96 h-72 mb-8" />
                  <h2 className="text-2xl font-bold text-[#222] mb-4">Successfully completed the task!</h2>
                  <p className="text-base text-gray-600 mb-4 text-center">
                    Congratulations! You have successfully completed the task and you got 20 points.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard