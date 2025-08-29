import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Briefcase, PlusCircle, User } from 'lucide-react';
import { serviceCategories } from '../data/mockServices';
import '../styles/HomePage.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearchClick = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (location) params.set('location', location);
    navigate(`/listings?${params.toString()}`);
  };

  const handleCategorySelect = (category) => {
    navigate(`/listings?category=${encodeURIComponent(category)}`);
  };

  const handleGoToPage = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Find Local Construction Experts</h1>
        <p>Your trusted marketplace for carpenters, painters, electricians, plumbers, and more.</p>
      </div>

      <div className="search-box">
        <div className="input-group">
          <Search className="icon" size={20} />
          <input
            type="text"
            placeholder="Search for a service (e.g., 'carpenter')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
          />
        </div>

        <div className="input-group">
          <MapPin className="icon" size={20} />
          <input
            type="text"
            placeholder="Location (e.g., 'Erode')"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
          />
        </div>

        <button onClick={handleSearchClick}>Search Services</button>
      </div>

      <div className="category-grid">
        <h2>Browse by Category</h2>
        <div className="categories">
          {serviceCategories.map((category) => (
            <div
              key={category.name}
              className="category-card"
              onClick={() => handleCategorySelect(category.name)}
            >
              <div className="icon-box">{category.icon}</div>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => handleGoToPage('/listings')}>
          <Briefcase size={20} /> Browse All Listings
        </button>
        <button onClick={() => navigate('/jobs')}>
        View Posted Jobs
        </button>
        <button onClick={() => handleGoToPage('/post-job')}>
          <PlusCircle size={20} /> Post a Job
        </button>
        <button onClick={() => handleGoToPage('/post-service')}>
          <User size={20} /> List Your Service
        </button>
         <button onClick={() => navigate('/profile')}>
        <User size={20} /> View Profile
        </button>

      </div>
    </div>
  );
};

export default HomePage;
