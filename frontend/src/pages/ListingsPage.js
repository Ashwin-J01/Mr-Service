import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import { serviceCategories } from '../data/mockServices';
import '../styles/ListingsPage.css';
import { useNavigate, useLocation } from 'react-router-dom';


const ListingsPage = ({ services }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // ✅ Get initial query values
  const initialSearchTerm = query.get('search') || '';
  const initialCategory = query.get('category') || '';
  const initialLocation = query.get('location') || '';

  // ✅ Use them as initial state
  const [filters, setFilters] = useState({
    category: initialCategory,
    location: initialLocation,
    priceMin: '',
    priceMax: '',
    rating: '',
    availability: '',
  });

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [sortOrder, setSortOrder] = useState('rating-desc');

  useEffect(() => {
    // ✅ Sync filters if query changes (useful if user comes from HomePage)
    setFilters((prev) => ({
      ...prev,
      category: initialCategory,
      location: initialLocation,
    }));
    setSearchTerm(initialSearchTerm);
  }, [initialCategory, initialLocation, initialSearchTerm]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = services
    .filter((service) => {
      const matchesCategory = filters.category ? service.category === filters.category : true;
      const matchesLocation = filters.location
        ? service.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchesSearchTerm = searchTerm
        ? service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesRating = filters.rating ? service.rating >= parseFloat(filters.rating) : true;
      const matchesPrice = filters.priceMin || filters.priceMax
        ? (() => {
            const [minStr, maxStr] = service.priceRange.replace(/[₹\s]/g, '').split('-').map(Number);
            const filterMin = filters.priceMin ? parseInt(filters.priceMin) : 0;
            const filterMax = filters.priceMax ? parseInt(filters.priceMax) : Infinity;
            return minStr <= filterMax && maxStr >= filterMin;
          })()
        : true;
      const matchesAvailability = filters.availability
        ? service.availability.toLowerCase().includes(filters.availability.toLowerCase())
        : true;

      return (
        matchesCategory &&
        matchesLocation &&
        matchesSearchTerm &&
        matchesRating &&
        matchesPrice &&
        matchesAvailability
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'rating-desc') return b.rating - a.rating;
      if (sortOrder === 'price-asc') return parseInt(a.priceRange) - parseInt(b.priceRange);
      if (sortOrder === 'price-desc') return parseInt(b.priceRange) - parseInt(a.priceRange);
      return 0;
    });


  return (
    <div className="listings-page">
      <h1>Service Listings</h1>
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          {serviceCategories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <select name="rating" value={filters.rating} onChange={handleFilterChange}>
          <option value="">Any Rating</option>
          <option value="4.5">4.5 & Up</option>
          <option value="4">4.0 & Up</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="rating-desc">Rating (High)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      <div className="service-grid">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.id}
              style={{ cursor: 'pointer' }}
            >
              <ServiceCard service={service} />
            </div>
          ))
        ) : (
          <p className="no-results">No services found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;
