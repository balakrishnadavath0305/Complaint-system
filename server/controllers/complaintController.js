const Complaint = require('../models/Complaint');
const employees = await User.find({
  role: 'employee',
  area: complaintArea,
  sector: complaintSector
});

if (employees.length > 0) {
  complaint.assignedTo = employees[0]._id; // pick one (or use round-robin/load balancing logic)
}


// Create complaint
exports.createComplaint = async (req, res) => {
  const { title, description } = req.body;
  try {
    const complaint = new Complaint({
      userId: req.user.id,
      title,
      description
    });
    await complaint.save();
    res.status(201).json({ msg: 'Complaint filed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get all complaints
exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId', 'name email');
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Get user's complaints
exports.getUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id });
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Add comment
exports.addComment = async (req, res) => {
  const { complaintId, comment } = req.body;
  try {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

    complaint.comments.push({
      comment,
      commentBy: req.user.id
    });

    await complaint.save();
    res.json({ msg: 'Comment added' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
