import './Home.css';
/** components **/
import MovieCard from 'components/MovieCard/MovieCard.jsx';
import Profile from 'components/User/Profile/Profile.jsx';
import Loader from 'components/Loader/Loader.jsx';
/** providers */
import { useSession } from "providers/Session";
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
/** remove me **/
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const Home = () => {
  const db = firebase.firestore();
  const { user, loginMethod, logoutMethod } = useSession();
  const [state, setState] = useState({ loading: true });
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  /*
  const addFavorites = async () => {
    db.collection("users")
      .doc(user.uid)
      .set({
        favorites: favorites
      })
      .then((response) => {
        console.log("< ADD FAVORITES : DONE > ", response);
      })
      .catch((e) => console.warn("< ADD FAVORITES : ERROR > ", e));
  };
  */
  const addFavorites = () => {
    navigate('/add');
  }

  const getFavorites = async () => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setFavorites(doc.data()['favorites']);
          console.log("< GET FAVORITES > ", doc.data());
        }
      })
      .catch((e) => {
        console.warn("< GET FAVORITES : ERROR > ", e);
      });
  };

  useEffect(() => {
    getFavorites().then(() => {
      setState({ ...state, loading: false});
    })
  }, [user]);


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
