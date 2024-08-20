export default function Stats({ items }) {
  // If there aren't items in the array isn't necessary to do all the calculations
  // so, if better just return the message for an empty packing list
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  }
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage =
    numPacked > 0 ? Math.round((numPacked / numItems) * 100) : 0;
  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? `You got everything! Ready to go ✈️`
          : `💼 You have ${numItems} items on your list, and you already packed
          ${numPacked}(${percentage}%)`}
      </em>
    </footer>
  );
}
