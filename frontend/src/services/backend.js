const BACKEND_URL = `http://localhost:8080`;

const getFavorites = (user) =>
    new Promise( async (resolve) => {
        const response = await fetch(`${BACKEND_URL}/favorites`)
        const data = await response.json();

        resolve(data);
    });

export {getFavorites};
