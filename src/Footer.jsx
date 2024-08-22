import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-300 dark:bg-gray-800 py-0 shadow-md border-t border-gray-100 dark:border-gray-600 pt-0">
            <div className="container mx-auto px-10">
                <div className="flex flex-col space-y-6">
                    
                    {/* Top: Logo */}
                    <div className="pt-4">
                        <div className="flex items-center space-x-4">
                        <a href="/" className="group flex items-center">
          <img
            src="/logo.png"
            alt="Restaurant Logo"
            className="w-20 h-20 transition-transform transform group-hover:scale-105"
          />
        </a>
                           <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-500">
            PlateVista
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            Deliciousness delivered
          </p>
        </div>
                            
                        </div>
                    </div>

                    {/* Center: Contact Information */}
                    <div className="pt-4">
                        <div className="mb-2">
                            <a href="/about" className="text-gray-500 dark:text-orange-400 hover:text-orange-500 transition-colors duration-300 ml-2">About Us</a> | 
                            <a href="/contact" className="text-gray-500 dark:text-orange-400 hover:text-orange-500 transition-colors duration-300 ml-2">Contact Us</a>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                            Phone: <a href="tel:+12345678901" className="text-blue-500 hover:underline">+1 (234) 567-8901</a>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Email: <a href="mailto:info@platevista.com" className="text-blue-500 hover:underline">info@platevista.com</a>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">1234 Delicious St, Food City, FC 56789</p>
                    </div>

                    {/* Bottom: Social media icons and copyright */}
                    <div className="pt-4">
                        <div className="flex space-x-6 mb-4">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/facebook.png" alt="Facebook" className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/instagram.png" alt="Instagram" className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/twitter.png" alt="Twitter" className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
                            </a>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                            <p>© 2024 PlateVista. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
