import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProfilePage.css'; // Updated CSS

const ProfilePage = () => {
  const { userId } = useParams(); // Extract userId from the URL params
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user-info?id=${userId}`);
        if (!response.ok) {
          throw new Error('Error fetching user profile');
        }
        const data = await response.json();
        setProfileData(data); // Set the user profile data
      } catch (error) {
        setError(error.message); // Handle any errors
      }
    };

    fetchProfile();
  }, [userId]);

  if (error) {
    return <p>Error fetching user profile: {error}</p>;
  }

  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      {/* Navbar */}
      <header className="header">
        <div className="logo">DASHBOARD</div>
        <div className="user-search">
          <div className="user-profile">
            <img src="/path-to-profile-img" alt="Profile" className="profile-image" />
            <span className="user-name">Username</span>
            <div className="dropdown-menu">
              <div className="dropdown-item">See Profile</div>
              <div className="dropdown-item">Edit Profile</div>
            </div>
          </div>
        </div>
      </header>

      <div className="profile-content">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Navigation</h2>
          <ul>
            <li><Link className="link" to="/dashboardpage">Dashboard</Link></li>
            <li><Link className="link" to="/chatforum">Chat Forum</Link></li>
            <li><Link className="link" to="/connections">Connections</Link></li>
          </ul>
        </div>

        {/* Main Profile Content */}
        <div className="profile-container">
          <div className="profile-details centered"> {/* Apply centered styling */}
            <h1>{profileData.name}'s Profile</h1>
            <p><strong>Age:</strong> {profileData.age}</p>
            <p><strong>Current Year:</strong> {profileData.currentYear}</p>
            <p><strong>Course Name:</strong> {profileData.courseName}</p>
            <p><strong>Graduation Year:</strong> {profileData.graduationYear}</p>
            <p><strong>Bio:</strong> {profileData.bio}</p>
            <p><strong>Interested Fields:</strong> {profileData.interestedFields}</p>
            <p><strong>Specialty Fields:</strong> {profileData.specialtyFields}</p>
            {profileData.profileImage && (
              <img
                src={`http://localhost:5000/uploads/${profileData.profileImage}`}
                alt={`${profileData.name}'s profile`}
                className="profile-img"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
