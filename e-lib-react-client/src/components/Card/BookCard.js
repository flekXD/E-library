import  React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BookCard({ book }) {

  return (
    <Card sx={{ maxWidth: 300 ,padding: 1, margin: 3 }}>
      <CardMedia
        sx={{ height: 300 , width: 300 }}
        image={book.img}
        title={book.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {book.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {book.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Like</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}