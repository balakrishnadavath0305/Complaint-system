import React, { useState } from 'react';
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

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    title: '', description: '', sector: 'Municipal', city: 'Hyderabad', area: '', locality: '', severity: 1, photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formDataToSend = new FormData();
    for (let key in formData) {
      if (key === 'photo' && formData[key]) {
        formDataToSend.append('photo', formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/complaints', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Complaint submitted:', response.data);
    } catch (error) {
      console.error('Error submitting complaint:', error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-4 mb-4 bg-white p-8 rounded-2xl shadow-lg border">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">File a Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Complaint Title"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the issue..."
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="Municipal">Municipal</option>
            <option value="Pension">Pension</option>
            <option value="Land">Land</option>
            <option value="Transport">Transport</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Education">Education</option>
          </select>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            readOnly
            className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select Area</option>
            {hyderabadAreas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>

          <input
            type="text"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
            placeholder="Locality"
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            min="1"
            max="5"
            required
            className="border border-gray-300 rounded-lg px-4 py-2"
          />

          <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              className="hidden"
            />
            📎 Attach Photo
            {formData.photo && <span className="text-xs text-gray-600 truncate max-w-[120px]">{formData.photo.name}</span>}
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
