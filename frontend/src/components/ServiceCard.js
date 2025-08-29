import React, { useState } from 'react';
import { Briefcase, MapPin, Star, Phone } from 'lucide-react';
import '../styles/ServiceCard.css';

const ServiceCard = ({ service }) => {
  const [showContact, setShowContact] = useState(false);

  const handleContactClick = () => {
    setShowContact(true);
  };

  return (
    <div className="service-card">
      <div className="card-content">
        <h3>{service.name}</h3>
        <p><Briefcase size={16} /> {service.category}</p>
        <p><MapPin size={16} /> {service.location}</p>
        <div className="rating">
          <Star size={16} fill="gold" stroke="gold" />
          <span>{service.rating}</span>
          <span className="reviews">({service.reviews.length} reviews)</span>
        </div>
        <p className="description">{service.description}</p>

        {/* ✅ Masked Contact */}
        <p className="contact" onClick={handleContactClick} style={{ cursor: 'pointer', color: '#007bff' }}>
          <Phone size={16} />
          &nbsp;
          {showContact ? service.contact : 'Click to reveal contact'}
        </p>
      </div>

      <div className="card-footer">
        <span className="price">{service.priceRange}</span>
      </div>
    </div>
  );
};

export default ServiceCard;
