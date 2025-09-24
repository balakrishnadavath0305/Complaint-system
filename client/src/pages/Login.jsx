import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);

      if (res.data.user.role === 'citizen') navigate('/citizen');
      else if (res.data.user.role === 'employee') navigate('/employee');
      else navigate('/admin');
    } catch (err) {
      alert(err?.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 mb-4 bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-md max-w-md w-full">
        <h2 className="text-center text-2xl font-semibold mb-6 text-blue-800">Login</h2>

        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center border rounded px-2">
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="flex-1 p-2 outline-none"
                required
              />
              <img src="/user.png"
               alt="user" className="w-5 h-5 ml-2" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border rounded px-2">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="flex-1 p-2 outline-none"
                required
              />
              <img src="/pass.png" alt="lock" className="w-5 h-5 ml-2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded font-medium flex items-center justify-center"
          >
            Login <i className="ml-2 fa fa-sign-in" />
          </button>
        </form>

        <div className="text-center text-sm mt-4 space-y-1 text-blue-700">
          <div>
            <a href="/ForgetPassword" className="hover:underline pr-2 border-r">Forgot Password</a>
            <a href="/ForgotUsername" className="hover:underline pl-2">Forgot Username</a>
          </div>
          <div>
            <a href="/Register" className="hover:underline pr-2 border-r">New User? Sign up</a>
            <a href="/Signin/Login" className="hover:underline pl-2">Login with OTP</a>
          </div>
        </div>

        {/* Placeholder for internal DCS links */}
        <div className="mt-6 space-y-3">
          <a href="/help" className="block w-full text-center bg-white border p-2 rounded shadow text-blue-800 hover:underline">
            Need Help?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
