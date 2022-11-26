import './Home.css';
import ShareIcon from './share.svg';

const Home = () => {
    return (
        <div className="app">
            <h1>MovieLand</h1>
        <div className="profile">
            <div className="avatar">
                <div className="avatar-img">
                    <img src="https://i.pravatar.cc/300"/>
                </div>
                <p>Jan Silva</p>
            </div>
            <div className="description">
                Passionate about horror movies born in Brazil
            </div>
            <div className="share">
                <img src={ShareIcon} alt="Share your Profile"/>
            </div>
        </div>
            <div className="container">
            </div>
        </div>
    );
}

export default Home;
