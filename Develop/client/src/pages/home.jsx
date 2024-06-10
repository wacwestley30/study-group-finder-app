import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../utils/queries';
import SearchBar from '../components/SearchBar';
import GroupCard from '../components/GroupCard';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Use the useQuery hook to fetch data
  const { loading, error, data, refetch } = useQuery(GET_GROUPS);

  // Refetch data when component mounts or gains focus
  useEffect(() => {
    refetch();
    const handleFocus = () => {
      refetch();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refetch]);

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
    <div className="container">
      {/* Search bar */}
      <div className="is-hidden-touch">
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          title="Search All Groups"
          style="my-2"
        />
      </div>
      {/* Search bar */}
      <div className="is-hidden-desktop">
        <SearchBar
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          title="Search All Groups"
          style="m-2"
        />
      </div>
      {/* Display groups */}
      <div className="columns is-multiline is-hidden-touch">
        {filteredGroups.map(group => (
          <GroupCard key={group._id} group={group} />
        ))}
      </div>
      <div className="columns is-multiline is-hidden-desktop mx-1">
        {filteredGroups.map(group => (
          <GroupCard key={group._id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default Home;