import React, { useState, useEffect } from "react";
import MovieItem from "../MovieItem";
import axios from "axios";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Pagination,
  Box,
} from "@mui/material";
import "./HomePage.module.css";

const HomePage = ({ apiKey }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [topRatedMovieIds, setTopRatedMovieIds] = useState(new Set()); // Define the state variable for top-rated movies

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
      );
      setGenres(response.data.genres);
    };

    fetchGenres();
  }, [apiKey]);
  // Fetch movies with genre filter
  useEffect(() => {
    const fetchMovies = async () => {
      let endpoint = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${currentPage}`;

      if (searchQuery) {
        endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${currentPage}`;
      } else if (selectedGenre) {
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&page=${currentPage}`;
      }

      const response = await axios.get(endpoint);
      setMovies(response.data.results);
      if (currentPage === 1 && selectedGenre === "") {
        // Determine top-rated movies only on the first page and for "All Genres"
        const topRatedIds = new Set(
          response.data.results
            .sort((a, b) => b.vote_average - a.vote_average)
            .slice(0, 5)
            .map((movie) => movie.id)
        );
        setTopRatedMovieIds(topRatedIds);
      } else {
        setTopRatedMovieIds(new Set()); // Clear or maintain the previous state if not on the first page
      }
    };

    fetchMovies();
  }, [searchQuery, selectedGenre, currentPage, apiKey]);

  return (
    <Box p={2}>
      <div>
        <h1>Welcome.</h1>
        <h3>Find your next favorite movie!</h3>
        <TextField
          label="Search for a movie..."
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">All Genres</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>

        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieItem
                movie={movie}
                isTopRated={topRatedMovieIds.has(movie.id)}
              />
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={10} // This should be dynamic based on total pages from the API
          page={currentPage}
          onChange={(e, value) => setCurrentPage(value)}
        />
      </div>
    </Box>
  );
};

export default HomePage;
