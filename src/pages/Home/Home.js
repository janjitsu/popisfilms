import './Home.css';
import ShareIcon from './share.svg';
/** providers */
import { useSession } from "providers/Session";

const Home = () => {
    const { user, loginMethod } = useSession();

    return (
        <div className="app">
            <h1>MovieLand</h1>
            {user?.displayName ? (
                <div className="profile">
                    <div className="avatar">
                        <div className="avatar-img">
                            <img src={user.photoURL} alt={user.displayName}/>
                        </div>
                        <p>{user.displayName}</p>
                    </div>
                    <div className="description">
                        Passionate about horror movies born in Brazil
                    </div>
                    <div className="share">
                        <img src={ShareIcon} alt="Share your Profile"/>
                    </div>
                </div>
            ) : (
                <>
                <div className="description">
                    Login to save your favorite Movies
                </div>
                    <button type="button" class="login-btn" onClick={() => loginMethod()}>
                    Sign in with Google
                </button>
                </>
            )}
        </div>
    )
}

export default Home;
