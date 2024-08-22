import React from 'react';
import { NavLink } from 'react-router-dom';

function MenuNav() {
    return (
        <nav className="bg-gray-100 dark:bg-gray-800 p-4">
            <ul className="flex space-x-11 justify-start pt-10 pl-5 pr-20">
                <li>
                    <NavLink 
                        to="/main-dish" 
                        className="text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-500 ease-in-out" // Increased duration to 500ms
                    >
                        Main Dish
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/family-style-meals" 
                        className="text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-500 ease-in-out" // Increased duration to 500ms
                    >
                        Family-Style Meals
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/appetizers" 
                        className="text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-500 ease-in-out" // Increased duration to 500ms
                    >
                        Appetizers
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/classic-entrees" 
                        className="text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-500 ease-in-out" // Increased duration to 500ms
                    >
                        Classic Entrees
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/amazing-alfredos" 
                        className="text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-500 ease-in-out" // Increased duration to 500ms
                    >
                        Amazing Alfredos
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/soups-salads-breadsticks" 
                        className="text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-500 ease-in-out" // Increased duration to 500ms
                    >
                        Soups, Salads & Breadsticks
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/drinking" 
                        className="text-gray-900 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-500 ease-in-out" // Increased duration to 500ms
                    >
                        Drinking
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default MenuNav;
