import { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchComplaints = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/complaints/employee', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(res.data);
    } catch (err) {
      console.error('Error fetching complaints:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/complaints/status/${id}`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchComplaints();
  };

  const handleComment = async (id, comment) => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/complaints/comment/${id}`, { comment }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchComplaints();
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="p-6 bg-gray-100 mt-4 mb-4">
      <h2 className="text-3xl font-bold text-blue-800 mb-4 mt -4 text-center">Employee Dashboard</h2>

      {complaints.map((complaint) => (
        <div key={complaint._id} className="bg-white border border-gray-200 p-6 rounded-lg shadow-md mb-6">
          <div className="mb-2">
            <h4 className="text-xl font-semibold text-gray-800">{complaint.title}</h4>
            <p className="text-gray-600">{complaint.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p><span className="font-semibold">Sector:</span> {complaint.sector}</p>
            <p><span className="font-semibold">Status:</span> <span className="text-blue-700 font-semibold">{complaint.status}</span></p>
          </div>

          {complaint.imageUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-1">Evidence:</p>
              <div className="flex justify-center">
                <img
                  src={`http://localhost:5000${complaint.imageUrl}`}
                  alt="Complaint Evidence"
                  className="w-40 h-28 object-cover rounded border hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleImageClick(`http://localhost:5000${complaint.imageUrl}`)}
                />
              </div>
              <p className="text-xs text-gray-400 text-center">Click to view full image</p>
            </div>
          )}

          <div className="flex gap-2 my-2">
            <button onClick={() => handleStatusChange(complaint._id, 'In Progress')} className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">In Progress</button>
            <button onClick={() => handleStatusChange(complaint._id, 'Resolved')} className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">Resolved</button>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            const comment = e.target.comment.value;
            handleComment(complaint._id, comment);
            e.target.reset();
          }}>
            <input name="comment" placeholder="Add comment" className="border p-2 w-full mb-2 rounded" required />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 w-full rounded">Comment</button>
          </form>

          {complaint.comments && complaint.comments.map((commentObj) => (
            <div key={commentObj._id} className="ml-4 p-2 border-l-2 border-gray-300">
              <p className="text-sm"><strong>Comment:</strong> {commentObj.comment}</p>
              <p className="text-xs text-gray-500">{new Date(commentObj.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ))}

      {/* Modal for Viewing Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-end">
              <button
                onClick={closeImageModal}
                className="text-gray-600 hover:text-gray-900 font-bold"
              >
                X
              </button>
            </div>
            <img src={selectedImage} alt="Full View" className="max-w-full max-h-[80vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;
