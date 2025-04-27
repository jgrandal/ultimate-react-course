import { useState } from 'react';
import './styles.css';

const questions = [
  {
    id: 3457,
    question: 'What language is React based on?',
    answer: 'JavaScript',
  },
  {
    id: 7336,
    question: 'What are the building blocks of React apps?',
    answer: 'Components',
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: 'JSX',
  },
  {
    id: 1297,
    question: 'How to pass data from parent to child components?',
    answer: 'Props',
  },
  {
    id: 9103,
    question: 'How to give components memory?',
    answer: 'useState hook',
  },
  {
    id: 2002,
    question:
      'What do we call an input element that is completely synchronised with state?',
    answer: 'Controlled element',
  },
];

function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  return (
    <div className="flashcards">
      {questions.map((question) => (
        <div
          key={question.id}
          onClick={() => handleClick(question.id)}
          className={selectedId === question.id ? 'selected' : ''}
        >
          {selectedId === question.id ? (
            <p>{question.answer}</p>
          ) : (
            <p>{question.question}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// Alternative implementation using a separate Card component
// function FlashCards() {
//   const [flippedCardId, setFlippedCardId] = useState(null);

//   function handleCardClick(id) {
//     setFlippedCardId((flippedCardId) => (flippedCardId === id ? null : id));
//   }

//   return (
//     <div className="flashcards">
//       {questions.map((question) => (
//         <Card
//           key={question.id}
//           question={question}
//           isFlipped={flippedCardId === question.id}
//           onCardClick={handleCardClick}
//         />
//       ))}
//     </div>
//   );
// }

// function Card({ question, isFlipped, onCardClick }) {
//   function handleClick() {
//     onCardClick(question.id);
//   }

//   return (
//     <div onClick={handleClick} className={isFlipped ? 'selected' : ''}>
//       {isFlipped ? <p>{question.answer}</p> : <p>{question.question}</p>}
//     </div>
//   );
// }

export default App;
