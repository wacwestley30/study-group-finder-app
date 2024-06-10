const UserProfile = ({ user }) => {
    return (
      <>
        <h1 className="title my-3">{user.username}'s Profile</h1>
        <p>Name: {user.firstName} {user.lastName}</p>
        <p>University: {user.university}</p>
        <p>Major: {user.major}</p>
        <p>Year: {user.year}</p>
        <h2 className="title my-3">{user.username}'s Groups:</h2>
      </>
    );
  };
  
  export default UserProfile;