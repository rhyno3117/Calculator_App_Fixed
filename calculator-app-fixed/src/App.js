import { useState } from "react";
import * as math from "mathjs";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";

const App = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const addToText = (val) => {
    // setError(""); // Uncomment this line if you have a setError function
    setText((text) => text + val);
  };

  const calculateResult = () => {
    try {
      const input = text;
      let calculatedResult = math.evaluate(input);
  
      // Convert the result to a string and limit to 10 characters
      let formattedResult = String(calculatedResult).slice(0, 10);
  
      // Check if the result is in scientific notation
      if (formattedResult.includes('e')) {
        const parts = formattedResult.split('e');
        const mantissa = parts[0].slice(0, 6); // Adjust the length as needed
        const exponent = parts[1];
        formattedResult = mantissa + 'e' + exponent;
      } else if (formattedResult.includes('.')) {
        // Check if the result includes a decimal point
        const parts = formattedResult.split('.');
        const integerPart = parts[0].slice(0, 5); // Adjust the length as needed
        const decimalPart = parts[1].slice(0, 4); // Adjust the length as needed
        formattedResult = integerPart + '.' + decimalPart;
      }
  
      setResult(formattedResult);
    } catch (error) {
      setResult("Error");
    }
  };
  
  
  

  const resetInput = () => {
    setText("");
    setResult("");
  };

  const buttonColor = "#f2a33c";

  return (
    <div className="App">
      <div className="calc-wrapper">
        <Input text={text} result={result} />
        <div className="row">
          <Button symbol="7" handleClick={addToText} />
          <Button symbol="8" handleClick={addToText} />
          <Button symbol="9" handleClick={addToText} />
          <Button symbol="/" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="4" handleClick={addToText} />
          <Button symbol="5" handleClick={addToText} />
          <Button symbol="6" handleClick={addToText} />
          <Button symbol="*" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="1" handleClick={addToText} />
          <Button symbol="2" handleClick={addToText} />
          <Button symbol="3" handleClick={addToText} />
          <Button symbol="+" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="0" handleClick={addToText} />
          <Button symbol="." handleClick={addToText} />
          <Button symbol="=" handleClick={calculateResult} />
          <Button symbol="-" color={buttonColor} handleClick={addToText} />
        </div>
        <Button symbol="Clear" color="red" handleClick={resetInput} />
      </div>
    </div>
  );
};

export default App;
