
/* @TODO isolate avatar style */
const Avatar = (props, {user, text, handleOnClick}) => {
  console.log(props);
  return (
    <div className="avatar">
      <div className="avatar-img">
        {props.handleOnClick ? (
        <input type="image"
          src={props?.user?.photoURL}
          title={props?.user?.displayName}
          alt={props?.user?.displayName}
          onClick={props.handleOnClick}
          />
        ) : (
        <img
          src={props?.user?.photoURL}
          title={props?.user?.displayName}
          alt={props?.user?.displayName}
          />
        )}
      </div>
      <p>{props?.text}</p>
    </div>
  )
}

export default Avatar;
