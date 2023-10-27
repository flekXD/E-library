import React, {useState,useEffect} from 'react';
import BookCard from '../Card/BookCard';
import './main.css';
import axios from 'axios';
import author from './author.png';
import { Paper, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

function MainPage() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/books`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching for books:', error);
      }
    };
    searchBooks();
  });

  return (
    <div>
      <header>
        <Grid container className="author">
          <Grid item xs={8} sm={6} className="author-image">
            <CardMedia
              sx={{ height: 500, width: 400 }}
              image={author}
              title="Author"
            />
          </Grid>
          <Grid item xs={16} sm={6} className="author-text">
            <Typography variant="h3">Arthur Conan Doyle</Typography>
            <Typography variant="subtitle1">Reading Arthur Conan Doyle is worthwhile for the timeless appeal of his Sherlock Holmes stories, their intellectual stimulation, and the enduring characters he created. His works offer both entertainment and cultural significance, making them a valuable literary experience. Arthur Conan Doyle's works, particularly the Sherlock Holmes stories, offer intellectual engagement through intricate mysteries, enduring characters, and timeless appeal. His influence on popular culture and historical context make his writings both enjoyable and culturally significant.</Typography>
          </Grid>
        </Grid>
      </header>
      <main>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h3">Popular Books</Typography>
            </Paper>
          </Grid>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {searchResults.slice(0, 6).map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
        </Grid>
      </main>
    </div>
  );
}

export default MainPage;
