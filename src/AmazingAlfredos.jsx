import React, { useState } from 'react';

function AmazingAlfredos({ openDetail, searchQuery }) {
  const [items] = useState([
    { id: 1, name: 'Chicken Alfredo', description: 'Fettuccine alfredo with grilled chicken.', price: 20.99 },
    { id: 2, name: 'Shrimp Alfredo', description: 'Fettuccine alfredo with shrimp.', price: 22.99 },
    // Add more items as needed
  ]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl mb-4">Amazing Alfredos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-40">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md opacity-0 animate-fade-in transition-all duration-1000 ease-in-out"
          >
            <img 
              src="https://via.placeholder.com/300x200" 
              alt={item.name} 
              className="w-full h-40 object-cover rounded-lg mb-4 transition-transform duration-1000 ease-in-out transform hover:scale-105"
            />
            <h3 className="text-xl">{item.name}</h3>
            <p className="text-lg">${item.price.toFixed(2)}</p>
            <button 
              onClick={() => openDetail(item)} 
              className="bg-orange-500 text-white px-4 py-2 rounded mt-2 transition-colors duration-1000 ease-in-out hover:bg-orange-600"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AmazingAlfredos;
