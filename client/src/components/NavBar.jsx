import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to check if a user is logged in by reading from localStorage
  const checkUser = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    // Initial check when the Navbar component is mounted
    checkUser();

    // Listen for changes in localStorage (useful for changes in other tabs)
    const storageListener = () => checkUser();

    // Add event listener for 'storage' event to detect changes to localStorage
    window.addEventListener('storage', storageListener);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('storage', storageListener);
  }, []);

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null); // Clear user state immediately
    navigate('/login');
  };

  // Function to handle login (You will need to update this in your login logic)
  const handleLogin = (loggedInUser) => {
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    localStorage.setItem('token', loggedInUser.token);
    setUser(loggedInUser); // Immediately update the state after login
    navigate('/dashboard'); // Navigate to the appropriate dashboard
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-black text-white">
      <img
            src="/image.png" // replace with your actual logo path
            alt="DCS Logo"
            className="h-10 w-10"
          />
      <h1 className="text-xl font-bold">Decentralized Complaint System</h1>
      <div className="flex gap-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            {user.role === 'citizen' && <Link to="/citizen" className="hover:underline">Dashboard</Link>}
            {user.role === 'employee' && <Link to="/employee" className="hover:underline">Dashboard</Link>}
            {user.role === 'admin' && <Link to="/admin" className="hover:underline">Dashboard</Link>}
            <button onClick={logout} className="hover:underline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
