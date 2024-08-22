import { NavLink } from "react-router-dom";

function MenuNav({ categories }) {
  return (
    <nav className="bg-gray-300 dark:bg-gray-800 p-4">
      <ul className="flex space-x-11 justify-start pt-10 pl-5 pr-20">
        {categories?.map((categories, index) => (
          <li key={`${categories}-${index}`}>
            <NavLink
              to={`/${categories}`}
              className="uppercase text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-500 ease-in-out"
            >
              {categories}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MenuNav;
