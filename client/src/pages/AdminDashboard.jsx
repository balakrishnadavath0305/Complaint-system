import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/complaints/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(res.data);
    } catch (error) {
      console.error('Error fetching complaints:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="p-6 bg-gray-100 mt-4 mb-4">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Admin Dashboard</h2>

      {complaints.map((complaint) => (
        <div
          key={complaint._id}
          className="bg-white border border-gray-200 p-6 rounded-lg shadow-md mb-6"
        >
          <div className="mb-2">
            <h4 className="text-xl font-semibold text-gray-800">{complaint.title}</h4>
            <p className="text-gray-600">{complaint.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p><span className="font-semibold">Sector:</span> {complaint.sector}</p>
            <p><span className="font-semibold">Status:</span> <span className="text-blue-700 font-semibold">{complaint.status}</span></p>
            <p><span className="font-semibold">Filed By:</span> {complaint.citizenId?.name} ({complaint.citizenId?.email})</p>
            <p>
              <span className="font-semibold">Assigned To:</span>{' '}
              {complaint.assignedTo
                ? `${complaint.assignedTo.name} (${complaint.assignedTo.email})`
                : 'Not Assigned'}
            </p>
          </div>

          {complaint.imageUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Evidence:</p>
              <a
                href={`http://localhost:5000${complaint.imageUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`http://localhost:5000${complaint.imageUrl}`}
                  alt="Complaint Evidence"
                  className="w-40 h-28 object-cover rounded border hover:shadow-lg transition"
                />
              </a>
              <p className="text-xs text-gray-400">Click to view full image</p>
            </div>
          )}

          {complaint.comments && complaint.comments.length > 0 && (
            <div className="mt-4 bg-gray-50 p-3 rounded-md border">
              <p className="font-semibold text-gray-700 mb-2">Comments:</p>
              {complaint.comments.map((commentObj) => (
                <div key={commentObj._id} className="border-l-4 border-blue-400 pl-3 mb-2">
                  <p className="text-sm">{commentObj.comment}</p>
                  <p className="text-xs text-gray-500">{new Date(commentObj.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
