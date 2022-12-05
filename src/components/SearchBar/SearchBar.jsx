import React from 'react';
import SearchIcon from './search.svg';
import './SearchBar.css';

const SearchBar = (props, {searchTerm, handleOnChange, handleOnClick}) => {
    const handleHitEnter = (e) => {
        if (e.key === 'Enter') {
            props.handleOnClick()
        }
    }
    return (
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={ props.searchTerm }
                    onChange={(e) => props.handleOnChange(e.target.value)}
                    onKeyDown={(e) => handleHitEnter(e)}
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
