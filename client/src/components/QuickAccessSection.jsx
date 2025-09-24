import React from 'react';
import { Link } from 'react-router-dom';

const QuickAccessSection = () => {
  return (
    <div className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Register/Login Box */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300">
            <Link to="/Register" className="flex flex-col items-center space-y-4">
              <img
                src="/register.png"
                alt="Register"
                className="w-20 h-20 object-contain"
              />
              <p className="text-lg font-semibold text-gray-700">Register</p>
            </Link>
          </div>

         

          {/* Contact Us Box */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300">
            <Link to="/contact" className="flex flex-col items-center space-y-4">
              <img
                src="/contact.png"
                alt="Contact Us"
                className="w-20 h-20 object-contain"
              />
              <p className="text-lg font-semibold text-gray-700">Contact Us</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessSection;
