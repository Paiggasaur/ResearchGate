// src/components/ViewProfile.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './ViewProfile.css'; // Import the CSS file for styling
import Header from './Header';
const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('access_token'); // Retrieve the access token

      if (!token) {
        setErrorMessage('No access token found. Please log in.');
        navigate('/login'); // Redirect to login if no token is found
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Set the authorization header
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data); // Set profile data state
        } else {
          const errorData = await response.text();
          console.error('Failed to fetch profile:', errorData);
          setErrorMessage('Failed to fetch profile data. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setErrorMessage('An error occurred while fetching profile data.');
      }
    };

    fetchUserProfile();
  }, [navigate]); // Add navigate to the dependency array

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Clear the access token
    navigate('/login'); // Redirect to the login page
  };

  const handleWriteResearchPaper = () => {
    navigate('/login/domain-title'); // Redirect to the domain title page
  };

  return (
    <div className="profile-container">
    <Header /> 
      <h1>User Profile</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {profileData ? (
        <div className="profile-details">
          <img
            src={profileData.photo} // Use the provided photo URL
            alt="Profile"
            className="profile-photo"
          />
          <h2 className="profile-name">{profileData.name}</h2>
          <p className="profile-year">Year: <span>{profileData.year}</span></p>
          <p className="profile-branch">Branch: <span>{profileData.branch}</span></p>
          <p className="profile-department">Department: <span>{profileData.department}</span></p>
          <p className="profile-publications">Number of Publications: <span>{profileData.number_of_publications}</span></p>
          
          <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Logout button */}
          <button className="write-paper-button" onClick={handleWriteResearchPaper}>Write Research Paper</button> {/* Write Paper button */}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default ViewProfile;
