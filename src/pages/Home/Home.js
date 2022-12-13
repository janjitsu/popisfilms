import './Home.css';
/** components **/
import MovieCard from 'components/MovieCard/MovieCard.jsx';
import Profile from 'components/User/Profile/Profile.jsx';
import Loader from 'components/Loader/Loader.jsx';
/** providers */
import { useSession } from "providers/Session";
import {useState, useEffect, useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {getFavorites} from "services/favorites.js";
/** remove me **/


const Home = () => {
  const { user, loginMethod, logoutMethod } = useSession();
  const [state, setState] = useState({ loading: true });
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const addFavorites = () => {
    navigate('/add');
  }

  const finishLoading = useCallback(() => {
    setState({ ...state, loading: false});
  },[state]);


  useEffect(() => {
    if (user.uid !== undefined) {
      getFavorites(user)
        .then((movies) => {
          setFavorites(movies);
          finishLoading()
        })
        .catch((e) => {
          console.log("error getting favorites")
          finishLoading()
        });
    } else {
      finishLoading()
    }
  }, [user, finishLoading]);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <Loader loading={state.loading}>
        {user?.displayName ? (
          <>
            <Profile
              user={user}
              logoutAction={logoutMethod}
              addFavoritesAction={addFavorites}
            />
            <div className="favorites">
              <h1>{user.displayName}'s Favorite Movies</h1>
              {favorites?.length > 0 ? (
                <div className="container">
                  {favorites.map((movie) => (
                    <MovieCard movie={movie} key={movie.imdbID}/>
                  ))}
                </div>
              ) : (
                <div className="empty">
                  <h2>No favorites found :(</h2>
                </div>
                  )}
            </div>
          </>
              ) : (
                <>
                  <div className="description">
                    Login to save your favorite Movies
                  </div>
                  <button type="button" className="login-btn" onClick={() => loginMethod()}>
                    Sign in with Google
                  </button>
                </>
              )}

      </Loader>
    </div>
  )
}

export default Home;
