import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

function App() {
  // Simulating a step state
  // In a real application, this would be managed by React's useState
  // For this example, we'll just use a constant to simulate the current step
  // const step = 1;
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);

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
      {/* setIsOpen(!isOpen) is updating the state based in the value of the current state */}
      {/* setIsOpen((is) => !is) is the right way for updating the state based in the value of the current state */}
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
            <button
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// function Steps() {
//   const [step, setStep] = useState(1);

//   function handlePrevious() {
//     if (step > 1) {
//       setStep(step - 1);
//       // console.log('Previous step:', step - 1);
//     }
//   }

//   function handleNext() {
//     if (step < messages.length) {
//       setStep(step + 1);
//       // console.log('Next step:', step + 1);
//     }
//   }

//   return (
//     <div className="steps">
//       <div className="numbers">
//         <div className={step >= 1 ? 'active' : ''}>1</div>
//         <div className={step >= 2 ? 'active' : ''}>2</div>
//         <div className={step >= 3 ? 'active' : ''}>3</div>
//       </div>
//       <p className="message">{messages[step - 1]}</p>
//       <div className="buttons">
//         <button
//           style={{ backgroundColor: '#7950f2', color: '#fff' }}
//           onClick={handlePrevious}
//         >
//           Previous
//         </button>
//         <button
//           style={{ backgroundColor: '#7950f2', color: '#fff' }}
//           onClick={handleNext}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

export default App;
