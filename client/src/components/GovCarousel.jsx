import React, { useEffect, useState } from 'react';

const bannerImages = [
  'https://img.freepik.com/free-vector/online-education-concept-with-educarion-everyone-symbols-flat-illustration_1284-29476.jpg?t=st=1746378642~exp=1746382242~hmac=b58c57abeb10464ecc5b944ea50254c96f70c41e12b2218f4388cbfee65536d8&w=1380',
  'https://img.freepik.com/free-vector/eco-protest-save-planet-concept_107791-2667.jpg?t=st=1746378838~exp=1746382438~hmac=cb2c6a5c09bcfd0fd74cba78aa150bb1ff0501c0275453eeb10d037e74249df3&w=1800',
  'https://img.freepik.com/free-photo/close-up-young-businesswoman-reading-folder-outdoors_23-2148026677.jpg?t=st=1746380896~exp=1746384496~hmac=c023738dc33237c57cb9c818a4f71bd398a4b9c052531564af529f7da4aad246&w=1800',
  'https://img.freepik.com/free-photo/selective-focus-grunge-rusty-faucet-rural-area_60438-3839.jpg?t=st=1746380981~exp=1746384581~hmac=5db500156b6dd4e476eb9b08c65ca6165011d6af90dc548fa3952bdadac74368&w=1380',
  'https://img.freepik.com/free-vector/flat-instagram-stories-collection-public-transportation-transit_23-2150247318.jpg?t=st=1746381126~exp=1746384726~hmac=69f39fd8a8eca8c70d52eab72992a61ac7342c2f29e181a1aeb0d9c36b177214&w=1800',
  'https://img.freepik.com/free-vector/muslim-businesswomen-composition-with-doodle-characters-islamic-women-making-lots-money-with-pictogram-bubbles-vector-illustration_1284-83922.jpg?t=st=1746381194~exp=1746384794~hmac=9242e2ca22a3e5964bc6605068939915ef819e62d9b015d7ab88a94689edc302&w=1800',
  'https://img.freepik.com/free-vector/document-procedures-composition-white_107791-33786.jpg?t=st=1746378717~exp=1746382317~hmac=0f48abbacaeb206ffbf2c1a0edd6c8b12a98d840f90317bd62ba8ec2d6f7ceac&w=1800',
];

function GovCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(goToNext, 2000);
      return () => clearInterval(timer);
    }
  }, [currentIndex, isPaused]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Images */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] transition-all duration-700 ease-in-out">
        <img
          src={bannerImages[currentIndex]}
          alt={`Banner ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Prev/Next Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-2 rounded-full"
        onClick={goToPrev}
      >
        ‹
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-2 rounded-full"
        onClick={goToNext}
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default GovCarousel;
