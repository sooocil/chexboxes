import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/falling-simulation");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
<h1 className="selection text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-red-600 drop-shadow-lg">
  Chexboxes
</h1>
      <br />
      <h1 className="text-4xl font-bold mb-2">Checkbox Simulation</h1>
      <h3 className="text-2xl mb-4">Algorithms and Physics Simulation with Checkboxes</h3>
      <p className="mb-6 text-center">
        Click on the Falling Simulation link to see the simulation
      </p>
      <button 
        onClick={handleNavigation} 
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition mb-4"
      >
        Falling Simulation
      </button>
      <label htmlFor="">Other Projects : </label>
      <br />
      {/* Loader-like div with tooltip */}
      <div className="relative cursor-pointer group mb-6">
        <div className="w-44 h-12 bg-black rounded delay-75 animate-pulse"></div>
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[10px] w-max bg-white text-black text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Coming Soon
        </div>
      </div>
      <div className="relative cursor-pointer group mb-6">
        <div className="w-44 h-12 bg-black rounded delay-75 animate-pulse"></div>
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[10px] w-max bg-white text-black text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Coming Soon
        </div>
   
      </div>
    </div>
  );
}

export default Home;
