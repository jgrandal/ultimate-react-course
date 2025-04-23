import { useState } from 'react';
import Item from './Item';

// The only goal of the PackingList component is to render the items array and any new new item added to this array.
export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState('input');

  function handleSortBy(value) {
    setSortBy(value);
  }

  // The sorted items list is created by using Derived State
  // because isn't necessary to create three states (each one for sorted option)
  // Just is necessary to create one state to control the select element and
  // calculate the rest of states (sorted lists) based on the value selected.

  let sortedItems = items;

  if (sortBy === 'description') {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === 'packed') {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          name="actions"
          id="actions"
          value={sortBy}
          onChange={(e) => handleSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
