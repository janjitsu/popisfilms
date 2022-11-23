import './App.css';
import SearchIcon from './search.svg';
import {useState, useEffect} from 'react';
import MovieCard from './components/MovieCard/MovieCard.jsx';

const API_KEY = '4316022';
const API_URL = `http://www.omdbapi.com/?apiKey=${API_KEY}`;

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        console.log(data);
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Guardians of the Galaxy');
        setSearchTerm('Guardians of the Galaxy');
    },[])

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={ SearchIcon }
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} />
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

export default App;
