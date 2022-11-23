import './App.css';
import {useState, useEffect} from 'react';
import MovieCard from './components/MovieCard/MovieCard.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';

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
            <SearchBar
                searchTerm={searchTerm}
                handleOnChange={(e) => setSearchTerm(e)}
                handleOnClick={(e) => searchMovies(searchTerm)}
            />
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
