import './Home.css';
import MovieCard from 'components/MovieCard/MovieCard.jsx';
import Profile from 'components/User/Profile/Profile.jsx';
import Loader from 'components/Loader/Loader.jsx';
/** providers */
import { useSession } from "providers/Session";
import {useState, useEffect} from 'react';
import "firebase/compat/firestore";


const Home = () => {
  const { user, loginMethod, logoutMethod } = useSession();
  const [state, setState] = useState({
    loading: true,
  });
  const db = firebase.firestore();

  const createRoom = async () => {
    db.collectiok("users")
      .doc(user.uid)
    // .doc(`${form}-${btoa(user.uid)}`)
      .set({
        roomOwner: user.uid,
        roomName: form,
        createDate: new Date(),
        url: `/room/${form}`,
      })
      .then((response) => {
        console.log("< CREATE ROOM : DONE > ", response);

        setState({
          ...state,
          createdRoom: true,
          roomPayload: {
            roomOwner: user.uid,
            roomName: form,
            url: `/room/${form}`,
          },
        });

        db.collection("rooms")
          .doc(String(form))
          .set({
            membersOnline: [],
            votes: {},
            tasks: [],
            showVotes: false,
            roomOwner: user.uid,
            roomName: form,
            url: `/room/${form}`,
          });
      })
      .catch((e) => console.warn("< CREATE ROOM : ERROR > ", e));
  };



  const favorites = [
    {
      "Title": "Belle de Jour",
      "Year": "1967",
      "imdbID": "tt0061395",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZjNkNGJjYWEtM2IyNi00ZjM5LWFlYjYtYjQ4NTU5MGFlMTI2XkEyXkFqcGdeQXVyMTMxMTY0OTQ@._V1_SX300.jpg"
    },
    {
      "Title": "Belle De Jour Remake",
      "Year": "2017",
      "imdbID": "tt6553072",
      "Type": "movie",
      "Poster": "N/A"
    }
  ]

  useEffect(() => {
    setState({ ...state, loading: false});
  }, [user]);


  return (
    <div className="app">
      <h1>MovieLand</h1>
      <Loader loading={state.loading}>
        {user?.displayName ? (
          <>
            <Profile user={user} logoutAction={logoutMethod} />
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
