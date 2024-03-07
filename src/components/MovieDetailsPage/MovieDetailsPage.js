import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";

const MovieDetailsPage = ({ apiKey }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
      );
      setMovieDetails(response.data);
      const creditsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
      );
      setCast(creditsResponse.data.cast);
    };

    fetchMovieDetails();
  }, [movieId, apiKey]);

  const handleClose = () => {
    navigate(-1); // Or history.push('/') to go back to the home page
  };
  const topBilledCast = cast
    .slice(0, 5)
    .map((actor) => actor.name)
    .join(", ");

  return ReactDOM.createPortal(
    <Dialog
      open={!!movieDetails}
      onClose={handleClose}
      aria-labelledby="movie-details-title"
    >
      <DialogTitle id="movie-details-title">{movieDetails?.title}</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Release Year: {new Date(movieDetails?.release_date).getFullYear()}
        </Typography>
        <Typography gutterBottom>
          Plot Summary: {movieDetails?.overview}
        </Typography>
        <Typography gutterBottom>Main Cast: {topBilledCast}</Typography>
        <Typography gutterBottom>
          Rating: {movieDetails?.vote_average}/10
        </Typography>
        {/* Display more movie details as needed */}
      </DialogContent>
      <Button onClick={handleClose}>Close</Button>
    </Dialog>,
    document.getElementById("movie-details-portal")
  );
};

export default MovieDetailsPage;
