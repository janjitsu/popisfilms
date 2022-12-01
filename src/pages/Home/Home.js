import './Home.css';
import ShareIcon from './share.svg';
import AddIcon from './add.svg';
import LogoutIcon from './logout.svg';
import MovieCard from 'components/MovieCard/MovieCard.jsx';
/** providers */
import { useSession } from "providers/Session";
import {useState, useEffect} from 'react';

const Home = () => {
    const { user, loginMethod, logoutMethod } = useSession();
    const [state, setState] = useState({
        loading: true,
    });
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
      setTimeout(()=>{
          setState({ ...state, loading: false});
      }, 1000)
    }, [user]);


    return (
        <div className="app">
            <h1>MovieLand</h1>
            {state.loading ? (
                <div className="loading">⌛Loading...</div>
            ) : (
                <>
                {user?.displayName ? (
                    <>
                        <div className="profile">
                            <div className="avatar">
                                <div className="avatar-img">
                                    <img src={user.photoURL} alt={user.displayName}/>
                                </div>
                                <p>{user.displayName}</p>
                            </div>
                            <div className="side-box">
                                <div className="description">
                                    Passionate about horror movies born in Brazil
                                </div>
                                <div className="actions">
                                    <input type="image" src={AddIcon} alt="Add Favorite Movies" title="Add Favorite Movies"/>
                                    <input type="image" src={ShareIcon} alt="Share your Profile" title="Share your Profile"/>
                                    <input type="image" src={LogoutIcon} alt="Logout" title="Logout" onClick={()=>logoutMethod()}/>
                                </div>
                            </div>
                        </div>
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
                </>
            )}
        </div>
    )
}

export default Home;
