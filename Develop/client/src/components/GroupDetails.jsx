import Auth from '../utils/auth';

const GroupDetails = ({ group, isMember, handleJoinGroup, handleLeaveGroup }) => {
  return (
    <div className="group-details">
      <h1 className="title my-3">{group.name}</h1>
      <p>Subject: {group.subject}</p>
      <p>{group.description}</p>
      <div className="level mb-0">
        <h2 className="title my-3">Members:</h2>
        {Auth.loggedIn() && !isMember && (
          <button className="button is-primary my-3" onClick={handleJoinGroup}>
            Join Group
          </button>
        )}
        {Auth.loggedIn() && isMember && (
          <button className="button is-danger my-3" onClick={handleLeaveGroup}>
            Leave Group
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;