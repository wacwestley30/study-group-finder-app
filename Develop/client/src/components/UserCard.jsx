import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-content has-text-centered">
          <div className="content is-size-4 has-text-weight-bold">{user.firstName} {user.lastName}</div>
          <div className="content">University: {user.university}</div>
          <div className="content">Major: {user.major}</div>
          <div className="content">Year: {user.year}</div>
          <Link to={`/profile/${user._id}`} className="button is-link">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard;