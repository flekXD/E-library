import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import BookCard from '../Card/BookCard';

function FastSearch() {
  const { name } = useParams(); // Retrieve the "name" parameter from the URL

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Function to execute the search
    const searchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books/fast_search/${name}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching for books:', error);
      }
    };
    searchBooks();
  }, [name]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {searchResults.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default FastSearch;
