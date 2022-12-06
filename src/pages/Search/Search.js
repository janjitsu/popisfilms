import './Search.css';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import MovieCard from 'components/MovieCard/MovieCard.jsx';
import SearchBar from 'components/SearchBar/SearchBar.jsx';
import Avatar from 'components/User/Avatar/Avatar.jsx';
import { useSession } from "providers/Session";
import {searchMovies} from 'services/search.js';
import {addFavorites,getFavorites} from "services/favorites.js";

const Search = () => {
  const { user } = useSession();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const startingSearch = '';

  const getSearchResult = async (title) => {
    const result = await searchMovies(title);
    setMovies(result);
  }

  const goToProfile = () => {
    navigate('/');
  }

  const isFavorite = (movie) => favorites.find( item =>
    movie.imdbID === item.imdbID
  );

  const addToFavorites = async (movie) => {
    if (isFavorite(movie)) return false;
    let newFavorites = [...favorites]
    newFavorites.push(movie)
    setFavorites(newFavorites);
    await addFavorites(user,newFavorites);
    console.log(`added ${movie.Title} to favorites`);
  }

  const removeFromFavorites = async (movie) => {
    if (!isFavorite(movie)) return false;
    let newFavorites = favorites.filter( item =>
      item.imdbID !== movie.imdbID
    );
    setFavorites(newFavorites);
    await addFavorites(user,newFavorites);
    console.log(`removed ${movie.Title} from favorites`)
  }

  useEffect(() => {
    getFavorites(user).then((movies) => {
      setMovies(movies);
      setFavorites(movies);
    });
  },[user])

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <Avatar user={user} text="Back to Profile" handleOnClick={() => goToProfile()}/>
      <SearchBar
        searchTerm={searchTerm}
        handleOnChange={(e) => setSearchTerm(e)}
        handleOnClick={(e) => getSearchResult(searchTerm)}
      />
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              movie={movie}
              key={movie.imdbID}
              decoration={isFavorite(movie) ? "★ Favorites" : "☆ Add to Favorites" }
              handleOnClick={isFavorite(movie) ? () => removeFromFavorites(movie) : () => addToFavorites(movie) }
              />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default Search;
