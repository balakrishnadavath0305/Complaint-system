import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Footer Top */}
      <div className="py-6 border-b border-gray-700">
        <div className="text-center mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/facebook_5968764.png" width="30" className="inline-block" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/twitter_5969020.png" width="30" className="inline-block mx-3" alt="X/Twitter" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <img src="/youtube_3670147.png" width="30" className="inline-block" alt="YouTube" />
          </a>
        </div>
        <div className="text-sm text-center px-4 max-w-4xl mx-auto text-gray-300">
          This site is designed, developed &amp; hosted by National Complaint System,  Government of India, Public Complaints.
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="py-6 px-4 text-center">
        <p className="text-yellow-300 text-sm mb-1">
          Portal is Compatible with all major Browsers like Google Chrome, Mozilla Firefox, Microsoft Edge, Safari etc.
        </p>
        <p className="text-yellow-300 text-sm mb-4">
          Best Viewed in 1440 x 900 resolution
        </p>


        <div className="text-sm text-center flex-auto text-gray-300 space-y-1">
          <div>
            <a href="/Home/Disclaimer" className="hover:underline mx-2">Disclaimer</a>|
            <a href="/Home/WebsitePolicies" className="hover:underline mx-2">Website Policies</a>|
            <a href="Home/Info" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Web Information Manager</a>
          </div>
          <div className="mt-1">
            Version 7.0.01092019.0.0, Copyright © 2025
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
