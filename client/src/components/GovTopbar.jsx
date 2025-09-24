import { Link } from 'react-router-dom';

function GovTopbar() {
  return (
    <div className="w-full bg-gray-900 border-b border-gray-300 text-sm text-white">
      <div className="max-w-none flex justify-between items-center px-6 py-2 overflow-x-auto">
        {/* Left section */}
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-white text-sm">भारत सरकार</span>
            <span className="text-xs">Government of India</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-white text-sm">कार्मिक, लोक शिकायत और पेंशन मंत्रालय</span>
            <span className="text-xs">Ministry of Personnel, Public Grievances & Pensions</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex gap-4 flex-wrap text-white text-xs">
          <Link to="/" className="hover:underline flex items-center gap-1">🏠 Home</Link>
          <Link to="/contact" className="hover:underline flex items-center gap-1">📞 Contact Us</Link>
          <Link to="/about" className="hover:underline flex items-center gap-1">ℹ️ About Us</Link>
          <Link to="/faq" className="hover:underline flex items-center gap-1">❓ FAQs</Link>
        </div>
      </div>
    </div>
  );
}

export default GovTopbar;
