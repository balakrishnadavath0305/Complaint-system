const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// File a new complaint
// File a new complaint
router.post('/', authMiddleware, upload.single('photo'), async (req, res) => {
  console.log('Complaint POST route hit');
  const { title, description, sector, state, area, locality, severity } = req.body;

  try {
    const complaint = new Complaint({
      citizenId: req.user.id,
      title,
      description,
      sector,
      severity,
      location: { state, area, locality },
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });
    console.log('Image URL being saved:', complaint.imageUrl);


const employee = await User.findOne({
  role: 'employee',
  sector: sector,     // sector is already from req.body
  area: area          // area is already from req.body
});


    if (employee) {
      complaint.assignedTo = employee._id;
    }

    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get complaints (Admin/Employee view)
// Get complaints (Admin/Employee view)
router.get('/', authMiddleware, async (req, res) => {
  try {
    let complaints;

    if (req.user.role === 'admin') {
      complaints = await Complaint.find()
        .populate('citizenId', 'name email role')
        .populate('assignedTo', 'name email role');
    } else if (req.user.role === 'employee') {
      complaints = await Complaint.find({ assignedTo: req.user.id });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Only for employees
router.get('/employee', authMiddleware, async (req, res) => {
  try {
    const employee = await User.findById(req.user.id);
    if (!employee || employee.role !== 'employee') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Flexible query for employee view: Show complaints that match employee's sector/area OR complaints without area/sector
    const complaints = await Complaint.find({
      $or: [
        { 'location.sector': employee.roleType, 'location.area': employee.area }, // Complaints matching sector and area
        { 'location.sector': { $exists: false }, 'location.area': { $exists: false } }, // Complaints without area/sector
      ],
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get "my" complaints (for employee and citizen)
router.get('/my', authMiddleware, async (req, res) => {
  try {
    let complaints;

    if (req.user.role === 'employee') {
      complaints = await Complaint.find({ assignedTo: req.user.id });
    } else if (req.user.role === 'citizen') {
      complaints = await Complaint.find({ citizenId: req.user.id });
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update complaint status (for Admins/Employees)
router.put('/status/:id', authMiddleware, async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  const { status } = req.body;

  if (role !== 'admin' && role !== 'employee') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status;
    await complaint.save();

    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a comment to a complaint
router.post('/comment/:id', authMiddleware, async (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.comments.push({
      user: req.user._id,
      comment: comment,
      date: new Date(),
    });

    await complaint.save();

    res.json({ message: 'Comment added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
