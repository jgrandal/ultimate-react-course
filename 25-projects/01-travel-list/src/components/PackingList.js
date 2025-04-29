import { useState } from 'react';
import Item from './Item';

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;
  if (sortBy === 'input') {
    sortedItems = items;
  } else if (sortBy === 'description') {
    sortedItems = items
      // .slice() is needed before .sort() because sort() mutates the original array!
      .slice()
      // localeCompare() is used for alphabetical string comparison
      .sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === 'packed') {
    sortedItems = items
      // .slice() is needed before .sort() because sort() mutates the original array!
      .slice()
      // Boolean packed status is converted to numbers for sorting (false = 0, true = 1)
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
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option key={1} value={'input'}>
            Sort by input order
          </option>
          <option key={2} value={'description'}>
            Sort by description
          </option>
          <option key={3} value={'packed'}>
            Sort by packed status
          </option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}

export default PackingList;
