import { useState } from 'react';
import './styles.css';

const faqs = [
  {
    title: 'Where are these chairs assembled?',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How long do I have to return my chair?',
    text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
  },
  {
    title: 'Do you ship to countries outside the EU?',
    text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
  },
];

function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [currOpen, setCurrOpen] = useState(null);
  // const [selectedId, setSelectedId] = useState(null);

  // function handleToggle(id) {
  //   setSelectedId(selectedId === id ? null : id);
  // }

  return (
    <div className="accordion">
      {/* {data.map((el, index) => (
        <AccordionItem
          key={index}
          number={index}
          title={el.title}
          text={el.text}
          isOpen={index === selectedId}
          onHandleToggle={handleToggle}
        />
      ))} */}
      {data.map((el, index) => (
        <AccordionItem
          key={index}
          number={index}
          title={el.title}
          currOpen={currOpen}
          onOpen={setCurrOpen}
        >
          {el.text}
        </AccordionItem>
      ))}
      <AccordionItem
        key={23}
        number={23}
        title="Thinking in React"
        currOpen={currOpen}
        onOpen={setCurrOpen}
      >
        <p>Allow React developers to:</p>
        <ul>
          <li>Break up UI into Components</li>
          <li>Make Components reusable</li>
          <li>Think in unidirectional data flow</li>
          <li>Place state efficiently</li>
        </ul>
      </AccordionItem>
    </div>
  );
}

function AccordionItem({ number, title, currOpen, onOpen, children }) {
  // Derive the isOpen state from currOpen and number
  const isOpen = currOpen === number;

  function handleToggle(number) {
    // Toggle the open state: if the current item is open, close it; otherwise, open it
    onOpen(isOpen ? null : number);
  }

  return (
    <div
      className={`item ${isOpen ? 'open' : 'item'}`}
      onClick={() => handleToggle(number)}
    >
      <p className="number">{number < 9 ? `0${number + 1}` : number + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? '-' : '+'}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

export default App;
