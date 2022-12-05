import ShareIcon from './share.svg';
import AddIcon from './add.svg';
import LogoutIcon from './logout.svg';
import Avatar from 'components/User/Avatar/Avatar.jsx';


const Profile = (props, {user,logoutAction,addFavoritesAction}) => {
    return (
        <div className="profile">
            <Avatar user={props.user}/>
            <div className="side-box">
                <div className="description">
                    Passionate about horror movies, born in Brazil.
                </div>
                <div className="actions">
                    <input type="image" src={AddIcon} alt="Add Favorite Movies" title="Add Favorite Movies" onClick={()=>props.addFavoritesAction()}/>
                    <input type="image" src={ShareIcon} alt="Share your Profile (TBD)" title="Share your Profile"/>
                    <input type="image" src={LogoutIcon} alt="Logout" title="Logout" onClick={()=>props.logoutAction()}/>
                </div>
            </div>
        </div>
    )
}

export default Profile;
