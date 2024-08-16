import React, { useState } from "react";

const CheckboxArray = () => {
  const [width, setWidth] = useState(20); // Number of columns
  const [height, setHeight] = useState(10); // Number of rows

  const generateInitialCheckboxes = () =>
    Array.from({ length: height }, () =>
      Array.from({ length: width }, () => false)
    );

  const [checkboxes, setCheckboxes] = useState(generateInitialCheckboxes());
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [Time, setTime] = useState(200); // Time as state

  const handleWidthChange = (e) => {
    const newWidth = parseInt(e.target.value, 10);
    setWidth(newWidth);
    setCheckboxes(
      Array.from({ length: height }, () =>
        Array.from({ length: newWidth }, () => false)
      )
    );
  };

  const handleHeightChange = (e) => {
    const newHeight = parseInt(e.target.value, 10);
    setHeight(newHeight);
    setCheckboxes(
      Array.from({ length: newHeight }, () =>
        Array.from({ length: width }, () => false)
      )
    );
  };

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

  const isEmpty = (row, col) => {
    return (
      row >= 0 &&
      row < height &&
      col >= 0 &&
      col < width &&
      !checkboxes[row][col]
    );
  };

  const swap = (row1, col1, row2, col2) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[row2][col2] = newCheckboxes[row1][col1];
    newCheckboxes[row1][col1] = false;
    setCheckboxes(newCheckboxes);
  };

  const animateFall = (row, col) => {
    if (checkboxes[row][col]) return; // Prevent double checking

    let newCheckboxes = [...checkboxes];
    newCheckboxes[row][col] = true; // Initially check the clicked checkbox
    setCheckboxes(newCheckboxes);

    const fallInterval = setInterval(() => {
      const below = row + 1;
      const belowLeft = col - 1;
      const belowRight = col + 1;

      if (isEmpty(below, col)) {
        swap(row, col, below, col);
        row++;
      } else if (isEmpty(below, belowLeft)) {
        swap(row, col, below, belowLeft);
        row++;
        col--;
      } else if (isEmpty(below, belowRight)) {
        swap(row, col, below, belowRight);
        row++;
        col++;
      } else {
        clearInterval(fallInterval); // Stop falling when it can't move down anymore
        triggerFallCheck(); // Trigger a final fall check
      }
    }, Time); // Delay between falls
  };

  const triggerFallCheck = () => {
    for (let row = height - 2; row >= 0; row--) {
      for (let col = 0; col < width; col++) {
        if (checkboxes[row][col]) {
          animateFall(row, col);
        }
      }
    }
  };

  const clearCheckboxes = () => {
    setCheckboxes(generateInitialCheckboxes());
  };

  const handleRangeChange = (e) => {
    setTime(e.target.value); // Update Time as state
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
                className={`w-8 h-8 ${
                  checked ? "bg-green-300" : "bg-gray-200"
                } border-2 rounded`}
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
      <p>
        <span className="text-blue-500">Note: </span> You cannot clear until the
        simulation stops
      </p>
      <div className="flex items-center">
        <span className="p-2">0</span>
        <input
          className="m-2"
          type="range"
          min={0}
          max={2000}
          value={Time}
          onChange={handleRangeChange}
        />
        <span className="p-2">2000</span>
      </div>
      <div className="absolute top-[50em] controls p-4 bg-white flex gap-10">
        <label className="flex items-center space-x-2">
          <span className="text-gray-800 font-semibold">Width:</span>
          <input
            type="number"
            value={width}
            min="1"
            onChange={handleWidthChange}
            className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </label>
        <label className="flex items-center space-x-2">
          <span className="text-gray-800 font-semibold">Height:</span>
          <input
            type="number"
            value={height}
            min="1"
            onChange={handleHeightChange}
            className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </label>
      </div>
      <label className="mt-2 text-lg" htmlFor="">
        Speed Delay: {Time} ms
      </label>
    </div>
  );
};

export default CheckboxArray;
