import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_ME, GET_GROUPS } from '../utils/queries';
import GroupCard from '../components/GroupCard';
import UserProfile from '../components/UserProfile';
import Auth from '../utils/auth';

const ProfilePage = () => {
  const { userId: userParam } = useParams();
  const isCurrentUser = !userParam;
  const [showAllGroups, setShowAllGroups] = useState(false);

  // Fetch user data
  const { loading: userLoading, error: userError, data: userData } = useQuery(
    isCurrentUser ? GET_ME : GET_USER,
    {
      variables: { userId: userParam },
      skip: isCurrentUser && !Auth.loggedIn(), // Skip query if viewing own profile and not logged in
    }
  );

  // Fetch all groups data
  const { loading: groupsLoading, error: groupsError, data: groupsData } = useQuery(GET_GROUPS);

  // Handle loading and error states
  if (userLoading || groupsLoading) return <p>Loading...</p>;
  if (userError || groupsError) return <p>Error: {userError?.message || groupsError?.message}</p>;

  // Extract user data and groups data
  const user = userData?.me || userData?.user || {};
  const groups = groupsData?.groups || [];

  console.log(user)

  // Handle rendering based on user's groups and all groups
  return (
    <div className="container">
      <div className="is-hidden-touch">
        <UserProfile user={user} />
      </div>
      <div className="is-hidden-desktop mx-4 has-text-centered">
        <UserProfile user={user} />
      </div>
      {user.groups.length === 0 ? (
        <div className="my-3">
          <p>You aren't in any groups yet!</p>
          <button className="button is-primary" onClick={() => setShowAllGroups(true)}>
            Find Groups
          </button>
        </div>
      ) : (
        <>
          <div className="columns is-multiline is-hidden-touch">
            {user.groups.map(group => (
              <GroupCard key={group._id} group={group} />
            ))}
          </div>
          <div className="columns is-multiline is-hidden-desktop mx-1">
            {user.groups.map(group => (
              <GroupCard key={group._id} group={group} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;