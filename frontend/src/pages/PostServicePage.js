// src/pages/PostServicePage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/FormPages.css';

const PostServicePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    priceRange: '',
    availability: '',
    contact: '',
    rating: 4.5,
    reviews: [],
    workSamples: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/services', formData);
      alert('Service listed successfully!');
      navigate('/listings');
    } catch (error) {
      alert('Failed to post service');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h1>List Your Service</h1>
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <form onSubmit={handleSubmit}>
        <label>Service Name*</label>
        <input name="name" onChange={handleChange} required />

        <label>Category*</label>
<select name="category" onChange={handleChange} required>
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
        <textarea name="description" onChange={handleChange} required />

        <label>Location*</label>
        <input name="location" onChange={handleChange} required />

        <label>Price Range</label>
        <input name="priceRange" onChange={handleChange} />

        <label>Availability</label>
        <input name="availability" onChange={handleChange} />

        <label>Contact</label>
        <input name="contact" onChange={handleChange} required />

        <button type="submit" className="submit-button">List My Service</button>
      </form>
    </div>
  );
};

export default PostServicePage;
