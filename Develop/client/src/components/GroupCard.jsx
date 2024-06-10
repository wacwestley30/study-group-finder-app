import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => {
  return (
    <div className="column is-one-third">
      <div className="card">
        <div className="card-content has-text-centered">
          <div className="content is-size-4 has-text-weight-bold">{group.name}</div>
          <div className="content">Subject: {group.subject}</div>
          <div className="content">Number of members: {group.members.length}</div>
          <Link to={`/group/${group._id}`} className="button is-link">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;