import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [r1CheckAnswers, setR1CheckAnswers] = useState([]);
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      const res = await axios.get(`${import.meta.env.VITE_APP_URL}/api/jobs/${id}`);
      setJob(res.data);
      setR1CheckAnswers(new Array(res.data.r1Check.length).fill(false));
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const candidateId = 'some_candidate_id'; // Replace with actual candidate ID from authentication
      await axios.post(`http://localhost:5000/api/jobs/${id}/apply`, {
        candidateId,
        r1CheckAnswers,
        resume,
      });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.location}</p>
      <p>{job.salary}</p>
      <p>{job.responsibilities}</p>
      <form onSubmit={handleSubmit}>
        {job.r1Check.map((check, index) => (
          <div key={index}>
            <label>{check.question}</label>
            <select
              value={r1CheckAnswers[index]}
              onChange={(e) => {
                const newAnswers = [...r1CheckAnswers];
                newAnswers[index] = e.target.value === 'true';
                setR1CheckAnswers(newAnswers);
              }}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        ))}
        <div>
          <label>Resume</label>
          <input type="file" onChange={(e) => setResume(e.target.files[0])} required />
        </div>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default JobDetail;
