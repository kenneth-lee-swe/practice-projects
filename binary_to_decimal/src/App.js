import './App.css';
import { useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');

  const updateUserInput = (e) => setUserInput(e.target.value);

  const userInputIsBinary = (inputString) => {
    for (let i = 0; i < inputString.length; i++) {
      let curr = inputString[i];
      if (curr !== '1' && curr !== '0') {
        return false;
      }
    }

    return true;
  };

  const binaryToDecimal = (binary) => {
    // if input is not binary, return 0 because this calculation is meaningless
    if (!userInputIsBinary(binary)) return 0;

    let sum = 0;
    let base = 1;
    for (let i = binary.length - 1; i >= 0; i--) {
      let curr = binary[i];
      if (curr === '1') {
        sum += base;
      };

      base *= 2;
    }

    return sum
  };

  let display = () => {
    let display;
    if (userInput === '') {
      display = "Input a binary value to see the decimal conversion";
    } else if (!userInputIsBinary(userInput)) {
      display = "Please only input binary values (1 or 0)"
    } else {
      display = binaryToDecimal(userInput);
    }

    return display;
  }

  return (
    <div className="App">
      <div className="input-display">
        <label htmlFor="user-input">Input Binary:</label>
        <input id='user-input' type="text" onChange={updateUserInput}/>
      </div>
      <div className="binary-display">
        <h2>{ display() }</h2>
      </div>
    </div>
  );
}

export default App;
