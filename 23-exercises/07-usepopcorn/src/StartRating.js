import { useState } from 'react';
import PropTypes from 'prop-types';

// The styles object are defined outside of the component because:
// - It doesn't depends of anything in the component.
// - It never change

// This avoid that JS re-render this object each time that the component is re-rendered.
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
};

// const textStyle = {
//   lineHeight: 0,
//   margin: 0,
// };

// Since you are building a highly reusable component you need to account
// the scenario where the user didn't specify a maxRating. For this use destructuring
// with a default value associated. // Setting default props in a Component

// Defining an API by adding some props to make the component reusable.

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  color = '#fcc419',
  size = 48,
  className = '',
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  // Because you want that the UI re-render based on an event (that ocurrs in the screen), you need state
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  // const isFull = rating >= i + 1;

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  function handleTemporaryRating(tempRating) {
    setTempRating(tempRating);
  }

  // The styles object is moved inside the component because some properties
  // depends of the props passed to the component.
  const textStyle = {
    lineHeight: 0,
    margin: 0,
    fontSize: `${size / 1.5}px`,
    color: color,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            color={color}
            size={size}
            onRate={() => handleRating(i + 1)}
            // Render a full or empty star based in the condition that evaluates the current
            // rating value vs the index + 1 to define if the star should be full or empty.
            // To determinate if a star is full or not, you should just compare the current
            // set rating to the index of the current star. -> Similar to the Steps components.
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1} // If tempRating is defined then calculate to fill the star, if not just calculate to fill the star with the current rating.
            // full={
            //   tempRating
            //     ? tempRating >= i + 1
            //     : rating
            //     ? rating >= i + 1
            //     : false
            // }
            onHoverIn={() => handleTemporaryRating(i + 1)}
            onHoverOut={() => handleTemporaryRating(0)}
          />
        ))}
      </div>
      {/* If tempRating is defined then show that tempRating, if previos not defined then show the current rating, if previous not defined then just show an empty string. */}
      <p style={textStyle}>
        {/* {console.log(tempRating - 1, rating - 1)} */}
        {/* Really important to review and think */}
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
      </p>
    </div>
  );
}

// const starStyle = {
//   width: size,
//   height: size,
//   display: 'block',
//   cursor: 'pointer',
// };

// TODO tasks:
// Make the component dynamically:
// When the user click on one star, then display the current rating in the paragraph element.
// Display only the amount of stars equal to the rating in full and all the other stars empty.
// Whenever a user hover the stars, he gets a temporary rating exactly with the numbers of stars
// that are currently being hovered. This temporary rating is completely independent from the
// rating that is actually set right now.

// Passing an event handler function from the component that owns the state (Parent) into a component
// that want to actually update that state (Child). -> Child to Parent communication.
function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  // The styles object is moved inside the component because some properties
  // depends of the props passed to the component.
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'block',
    cursor: 'pointer',
  };
  return (
    // You actually need to listen for the onClick event on an HTML (JSX) element.
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR



*/
