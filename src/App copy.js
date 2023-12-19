import React, { useState } from 'react';

const App = () => {
  const [selectValue, setSelectValue] = useState('');
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectValue(selectedValue);
    // Logic to change number fields based on the select value
    if (selectedValue === 'option1') {
      setNumber1(10);
      setNumber2(20);
    } else if (selectedValue === 'option2') {
      setNumber1(30);
      setNumber2(40);
    } else {
      setNumber1(0);
      setNumber2(0);
    }
  };

  return (
    <div>
      <select value={selectValue} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      <br />
      <label>Number 1:</label>
      <input type="number" value={number1} readOnly />
      <br />
      <label>Number 2:</label>
      <input type="number" value={number2} readOnly />
    </div>
  );
};

export default App;
