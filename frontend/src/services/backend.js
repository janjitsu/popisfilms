const BACKEND_URL = `http://localhost:8080`;

const authHeaders = (user) =>
    new Promise( async (resolve) => {
        const userToken = await user.getIdToken()
        resolve(
          {
            headers: {
              'Authorizaton': 'Bearer ' + userToken
            }
          }
        )
    });

const getFavorites = (user) =>
    new Promise( async (resolve) => {
        const authHeader = await authHeaders(user)
        const response = await fetch(`${BACKEND_URL}/favorites`, authHeader)
        const data = await response.json();
        resolve(data);
    });

export {getFavorites};
