import ShareIcon from './share.svg';
import AddIcon from './add.svg';
import LogoutIcon from './logout.svg';


const Profile = (props, {user,logoutAction}) => {
    return (
        <div className="profile">
            <div className="avatar">
                <div className="avatar-img">
                    <img src={props.user.photoURL} alt={props.user.displayName}/>
                </div>
                <p>{props.user.displayName}</p>
            </div>
            <div className="side-box">
                <div className="description">
                    Passionate about horror movies born in Brazil
                </div>
                <div className="actions">
                    <input type="image" src={AddIcon} alt="Add Favorite Movies" title="Add Favorite Movies"/>
                    <input type="image" src={ShareIcon} alt="Share your Profile" title="Share your Profile"/>
                    <input type="image" src={LogoutIcon} alt="Logout" title="Logout" onClick={()=>props.logoutAction()}/>
                </div>
            </div>
        </div>
    )
}

export default Profile;
