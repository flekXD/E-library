import React, { useState } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AddBook = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [img, setImg] = useState("");
    const [Genres, setGenres] = useState("");
  
  
    const handleSubmit = async (event) => {

      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the 'Authorization' header
        },
      };
      event.preventDefault();
      console.log(localStorage.getItem('token'))
      try {
        const genresArray = Genres.split(",").map((genre) => genre.trim());
        await axios.post('http://localhost:5000/books/add', {
            name: name,
            description: description,
            author: author,
            year: year,
            img: img,
            Genres: genresArray,
          },config );
  
        // After submission, reset the state
        setName("");
        setDescription("");
        setAuthor("");
        setYear("");
        setImg("");
        setGenres("");
      } catch (error) {
        console.error('Error posting data:', error);
      }
    };

  const paperStyle = {
    padding: 20,
    width: 400,
    margin: "20px auto",
  };

  const buttonStyle = {
    marginTop: 20,
  };


  const coverToBase64 = (event) =>{
    console.log(event);
     var reader = new FileReader();
      reader.readAsDataURL (event.target.files[0]);
       reader.onload = () => {
         console.log(reader.result); //base64encoded string 
         setImg(reader.result)
    }; 
    reader.onerror = error => { 
        console.log("Error : ", error);
    }
}
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <h2>Add a Book</h2>
        <form onSubmit={handleSubmit}>
        <TextField
            label="Name"
            style={buttonStyle}
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            style={buttonStyle}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
          />
          <TextField
            label="Author"
            style={buttonStyle}
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            fullWidth
          />
          <TextField
            label="Year"
            style={buttonStyle}
            type="date"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            fullWidth
          />
          <TextField
            label="Genres"
            style={buttonStyle}
            value={Genres}
            onChange={(event) => setGenres(event.target.value)}
            fullWidth
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            style={buttonStyle}
          >
            Upload file
            <VisuallyHiddenInput type="file" onChange={coverToBase64} />
          </Button>
          <div></div>
          <Button type="submit" variant="contained" style={buttonStyle}>
            Add Book
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default AddBook;
