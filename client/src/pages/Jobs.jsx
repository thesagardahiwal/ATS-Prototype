import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get('http://localhost:5000/api/jobs');
      setJobs(res.data);
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <Link to={`/jobs/${job._id}`}>{job.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
