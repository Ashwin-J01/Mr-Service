import React from 'react';
import '../styles/UserProfileCard.css';

const UserProfileCard = ({ user }) => {
  return (
    <div className="user-profile-card">
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>About:</strong> {user.about}</p>
    </div>
  );
};

export default UserProfileCard;
