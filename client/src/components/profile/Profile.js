// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import api from '../../utils/api/api';
// import Spinner from '../common/Spinner';

// const Profile = () => {
//   const { user } = useContext(AuthContext);
//   const [stats, setStats] = useState({
//     interviews: 0,
//     flashcards: 0,
//     forumPosts: 0
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUserStats = async () => {
//       try {
//         const res = await api.get('/api/users/stats');
//         setStats(res.data);
//       } catch (err) {
//         setError('Failed to load user statistics');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserStats();
//   }, []);

//   if (loading) {
//     return <Spinner />;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
//             <p className="text-gray-600">{user?.email}</p>
//           </div>
//           <Link
//             to="/profile/edit"
//             className="mt-4 md:mt-0 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//           >
//             Edit Profile
//           </Link>
//         </div>

//         <div className="border-t pt-6">
//           <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
          
//           {error && (
//             <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
//               {error}
//             </div>
//           )}
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h3 className="font-medium text-gray-700">Mock Interviews</h3>
//               <p className="text-2xl font-bold">{stats.interviews}</p>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h3 className="font-medium text-gray-700">Flashcards</h3>
//               <p className="text-2xl font-bold">{stats.flashcards}</p>
//             </div>
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h3 className="font-medium text-gray-700">Forum Posts</h3>
//               <p className="text-2xl font-bold">{stats.forumPosts}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Interviews</h2>
//           <div className="space-y-4">
//             {/* This would be populated with actual data in a real app */}
//             <p className="text-gray-600">No recent interviews found.</p>
//             <Link to="/mock-interviews" className="text-blue-600 hover:underline block">
//               Browse Mock Interviews →
//             </Link>
//           </div>
//         </div>
        
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Flashcards</h2>
//           <div className="space-y-4">
//             {/* This would be populated with actual data in a real app */}
//             <p className="text-gray-600">No recent flashcards found.</p>
//             <Link to="/flashcards" className="text-blue-600 hover:underline block">
//               Browse Flashcards →
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api/api';
import { Card, Button, Alert } from 'react-bootstrap';
import Spinner from '../common/Spinner';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    interviews: 0,
    flashcards: 0,
    forumPosts: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await api.get('/api/users/stats');
        setStats(res.data);
      } catch (err) {
        setError('Failed to load user statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="d-flex justify-content-center">
      <Card className="w-100" style={{ maxWidth: '550px', padding: '20px' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="text-2xl font-weight-bold text-gray-800 mb-0">{user?.name}</h1>
              <p className="text-muted">{user?.email}</p>
            </div>
            <Link
              to="/profile/edit"
              className="btn btn-primary"
            >
              Edit Profile
            </Link>
          </div>

          <div className="border-top pt-4 mb-4">
            <h2 className="text-xl font-semibold mb-3">Your Activity</h2>
            {error && (
              <Alert variant="danger">{error}</Alert>
            )}
            <div className="row">
              <div className="col-md-4 mb-3">
                <Card className="p-4">
                  <h3 className="font-weight-medium text-gray-700">Mock Interviews</h3>
                  <p className="text-2xl font-weight-bold">{stats.interviews}</p>
                </Card>
              </div>
              <div className="col-md-4 mb-3">
                <Card className="p-4">
                  <h3 className="font-weight-medium text-gray-700">Flashcards</h3>
                  <p className="text-2xl font-weight-bold">{stats.flashcards}</p>
                </Card>
              </div>
              <div className="col-md-4 mb-3">
                <Card className="p-4">
                  <h3 className="font-weight-medium text-gray-700">Forum Posts</h3>
                  <p className="text-2xl font-weight-bold">{stats.forumPosts}</p>
                </Card>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <Card className="p-4">
                <h2 className="text-xl font-semibold mb-3">Recent Interviews</h2>
                <div className="space-y-2">
                  {/* This would be populated with actual data in a real app */}
                  <p className="text-muted">No recent interviews found.</p>
                  <Link to="/mock-interviews" className="text-blue-600 hover:underline d-block">
                    Browse Mock Interviews →
                  </Link>
                </div>
              </Card>
            </div>
            <div className="col-md-6 mb-4">
              <Card className="p-4">
                <h2 className="text-xl font-semibold mb-3">Recent Flashcards</h2>
                <div className="space-y-2">
                  {/* This would be populated with actual data in a real app */}
                  <p className="text-muted">No recent flashcards found.</p>
                  <Link to="/flashcards" className="text-blue-600 hover:underline d-block">
                    Browse Flashcards →
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
