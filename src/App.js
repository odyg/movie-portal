// apiKey = d8f9605ca89ef4cf65d48c2dd815b4a4
// TOP RATED MOVIES: https://api.themoviedb.org/3/movie/top_rated?api_key=YOUR_API_KEY&language=en-US&page=1
// Searching Movies: https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&language=en-US&query=MOVIE_TITLE&page=1&include_adult=false
// Movie Details: https://api.themoviedb.org/3/movie/MOVIE_ID?api_key=YOUR_API_KEY&language=en-US
//Movie Genres: https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY&language=en-US

import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MovieDetailsPage from "./components/MovieDetailsPage/MovieDetailsPage";

const YOUR_API_KEY = "d8f9605ca89ef4cf65d48c2dd815b4a4";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage apiKey={YOUR_API_KEY} />} />
        <Route
          path="/movie/:movieId"
          element={<MovieDetailsPage apiKey={YOUR_API_KEY} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import HomePage from "./components/HomePage";
// import MovieDetailsPage from "./components/MovieDetailsPage";

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact component={HomePage} />
//         <Route path="/movie/:movieId" component={MovieDetailsPage} />
//       </Switch>
//     </Router>
//   );
// }

// export default App;
