const BACKEND_URL = `http://localhost:8080`;

const authHeaders = (user) =>
    new Promise( async (resolve) => {
        const userToken = await user.getIdToken()
        resolve(
          {
            headers: {
              'Authorization': 'Bearer ' + userToken
            }
          }
        )
    });

const getFavorites = (user) =>
    new Promise( async (resolve) => {
        const authHeader = await authHeaders(user)
        const response = await fetch(`${BACKEND_URL}/favorites`, authHeader)
        const data = await response.json();
        let favorites = data.result.favorites
        console.log("< GET FAVORITES > ", favorites);
        resolve(favorites);
    });

export {getFavorites};
