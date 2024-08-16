import React from 'react';
import CheckboxArray from '../Component/Checkboxarray';
import { useNavigate } from 'react-router-dom';

const FallingSimulation = () => {
  const navigate = useNavigate();
  
  const home = () => {
    navigate("/");
  }

  return (
    <div className="mainFallingSims">

    <div className="flex flex-row gap-80 items-center justify-center  bg-gray-100 p-4">
      <button 
        onClick={home} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Home
      </button>
      <h1 className="text-3xl font-bold mb-6">Falling Sand Simulation</h1>
    </div>
      <CheckboxArray />
    </div>
  );
}

export default FallingSimulation;
