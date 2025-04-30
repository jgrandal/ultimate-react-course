import { useState } from 'react';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  // const date = new Date(
  //   Date.now() + count * 24 * 60 * 60 * 1000
  // ).toDateString();

  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  // function handleStepDecrement() {
  //   if (step > 1) {
  //     setStep((step) => step - 1);
  //   }
  // }

  // function handleStepIncrement() {
  //   if (step >= 1) {
  //     setStep((step) => step + 1);
  //   }
  // }

  function handleStepChange(e) {
    setStep(Number(e.target.value));
  }

  function handleCountDecrement() {
    setCount((count) => count - step);
  }

  function handleCountIncrement() {
    setCount((count) => count + step);
  }

  function handleCountChange(e) {
    setCount(Number(e.target.value));
  }

  function handleReset() {
    setCount(0);
    setStep(1);
  }

  return (
    <>
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={handleStepChange}
        />
        <span> {step}</span>
      </div>
      <div>
        <button onClick={handleCountDecrement}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => handleCountChange(e)}
        />
        <button onClick={handleCountIncrement}>+</button>
      </div>
      <p>
        {count === 0
          ? 'Today is '
          : count > 0
          ? `${count} days from today is `
          : `${Math.abs(count)} days ago was `}
        {date.toDateString()}
      </p>
      {count !== 0 || step !== 1 ? (
        <button onClick={handleReset}>Reset</button>
      ) : null}
    </>
  );
}

export default App;
