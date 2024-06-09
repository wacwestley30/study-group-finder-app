import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_GROUPS } from '../utils/queries';

const GroupPage = () => {
  const [showAllGroups, setShowAllGroups] = useState(false);

  const { loading: meLoading, error: meError, data: meData } = useQuery(GET_ME);
  const { loading: groupsLoading, error: groupsError, data: groupsData } = useQuery(GET_GROUPS);

  if (meLoading || groupsLoading) return <p>Loading...</p>;
  if (meError || groupsError) return <p>Error: {meError?.message || groupsError?.message}</p>;

  const handleFindGroupsClick = () => {
    setShowAllGroups(true);
  };

  const me = meData.me;
  const groups = groupsData.groups;

  return (
    <div className="container">
      <h1 className="title">Your Groups</h1>
      {me.groups.length === 0 ? (
        <div>
          <p>You aren't in any groups yet!</p>
          <button className="button is-primary" onClick={handleFindGroupsClick}>Find Groups</button>
        </div>
      ) : (
        <ul>
          {me.groups.map((group) => (
            <li key={group._id}>
              <Link to={`/group/${group._id}`} className="has-text-link">{group.name}</Link>
            </li>
          ))}
        </ul>
      )}
      {showAllGroups && (
        <div>
          <h2 className="subtitle">All Groups</h2>
          <ul>
            {groups.map((group) => (
              <li key={group._id}>
                <Link to={`/group/${group._id}`} className="has-text-link">{group.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GroupPage;
