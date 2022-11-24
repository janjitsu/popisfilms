import React from 'react';
import SearchIcon from './search.svg';
import './SearchBar.css';

const SearchBar = (props, {searchTerm, handleOnChange, handleOnClick}) => {
    return (
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={ props.searchTerm }
                    onChange={(e) => props.handleOnChange(e.target.value)}
                />
                <img
                    src={ SearchIcon }
                    alt="search"
                    onClick={(e) => props.handleOnClick()}
                />
            </div>
    )
}

export default SearchBar;
