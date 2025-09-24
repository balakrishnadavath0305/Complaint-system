import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CitizenDashboard() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/complaints/my', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="p-6 bg-gray-100 ">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Citizen Dashboard</h2>

      <div className="flex justify-center mb-6">
        <Link to="/complaint">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow-md transition duration-200">
            File New Complaint
          </button>
        </Link>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">My Complaints</h3>

      {complaints.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white border border-gray-200 p-5 rounded-lg shadow"
            >
              <h4 className="text-lg font-semibold text-gray-800 mb-1">{complaint.title}</h4>
              <p className="text-gray-600 mb-2">{complaint.description}</p>
              <p className="text-sm">
                <span className="font-medium">Status:</span>{' '}
                <span className="text-blue-700 font-semibold">{complaint.status}</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No complaints found.</p>
      )}
    </div>
  );
}

export default CitizenDashboard;
