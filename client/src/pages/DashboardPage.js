import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';  // Import the SearchBar component

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {
  FaTachometerAlt,
  FaIcons,
  FaMap,
  FaBell,
  FaTable,
  FaFont,
  FaLifeRing,
  FaSearch
} from 'react-icons/fa';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // State for search results

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) return;

      try {
        const response = await fetch(`http://localhost:5000/user-info?email=${email}`);
        const data = await response.json();
        if (response.ok) {
          setUserName(data.name);
          setProfileImage(data.profileImage); 
          alert(`Welcome, ${data.name}!`);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle search results from the SearchBar component
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="dashboard-page">
      <header className="header">
        <div className="logo">DASHBOARD</div>
        <div className="user-search">
          {/* Display SearchBar component */}
          {showSearch && <SearchBar onSearchResults={handleSearchResults} />}
          <FaSearch className="icon" onClick={toggleSearch} />
          
          {/* User Profile Section */}
          <div className="user-profile" onClick={toggleDropdown}>
            <img src={profileImage} alt="Profile" className="profile-image" />
            <span className="user-name">{userName}</span>
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item">See Profile</div>
                <div className="dropdown-item">Edit Profile</div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="content">
        <div className="sidebar">
          <h2>Navigation</h2>
          <ul>
            <li><Link className='link' to='/dashboardpage'>Dashboard</Link></li>
            <li><Link className='link' to='/chatforum'>Chat Forum</Link></li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          {/* Display search results if available */}
          {searchResults.length > 0 && (
            <div className="search-results">
              <h3>Search Results:</h3>
              {searchResults.map((post) => (
                <div key={post._id} className="post">
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                  <small>By {post.user.name}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
