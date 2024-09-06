import React, { useState } from 'react';
import SearchBar1 from './SearchBar1'; // Ensure this path is correct
import './ConnectionsPage.css';

const ConnectionsPage = () => {
  const [results, setResults] = useState([]);

  const handleSearchResults = (users) => {
    console.log('Received search results:', users);
    setResults(users);
  };

  return (
    <div className="connections-page">
      <h1>Connections</h1>
      <SearchBar1 onSearchResults={handleSearchResults} />

      <div className="search-results">
        {results.length > 0 ? (
          results.map(user => (
            <div key={user._id} className="user-result"> {/* Use _id */}
              <img src={user.profileImage} alt={user.name} className="user-profile-image" />
              <p>{user.name}</p>
              <a href={`/profile/${user._id}`} className="view-profile-link">View Profile</a> {/* Use _id */}
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPage;
