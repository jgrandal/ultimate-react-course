import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

// const style = { backgroundColor: '#7950f2', color: '#fff' };

function App() {
  return (
    <>
      <Steps />
      <StepMessage step={1}>
        <p>Pass in content</p>
        <p>🎉</p>
      </StepMessage>
      <StepMessage step={2}>
        <p>Read children prop</p>
        <p>👌</p>
      </StepMessage>
    </>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  // const [test, setTest] = useState({ name: 'Jorge' });

  function handlePrevious() {
    if (step > 1) setStep((step) => step - 1);
  }

  function handleNext() {
    if (step < 3) setStep((step) => step + 1);

    // BAD PRACTICE. It isn't possible to mutate objects on this way.
    // React is all about inmmutability and functional state updates.
    // (test.name = 'Fred') // Works but it's a bad practice
    // setTest({ name: 'JG' });
  }

  function handleIsOpen() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <button className="close" onClick={handleIsOpen}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step === 1 ? 'active' : ''}>1</div>
            <div className={step === 2 ? 'active' : ''}>2</div>
            <div className={step === 3 ? 'active' : ''}>3</div>
          </div>
          {/* All the content passed inside the StepMessage component is rendered by this component by the use of children Prop. */}
          {/* All the content passed is indeed JSX. */}
          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button
                bgColor="#e7e7e7"
                textColor="#333"
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
              >
                Learn how
              </Button>
            </div>
          </StepMessage>

          <div className="buttons">
            {/* Pass content to the Button component by using the children prop. */}
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              {/* The content to the Button component by using the children prop is JSX. */}
              👈 Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next 👉
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

// Create a Reusable Button in React
// The Button component receives some Props that are used inside the Button component.
// Without the children prop it will be necessary to add a new prop to indicate the position of the emoji.
// function Button({ bgColor, textColor, onClick, text, emoji, direction }) {
//   return (
//     <button
//       style={{ backgroundColor: bgColor, color: textColor }}
//       onClick={onClick}
//     >
//       {direction === 'previous' && (
//         <>
//           <span> {emoji}</span> {text}
//         </>
//       )}
//       {direction === 'next' && (
//         <>
//           {text} <span> {emoji}</span>
//         </>
//       )}
//     </button>
//   );
// }

// With the children prop:
// - It isn't necessary define more and more props to pass the content of the component.
// - The content added between <Button> ... </Button> will be accessible inside the Button component.
// - You are able to pass whatever JSX into the component so the component can use and display it. Same as when use HTML when the content is defined between tags.
// - The component doesn't need to know what content it will receive. It acts like a placeholder for the upcoming content.
// - The children prop is received automatically for any React component.
// - The value of the children prop is exactly what is between the opening and closed tag of the component.
// - children is a predefined word in React
// - Think in the children prop as a hole that can be filled by us passing in the content into the component

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}:</h3> {children}
    </div>
  );
}

export default App;
