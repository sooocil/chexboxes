import React, { useState } from "react";

const CheckboxArray = () => {
  const width = 20; // Number of columns
  const height = 10; // Number of rows

  const initialCheckboxes = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => false)
  );

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [velocity, setVelocity] = useState(200); // Velocity as state

  const handleMouseDown = (row, col) => {
    setIsMouseDown(true);
    animateFall(row, col);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown) {
      animateFall(row, col);
    }
  };

  const animateFall = (row, col) => {
    if (checkboxes[row][col]) return; // Prevent double checking

    let newCheckboxes = [...checkboxes];
    newCheckboxes[row][col] = true; // Initially check the clicked checkbox
    setCheckboxes(newCheckboxes);

    const fallInterval = setInterval(() => {
      if (row < height - 1 && !newCheckboxes[row + 1][col]) {
        newCheckboxes[row][col] = false; // Uncheck current position
        row++;
        newCheckboxes[row][col] = true; // Check the next position
        setCheckboxes([...newCheckboxes]);
      } else {
        clearInterval(fallInterval); // Stop falling when it can't move down anymore
      }
    }, velocity); // Delay between falls, now using state
  };

  const clearCheckboxes = () => {
    console.log("Clearing checkboxes"); // Debug log
    const clearedCheckboxes = checkboxes.map(rowArray =>
      rowArray.map(() => false)
    );
    setCheckboxes(clearedCheckboxes);
  };

  const handleRangeChange = (e) => {
    setVelocity(e.target.value);  // Update velocity as state
  };

  return (
    <div className="flex flex-col items-center" onMouseUp={handleMouseUp}>
      <div className="grid grid-cols-20 gap-1 mb-4">
        {checkboxes.map((rowArray, rowIndex) => (
          <div key={rowIndex} className="flex space-x-1">
            {rowArray.map((checked, colIndex) => (
              <input
                key={colIndex}
                type="checkbox"
                checked={checked}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onChange={() => {}} // This can remain empty since we're handling checks via mouse events
                className={`w-8 h-8 ${checked ? 'bg-green-300' : 'bg-gray-200'} border-2 rounded`}
              />
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={clearCheckboxes}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Clear
      </button>
      <p><span className="text-blue-500">Note: </span> You cannot clear untill the simulation stops</p>
      <div className="flex items-center">
        <span className="p-2">0</span>
        <input
          className="m-2"
          type="range"
          min={0}
          max={2000}
          value={velocity}
          onChange={handleRangeChange}
        />
        <span className="p-2">2000</span>
      </div>
      <label className="mt-2 text-lg" htmlFor="">
        Velocity: {velocity}
      </label>
    </div>
  );
};

export default CheckboxArray;
