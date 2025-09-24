const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  address: String,
  password: String,
  role: { type: String, enum: ['citizen', 'employee', 'admin'], default: 'citizen' },
  area: String, // For both citizens and employees
  sector: {
    type: [String],
    default: [],
  }
  
});

module.exports = mongoose.model('User', userSchema);
