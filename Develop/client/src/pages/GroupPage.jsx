import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_GROUP } from '../utils/queries';
import UserCard from '../components/UserCard';

const GroupPage = () => {
  const { groupId } = useParams();
  const { loading, error, data } = useQuery(GET_GROUP, {
    variables: { groupId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { group } = data;

  return (
    <div className="container">
      <h1 className="title my-3">{group.name}</h1>
      <div className="subtitle my-3">Subject: {group.subject}</div>
      <div className="subtitle my-3">{group.description}</div>
      <h2 className="title is-4 my-3">Members:</h2>
      <div className="columns is-multiline">
        {group.members.map(user => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default GroupPage;
