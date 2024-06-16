const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  r1Check: [
    {
      question: String,
      correctAnswer: Boolean,
    },
  ],
  r2Check: [
    {
      question: String,
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'live'],
    default: 'pending',
  },
  recruiters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
