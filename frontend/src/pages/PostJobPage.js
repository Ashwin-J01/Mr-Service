import React, { useState } from 'react';
import '../styles/FormPages.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostJobPage = () => {
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [imageFiles, setImageFiles] = useState([]);

  const handleImageChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      jobTitle,
      category,
      description,
      location,
      budget,
      preferredDate,
      contactName,
      contactPhone,
      contactEmail,
      imageFiles: imageFiles.map((f) => f.name),
    };

    try {
      await axios.post('http://localhost:5000/api/jobs', jobData);
      alert('Job request submitted!');
      navigate('/jobs'); // or go back: navigate(-1)
    } catch (error) {
      console.error('Error submitting job:', error);
      alert('Failed to submit job. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h1>Post a Job Request</h1>
      <form onSubmit={handleSubmit}>
        <label>Job Title*</label>
        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />

        <label>Service Category*</label>
<select value={category} onChange={(e) => setCategory(e.target.value)} required>
  <option value="">Select a category</option>
  <option value="Carpentry">Carpentry</option>
  <option value="Painting">Painting</option>
  <option value="Electrical">Electrical</option>
  <option value="Plumbing">Plumbing</option>
  <option value="Masonry">Masonry</option>
  <option value="Tiling">Tiling</option>
  <option value="Welding">Welding</option>
</select>


        <label>Description*</label>
        <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Location*</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />

        <label>Budget</label>
        <input type="text" value={budget} onChange={(e) => setBudget(e.target.value)} />

        <label>Preferred Completion Date</label>
        <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} />

        <label>Upload Images</label>
        <input type="file" multiple onChange={handleImageChange} />
        {imageFiles.length > 0 && <p>{imageFiles.length} file(s) selected</p>}

        <fieldset>
          <legend>Contact Information</legend>
          <label>Name*</label>
          <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} required />

          <label>Phone Number*</label>
          <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        </fieldset>

        <button type="submit" className="submit-button">Submit Job Request</button>
      </form>
    </div>
  );
};

export default PostJobPage;
