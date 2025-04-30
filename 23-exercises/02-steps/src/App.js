import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

function App() {
  return <Steps />;
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }

  function handleNext() {
    if (step < messages.length) {
      setStep((s) => s + 1);
    }
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>
          <p className="message">{messages[step - 1]}</p>
          <div className="buttons">
            {/* <Button
              textColor="#fff"
              bgColor="#7950f2"
              onClick={handlePrevious}
              text="Previous"
              emoji="👈"
            />
            <Button
              textColor="#fff"
              bgColor="#7950f2"
              onClick={handlePrevious}
              text="Next"
              emoji="👉"
            /> */}
            <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            <Button textColor="#fff" bgColor="#7950f2" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

// Building a reusable Button Component
// function Button({ textColor, bgColor, onClick, text, emoji, side }) {
//   return (
//     <button
//       style={{ backgroundColor: bgColor, color: textColor }}
//       onClick={onClick}
//     ></button>
//   );
// }

// Building a reusable Button Component with children prop
// Children prop, instead of text, emoji, side that are referring to the content of the button element
// what if we could simply pass the content right into the button as children? or in other words,
// what if we could pass some JSX into the button component and it could use (would render) that JSX (inside the button) to display the content?
// This is a common pattern in React, and it allows us to create more flexible and reusable components.
function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default App;
