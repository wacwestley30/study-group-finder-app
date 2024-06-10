import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../utils/queries';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Use the useQuery hook to fetch data
  const { loading, error, data } = useQuery(GET_GROUPS);

  // Handle search term change
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Filter groups based on search term
  const filteredGroups = data.groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
        <div className="container">
            <h1 className="title my-3">All Groups</h1>
            {/* Search bar */}
            <div className="field my-3">
                <div className="control">
                  <input
                      className="input"
                      type="text"
                      placeholder="Search by name or subject"
                      value={searchTerm}
                      onChange={handleSearch}
                  />
                </div>
            </div>
            {/* Display groups */}
            <div className="columns is-multiline">
                {filteredGroups.map(group => (
                <div key={group._id} className="column is-one-third">
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
                ))}
            </div>
        </div>
    </main>
  );
};

export default Home;
