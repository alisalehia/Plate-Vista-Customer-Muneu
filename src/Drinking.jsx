// src/Drinking.jsx
import React, { useState } from 'react';

function Drinking({ openDetail }) {
  const [items] = useState([
    { id: 35, name: 'Red Wine', description: 'A glass of rich red wine.', price: 9.9, category: 'Drinking'  },
    { id: 36, name: 'White Wine', description: 'A glass of crisp white wine.', price: 8.99 },
    // Add more items as needed
  ]);

  return (
    <div>
      <h2 className="text-3xl mb-4">Drinking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/300x200" alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl">{item.name}</h3>
            <p className="text-lg">${item.price.toFixed(2)}</p>
            <button onClick={() => openDetail(item)} className="bg-orange-500 text-white px-4 py-2 rounded mt-2">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Drinking;
