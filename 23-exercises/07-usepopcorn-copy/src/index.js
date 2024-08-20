import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from './StartRating';

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      {/* By using the onSetRating prop we can enable to a consumer access to the internal state of a component -> Child to Parent communication */}
      <StarRating color="red" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={['Terrible', 'Bad', 'Ok', 'Good', 'Amazing']}
      defaultRating={3}
    />
    <StarRating maxRating={5} size={24} color="blue" className="test" />
    <Test />
  </React.StrictMode>
);
