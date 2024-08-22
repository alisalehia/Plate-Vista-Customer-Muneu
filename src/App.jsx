import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import MenuNav from './MenuNav';
import MainDish from './MainDish';
import FamilyStyleMeals from './FamilyStyleMeals';
import Appetizers from './Appetizers';
import ClassicEntrees from './ClassicEntrees';
import AmazingAlfredos from './AmazingAlfredos';
import SoupsSaladsBreadsticks from './SoupsSaladsBreadsticks';
import Drinking from './Drinking';
import MenuDetail from './MenuDetail';
import Cart from './Cart';
import OrderSummary from './OrderSummary';
import Checkout from './Checkout';
import OrderConfirmation from './OrderConfirmation';
import OrderNow from './OrderNow';
import Footer from './Footer';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import { CartProvider } from './CartContext';

import './app.css'
function App() {
    const [cart, setCart] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
    };

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
            if (existingItemIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += item.quantity;
                return updatedCart;
            } else {
                return [...prevCart, item];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    };

    const openDetail = (item) => {
        setSelectedItem(item);
    };

    const closeDetail = () => {
        setSelectedItem(null);
    };

    const handlePlaceOrder = (orderDetails) => {
        console.log('Order placed:', orderDetails);
        setCart([]);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <CartProvider> {/* Wrap your entire app with CartProvider */}
            <Router> {/* Ensure everything is wrapped within Router */}
                
                <div className={`min-h-screen ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'}`}>
                    <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} onSearch={handleSearch} />
                    <MenuNav />
                    <div className="container mx-auto p-6 flex flex-col md:flex-row ">
                        <div className="w-full md:w-3/4 pr-0 md:pr-10">
                            <Routes>
                                <Route path="/main-dish" element={<MainDish openDetail={openDetail} searchQuery={searchQuery} />} />
                                <Route path="/family-style-meals" element={<FamilyStyleMeals openDetail={openDetail} searchQuery={searchQuery} />} />
                                <Route path="/appetizers" element={<Appetizers openDetail={openDetail} searchQuery={searchQuery} />} />
                                <Route path="/classic-entrees" element={<ClassicEntrees openDetail={openDetail} searchQuery={searchQuery} />} />
                                <Route path="/amazing-alfredos" element={<AmazingAlfredos openDetail={openDetail} searchQuery={searchQuery} />} />
                                <Route path="/soups-salads-breadsticks" element={<SoupsSaladsBreadsticks openDetail={openDetail} searchQuery={searchQuery} />} />
                                <Route path="/drinking" element={<Drinking openDetail={openDetail} searchQuery={searchQuery} />} />
                                <Route path="/checkout" element={<Checkout cart={cart} onPlaceOrder={handlePlaceOrder} />} />
                                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                                <Route path="/about" element={<AboutUs />} />
                                <Route path="/contact" element={<ContactUs />} />
                                <Route path="/" element={<Navigate to="/main-dish" />} />
                            </Routes>
                        </div>
                        <div className="w-full md:w-1/4 flex flex-col space-y-4 mt-6 md:mt-0 ">
                            <Cart cart={cart} removeFromCart={removeFromCart} />
                            <OrderSummary cart={cart} />
                        </div>
                    </div>
                    <OrderNow cart={cart} />
                    <Footer />
                </div>
                {selectedItem && <MenuDetail item={selectedItem} addToCart={addToCart} closeDetail={closeDetail} />}
            </Router>
        </CartProvider>
    );
}

export default App;
