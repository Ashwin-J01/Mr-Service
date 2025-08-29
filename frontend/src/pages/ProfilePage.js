import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProfilePage.css'; 
import { useNavigate } from 'react-router-dom';
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>About:</strong> {profile.about}</p>
    </div>
  );
};

export default ProfilePage;
