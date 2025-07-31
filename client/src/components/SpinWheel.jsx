import React, { useState, useMemo } from 'react';
import CustomDropdown from './CustomDropdown';
import { FiRefreshCw, FiArrowLeft } from 'react-icons/fi';


const segmentColors = [
    "#4D9DE0", "#E15554", "#E1BC29", "#3BB273", "#7768AE",
    "#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"
];

const SpinWheel = ({ categories, onNavigateToTasks }) => {
    const [rotation, setRotation] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [filterCategory, setFilterCategory] = useState(''); 

    const wheelCategories = useMemo(() => {
        if (!categories || categories.length === 0) return [{ value: 'default', label: 'Add Tasks!' }];
        return categories;
    }, [categories]);

    const segmentAngle = 360 / wheelCategories.length;

    const handleSpin = () => {
        if (spinning) return;

        setSpinning(true);
        // Calculate a random spin: 5 full rotations + a random final position
        const randomStopAngle = Math.floor(Math.random() * 360);
        const newRotation = rotation + (360 * 5) + randomStopAngle;
        setRotation(newRotation);

        // After the animation, determine the winner
        setTimeout(() => {
            setSpinning(false);
            const finalAngle = newRotation % 360;
            const winningIndex = Math.floor((360 - finalAngle) / segmentAngle) % wheelCategories.length;
            const winningCategory = wheelCategories[winningIndex];
            alert(`The wheel landed on: ${winningCategory.label}!`);
        }, 6000); 
    };

    return (
        <div className="flex flex-col items-center justify-between h-full p-4 md:p-8">
            {/* Top Header */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[#222]">Spin for a Random Task!</h2>
                <CustomDropdown
                    options={categories}
                    value={filterCategory}
                    onChange={setFilterCategory}
                    placeholder="Select Category"
                />
            </div>

            {/* Wheel */}
            <div className="wheel-container my-4">
                <div className="wheel-pointer"></div>
                <div
                    className="wheel"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    {wheelCategories.map((cat, i) => (
                        <div
                            key={cat.value}
                            className="wheel-segment"
                            style={{
                                '--i': i,
                                '--color': segmentColors[i % segmentColors.length],
                                '--segment-angle': `${segmentAngle}deg`
                            }}
                        >
                            <span className="wheel-segment-label">{cat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

           
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                    className="btn btn-lg flex items-center gap-2 text-black"
                    style={{ backgroundColor: '#60E5AE', border: 'none' }}
                    onClick={handleSpin}
                    disabled={spinning}
                >
                    <FiRefreshCw className={spinning ? 'animate-spin' : ''} />
                    {spinning ? 'Spinning...' : 'Spin the Wheel'}
                </button>
                <button
                    className="btn btn-lg btn-outline flex items-center gap-2"
                    onClick={onNavigateToTasks}
                >
                    <FiArrowLeft />
                    Go to Tasks
                </button>
            </div>
        </div>
    );
};

export default SpinWheel;