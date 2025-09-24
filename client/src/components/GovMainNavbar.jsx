import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

function GovMainNavbar() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();                      // Clears context and localStorage
    navigate('/');                 // Redirect to homepage
  };

  return (
    <div className="w-full bg-gray-900 text-white text-sm">
      <div className="max-w-screen-xl mx-auto px-4">
        <nav className="flex items-center justify-between flex-wrap py-2">

          {/* Mobile App Download */}
          <div className="flex flex-wrap gap-6 items-center">
            <a
              href="/Mobile-app/app-release.apk"
              target="_blank"
              download
              className="flex items-center gap-1 hover:underline"
            >
              <img
                src="/phone.png"
                alt="Mobile App"
                className="w-4 h-5"
              />
              Mobile App
            </a>
          </div>

          {/* Language and Sign In / Sign Out */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="hover:underline"
              >
                Language: English ▾
              </button>
              {languageOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md z-10 max-h-60 overflow-auto">
                  {[
                    'English',
                    'हिंदी (Hindi)',
                    'తెలుగు (Telugu)',
                    'বাংলা (Bangla)',
                    'தமிழ் (Tamil)'
                  ].map((lang, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Conditional Button */}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                <img
                  src="/signout.png"
                  alt="Sign Out"
                  className="w-4"
                />
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                <img
                  src="/signin.png"
                  alt="Sign In"
                  className="w-4"
                />
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default GovMainNavbar;
