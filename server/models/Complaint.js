const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  citizenId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  description: String,
  sector: {
    type: String,
    required: true,
    enum: ['Municipal', 'Pension', 'Land', 'Transport', 'Electricity', 'Water', 'Education'] // Add more as needed
  },
  location: {
    state: String,
    area: String,
    locality: String,
  },
  imageUrl: String, // store image file path or cloud URL
  severity: { type: Number, min: 1, max: 5 },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // employee
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      date: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
