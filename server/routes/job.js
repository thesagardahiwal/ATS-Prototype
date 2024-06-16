const express = require('express');
const Job = require('../models/Job');
const User = require('../models/User');

const router = express.Router();

// Create job post
router.post('/', async (req, res) => {
  const { title, location, salary, responsibilities, r1Check, postedBy } = req.body;

  try {
    const job = new Job({
      title,
      location,
      salary,
      responsibilities,
      r1Check,
      postedBy,
    });

    await job.save();

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', ['name', 'email']);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', ['name', 'email']);
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Apply for job
router.post('/:id/apply', async (req, res) => {
  const { candidateId, r1CheckAnswers, resume } = req.body;

  try {
    const job = await Job.findById(req.params.id);
    const candidate = await User.findById(candidateId);

    // Check R1 answers
    let r1Pass = true;
    for (let i = 0; i < job.r1Check.length; i++) {
      if (job.r1Check[i].correctAnswer !== r1CheckAnswers[i]) {
        r1Pass = false;
        break;
      }
    }

    if (!r1Pass) {
      return res.status(400).json({ msg: 'R1 Check failed' });
    }

    // Add application to job
    job.applications.push({
      candidate: candidateId,
      resume,
      r1CheckAnswers,
    });

    await job.save();

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
