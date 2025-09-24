import React from 'react';

function GovHeader() {
  return (
    <div className="w-full bg- border-gray-300 py-3">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        
        {/* Left Logo */}
        <div className="w-[100px] flex-shrink-0">
          <a href="/">
            <img src="https://e7.pngegg.com/pngimages/340/959/png-clipart-three-headed-lion-lion-capital-of-ashoka-sarnath-museum-state-emblem-of-india-national-symbols-of-india-planet-miscellaneous-mammal.png" alt="DCS Logo" className="w-full h-auto" />
          </a>
        </div>

        {/* Center Title */}
        <div className="flex-1 text-center flex flex-col items-center">
        <img src="/image.png" alt="DCS Logo" className="h-14 mb-1" />
          <h1 className="text-2xl font-bold text-indigo-600">DCS</h1>
          <p className="text-sm text-gray-700">
            Decentralized Complaint System
          </p>
        </div>

        {/* Right Swachh Image */}
        <div className="w-[180px] flex-shrink-0 flex justify-end">
          <img src="https://resize.indiatvnews.com/en/centered/newbucket/1200_675/2017/11/swachhbharat-1510321257.jpg" alt="Swachh Bharat" className="h-12" />
        </div>
      </div>
    </div>
  );
}

export default GovHeader;
