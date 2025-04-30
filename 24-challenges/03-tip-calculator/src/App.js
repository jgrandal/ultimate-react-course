import './styles.css';
import { useState } from 'react';

function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  // const [bill, setBill] = useState(0);
  const [bill, setBill] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [friendPercentage, setFriendPercentage] = useState(0);

  const tip = bill * ((percentage + friendPercentage) / 2 / 100);

  function handleSetBill(e) {
    setBill(Number(e.target.value));
  }

  function handlePercentageChange(e) {
    setPercentage(Number(e.target.value));
  }

  function handleFriendPercentageChange(e) {
    setFriendPercentage(Number(e.target.value));
  }

  function handleReset() {
    setBill(0);
    setPercentage(0);
    setFriendPercentage(0);
  }
  return (
    <>
      <BillInput bill={bill} onSetBill={handleSetBill}>
        How much was the bill?{' '}
      </BillInput>
      <SelectPercentage
        percentage={percentage}
        onSelect={handlePercentageChange}
      >
        How did you like the service?{' '}
      </SelectPercentage>
      <SelectPercentage
        percentage={friendPercentage}
        onSelect={handleFriendPercentageChange}
      >
        How did your friend like the service?{' '}
      </SelectPercentage>

      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </>
      )}
    </>
  );
}

function BillInput({ bill, onSetBill, children }) {
  return (
    <div>
      <label htmlFor="bill">{children}</label>
      <input
        type="text"
        id="bill"
        value={bill}
        onChange={onSetBill}
        placeholder="Bill value..."
      />
    </div>
  );
}

function SelectPercentage({ percentage, onSelect, children }) {
  return (
    <div>
      <label htmlFor="percentage">{children}</label>
      <select id="percentage" value={percentage} onChange={onSelect}>
        <option value="0">Dissatified (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <div>
      <h2>
        You pay ${bill + tip} (${bill} + ${tip} tip)
      </h2>
    </div>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}

export default App;
