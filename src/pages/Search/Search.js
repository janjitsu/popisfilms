import './Search.css';
import {useState, useEffect} from 'react';
import MovieCard from 'components/MovieCard/MovieCard.jsx';
import SearchBar from 'components/SearchBar/SearchBar.jsx';
import {searchMovies} from 'services/search.js';


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const startingSearch = 'Guardians of the Galaxy';
    const getSearchResult = async (title) => {
        const result = await searchMovies(title);
        setMovies(result);
    }

    useEffect(() => {
        getSearchResult(startingSearch);
        setSearchTerm(startingSearch);
    },[])

    return (
        <div className="app">
            <h1>MovieLand</h1>
            <SearchBar
                searchTerm={searchTerm}
                handleOnChange={(e) => setSearchTerm(e)}
                handleOnClick={(e) => getSearchResult(searchTerm)}
            />
            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.imdbID}/>
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
