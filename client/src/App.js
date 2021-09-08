import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Route, Switch, Redirect } from 'react-router-dom';
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from './components/AddMovieForm';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then((res) => {
        setMovies(res.data);
        setFavoriteMovies(res.data.filter(({ favorite }) => favorite));
        // set favorite movies here with a filter
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`, id)
      .then((res) => {
        setMovies(movies.filter(({ id }) => id !== res.data));
      })
      .catch((err) => {
        console.log('Error deleting movie :(\n', err);
      });
  };

  const addMovie = (movie) => {
    axios
      .post('http://localhost:5000/api/movies', movie)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log('Eerror adding new movie');
        console.log(err);
      });
  };

  const addToFavorites = (movie) => {
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, {
        ...movie,
        favorite: true,
      })
      .then((res) => {
        console.log(res.data);
        setFavoriteMovies(
          [...favoriteMovies, ...res.data].filter(({ favorite }) => favorite)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-dark'>
        <span className='navbar-brand'>
          <img width='40px' alt='' src='./Lambda-Logo-Red.png' /> HTTP / CRUD
          Module Project
        </span>
      </nav>

      <div className='container'>
        <MovieHeader />
        <div className='row '>
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path='/movies/edit/:id'>
              <EditMovieForm setMovies={setMovies} />
            </Route>

            <Route path='/movies/:id'>
              <Movie
                deleteMovie={deleteMovie}
                addToFavorites={addToFavorites}
              />
            </Route>

            <Route path='/new-movie'>
              <AddMovieForm addMovie={addMovie} />
            </Route>

            <Route path='/movies'>
              <MovieList movies={movies} />
            </Route>

            <Route path='/'>
              <Redirect to='/movies' />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
