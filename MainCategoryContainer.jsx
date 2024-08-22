import { useEffect, useState } from "react";
import axios from "axios";

const MainCategoryContainer = ({ categoryName, openDetail, searchQuery }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const regex = new RegExp(`\\b(${searchQuery})`, 'gi');
  useEffect(() => {
    const fetchItems = async () => {
      try {
        if(searchQuery === "") {
        const { data } = await axios.get(
          `https://plate-vista-api.vercel.app/api/v1/menu-items?category=${categoryName}`
        );
        setItems(data);
        setLoading(false);
    }else{
        const { data } = await axios.get(
            `https://plate-vista-api.vercel.app/api/v1/menu-items`
        );
        setItems(data);
        setLoading(false);
    }
      } catch (error) {
        console.log(error);
        setLoading(true);
      }
    };
    fetchItems();
  }, [categoryName, searchQuery]);
  return (
    <div>
      <h2 className="text-3xl mb-4 uppercase ">{categoryName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-40">
        {items?.filter( item => item.title.match(regex)).map((item) => (
          <div
            key={item._id}
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md opacity-0 animate-fade-in transition-all duration-1000 ease-in-out" // Increased duration to 1000ms for smoothness
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg mb-4 transition-transform duration-1000 ease-in-out transform hover:scale-105" // Slowed down hover effect
            />
            <h3 className="text-xl">{item.title}</h3>
            <p className="text-lg">${item.price}</p>
            <button
              onClick={() => openDetail(item)}
              className="bg-orange-500 text-white px-4 py-2 rounded mt-2 transition-colors duration-1000 ease-in-out hover:bg-orange-600" // Slowed down button hover effect
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCategoryContainer;
