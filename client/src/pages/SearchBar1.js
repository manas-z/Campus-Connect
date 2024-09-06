// src/components/SearchBar1.js
import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';
import './SearchBar1.css';

const SearchBar1 = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  // Fetch search results based on the search term
  const fetchResults = debounce(async (searchTerm) => {
    if (!searchTerm) return; // Return early if search term is empty

    try {
      const response = await fetch(`http://localhost:5000/api/search-users?query=${encodeURIComponent(searchTerm)}`);
      
      if (!response.ok) {
        console.error('Error fetching search results:', response.statusText);
        return;
      }

      const data = await response.json();
      onSearchResults(data); // Pass search results to parent component
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, 300); // 300ms debounce delay to minimize API calls

  // Effect to trigger search when query changes
  useEffect(() => {
    fetchResults(query);
  }, [query]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search users..."
    />
  );
};

export default SearchBar1;
