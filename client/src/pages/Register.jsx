import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const hyderabadAreas = [
  'Ameerpet', 'Abids', 'Adikmet', 'Afzal Gunj', 'Alwal', 'Amberpet', 'Banjara Hills', 'Begumpet', 'BHEL',
  'Boduppal', 'Champapet', 'Chandanagar', 'Charminar', 'Dilsukhnagar', 'ECIL', 'Erragadda', 'Gachibowli',
  'Hafeezpet', 'Himayatnagar', 'Jubilee Hills', 'Kachiguda', 'Kukatpally', 'Khairatabad', 'Koti', 'LB Nagar',
  'Madhapur', 'Malakpet', 'Malkajgiri', 'Manikonda', 'Masab Tank', 'Mehdipatnam', 'Miyapur', 'Moosapet',
  'Musheerabad', 'Nagole', 'Nampally', 'Narayanguda', 'Nizampet', 'Panjagutta', 'Sainikpuri', 'Sanath Nagar',
  'Santosh Nagar', 'Saroor Nagar', 'Secunderabad', 'Serilingampally', 'Shaikpet', 'Shamshabad', 'Somajiguda',
  'Srinagar Colony', 'Tarnaka', 'Tolichowki', 'Uppal', 'Yousufguda'
];

function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', password: '',
    role: 'citizen', area: '', sector: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Registered Successfully');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 mb-4 bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-800">Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          >
            <option value="citizen">Citizen</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
            required
          >
            <option value="">Select Area</option>
            {hyderabadAreas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>

          {formData.role === 'employee' && (
            <select
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            >
              <option value="">Select Sector</option>
              <option value="Municipal">Municipal</option>
              <option value="Pension">Pension</option>
              <option value="Land">Land</option>
              <option value="Transport">Transport</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Education">Education</option>
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
