import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ViewJobsPage.css';
import { useNavigate } from 'react-router-dom';

const ViewJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => setJobs(res.data))
      .catch(err => console.error(err));
  }, []);

  const openDetails = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="view-jobs-container">
      <h1>Job Listings</h1>
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>

      {jobs.length > 0 ? (
        jobs.map(job => (
          <div key={job._id} className="job-card">
            <h3>{job.jobTitle}</h3>
            <p><strong>Location:</strong> {job.location}</p>
            <button onClick={() => openDetails(job)}>More Details</button>
          </div>
        ))
      ) : (
        <p>No jobs posted.</p>
      )}

      {/* Modal */}
      {selectedJob && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{selectedJob.jobTitle}</h2>
            <p><strong>Category:</strong> {selectedJob.category}</p>
            <p><strong>Description:</strong> {selectedJob.description}</p>
            <p><strong>Budget:</strong> {selectedJob.budget}</p>
            <p><strong>Preferred Date:</strong> {selectedJob.preferredDate}</p>
            <p><strong>Contact Name:</strong> {selectedJob.contactName}</p>
            <p><strong>Phone:</strong> {selectedJob.contactPhone}</p>
            {selectedJob.contactEmail && (
              <p><strong>Email:</strong> {selectedJob.contactEmail}</p>
            )}
            {selectedJob.imageFiles?.length > 0 && (
              <div>
                <strong>Images:</strong>
                <ul>
                  {selectedJob.imageFiles.map((file, idx) => (
                    <li key={idx}>{file}</li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewJobsPage;
