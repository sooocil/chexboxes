import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import FallingSimulation from './Pages/FallingSimulation';
import Home from './Pages/Home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/falling-simulation" element={<FallingSimulation />} />
    </Routes>
  );
}

export default App;
