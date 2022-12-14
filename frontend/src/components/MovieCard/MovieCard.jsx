import React from 'react';
import './MovieCard.css';

const MovieCard = (props,{movie, decoration, handleOnClick}) => {
    const placeholder = {
        Year: '9999',
        Poster: 'https://via.placeholder.com/400',
        PosterError: 'https://via.placeholder.com/500',
        Title: 'Lorem Ipsum',
        Type: 'Lorem Ipsum'
    }

    return (
        <div className="movie" onClick={() => props?.handleOnClick()}>
            <div>
                <p>{props?.movie?.Year || placeholder.Year}</p>
                {props?.decoration ? (
                    <span><a href="#decoration">{props.decoration}</a></span>
                ):null}
            </div>
            <div>
                <img
                    src={ (props?.movie?.Poster !== 'N/A' ?
                            props?.movie?.Poster : placeholder.Poster) || placeholder.PosterError
                    }
                    alt={props?.movie?.Title || placeholder.Title}
                />
            </div>
            <div>
                <span>{props?.movie?.Type || placeholder.Type}</span>
                <h3>{props?.movie?.Title || placeholder.Title}</h3>
            </div>
        </div>
    )
}

export default MovieCard;
