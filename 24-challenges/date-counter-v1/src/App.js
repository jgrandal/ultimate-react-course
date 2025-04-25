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

  function handleStepDecrement() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function handleStepIncrement() {
    if (step >= 1) {
      setStep(step + 1);
    }
  }

  function handleCountDecrement() {
    setCount(count - step);
  }

  function handleCountIncrement() {
    setCount(count + step);
  }

  return (
    <>
      <div>
        <button onClick={handleStepDecrement}>-</button>
        <span>Step: {step}</span>
        <button onClick={handleStepIncrement}>+</button>
      </div>
      <div>
        <button onClick={handleCountDecrement}>-</button>
        <span>Count: {count}</span>
        <button onClick={handleCountIncrement}>+</button>
      </div>
      <p>
        {count === 0
          ? 'Today is '
          : count > 0
          ? `${count} days from today is `
          : `${count} days ago was `}
        {new Date(Date.now() + count * 24 * 60 * 60 * 1000).toDateString()}
      </p>
    </>
  );
}

export default App;
