const mongoose = require('mongoose');

const docSchema = mongoose.Schema({
  kbSize: { type: Number, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date() },
  deletedAt: { type: Date },
});

module.exports = mongoose.model('Document', docSchema);
