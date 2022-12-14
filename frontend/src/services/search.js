const API_KEY = '4316022';
const API_URL = `https://www.omdbapi.com/?apiKey=${API_KEY}`;

const searchMovies = (title) =>
    new Promise( async (resolve) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        resolve(data.Search);
    });


export {searchMovies};
