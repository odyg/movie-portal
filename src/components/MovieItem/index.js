import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

const TopRatedBadge = () => <Chip label="Top Rated" color="secondary" />;

const MovieItem = ({ movie, isTopRated }) => {
  const navigate = useNavigate();

  const navigateToMovieDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card
      sx={{ position: "relative", maxWidth: 345 }}
      onClick={navigateToMovieDetails}
    >
      {isTopRated && (
        <div style={{ position: "absolute", bottom: 10, right: 10 }}>
          <TopRatedBadge />
        </div>
      )}
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(movie.release_date).getFullYear()}
          </Typography>
          <Typography variant="body2">
            Rating: {movie.vote_average}/10
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieItem;
