import { useState } from 'react';

// The only goal of the Form component is to add a new item to the items array but not to render it.
// The Form component is actually responsible for creating a new item so you need to give to this component access to a function that can update the state.
// The function is handleAddItems that is passed to the Form component via Props with the property name onAddItems.
export default function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription('');
    setQuantity(1);

    console.log(newItem);
  }

  console.log(description);
  console.log(quantity);

  return (
    // <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your ☺️ trip?</h3>
      <select
        name=""
        id=""
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
