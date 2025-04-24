import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const pizzaData = [
  {
    name: 'Focaccia',
    ingredients: 'Bread with italian olive oil and rosemary',
    price: 6,
    photoName: 'pizzas/focaccia.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Margherita',
    ingredients: 'Tomato and mozarella',
    price: 10,
    photoName: 'pizzas/margherita.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Spinaci',
    ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
    price: 12,
    photoName: 'pizzas/spinaci.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Funghi',
    ingredients: 'Tomato, mozarella, mushrooms, and onion',
    price: 12,
    photoName: 'pizzas/funghi.jpg',
    soldOut: false,
  },
  {
    name: 'Pizza Salamino',
    ingredients: 'Tomato, mozarella, and pepperoni',
    price: 15,
    photoName: 'pizzas/salamino.jpg',
    soldOut: true,
  },
  {
    name: 'Pizza Prosciutto',
    ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
    price: 18,
    photoName: 'pizzas/prosciutto.jpg',
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = {
  //   color: 'red',
  //   textAlign: 'center',
  //   fontSize: '2rem',
  //   textTransform: 'uppercase',
  //   letterSpacing: '0.1em',
  //   margin: '1rem 0',
  // };

  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <p>We make the best pizza in town</p>
      {/* {numPizzas > 0 && (
        <ul className="pizzas">
          {pizzas.map((pizza) => (
            <Pizza key={pizza.name} pizzaObj={pizza} />
          ))}
        </ul>
      )} */}
      {numPizzas > 0 ? (
        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <Pizza key={pizza.name} pizzaObj={pizza} />
          ))}
        </ul>
      ) : (
        <p>We're still working on our menu. Please, come back later :\</p>
      )}
    </main>
  );
}

// (
//   <li className="pizza sold-out">
//     <img src={pizzaObj.photoName} alt={`Pizza ${pizzaObj.name}`} />
//     <div>
//       <h3>{pizzaObj.name}</h3>
//       <p>{pizzaObj.ingredients}</p>
//       <span>Sold Out</span>
//     </div>
//   </li>
// );

function Pizza({ pizzaObj }) {
  // Takeaways:
  // - Use early returns to avoid deeply nested code
  // - Use early returns to return something entirely different no matter it's just nothing or a different component
  if (pizzaObj.soldOut) return null;

  return (
    <li className="pizza">
      <img src={pizzaObj.photoName} alt={`Pizza ${pizzaObj.name}`} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 2;
  const isOpen = hour >= openHour && hour <= closeHour;

  // Early return is more useful when you want to render entire components conditionally
  // Early return should not be used if you want to render just some pieces of JSX
  // if (!isOpen) {
  //   return (
  //     <footer className="footer">
  //       <p>
  //         We're happy to welcome you between {openHour}:00 and {closeHour}:00.
  //         <span role="img" aria-label="pizza emoji">
  //           🍕
  //         </span>
  //       </p>
  //     </footer>
  //   );
  // }

  // Takeaway: Use ternary operators whenever you need to return some pieces of JSX based on a condition
  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>We're open until {closeHour}:00. Come visit us or order online.</p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
          <span role="img" aria-label="pizza emoji">
            🍕
          </span>
        </p>
      )}
      {/* {new Date().toLocaleTimeString()} .We're currently open. */}
      {/* <p>All rights reserved</p> */}
    </footer>
  );
}

// React 18+ way to render the app
// Create a root element and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
