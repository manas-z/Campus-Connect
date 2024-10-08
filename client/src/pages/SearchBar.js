import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      try {
        // Use encodeURIComponent to properly format the query string
        const response = await axios.get(`http://localhost:5000/api/search?query=${encodeURIComponent(query.trim())}`);
        
        // Destructure posts and profiles from the response data
        const { posts, profiles } = response.data;

        // Combine and pass both posts and profiles to the parent component
        onSearchResults({ posts, profiles });
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for posts or users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
