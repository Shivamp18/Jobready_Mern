// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../../utils/api/api';
// import Spinner from '../common/Spinner';

// const ForumList = () => {
//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const res = await api.get('/api/forum');
//         console.log(res);
//         console.log(res.data);
//         setTopics(res.data);

        
//         // Extract unique categories
//         const uniqueCategories = [...new Set(res.data.map(topic => topic.category))];
//         setCategories(uniqueCategories);
//       } catch (err) {
//         setError('Failed to load forum topics');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTopics();
//   }, []);

//   const filteredTopics = selectedCategory === 'all' 
//     ? topics 
//     : topics.filter(topic => topic.category === selectedCategory);

//   if (loading) {
//     return <Spinner />;
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Discussion Forum</h1>
//         <Link
//           to="/forum/create"
//           className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block"
//         >
//           Create New Topic
//         </Link>
//       </div>

//       {error && (
//         <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
//           {error}
//         </div>
//       )}

//       <div className="mb-6">
//         <label htmlFor="category" className="block text-gray-700 mb-2">
//           Filter by Category:
//         </label>
//         <select
//           id="category"
//           value={selectedCategory}
//           onChange={(e) => setSelectedCategory(e.target.value)}
//           className="w-full md:w-64 p-2 border rounded"
//         >
//           <option value="all">All Categories</option>
//           {categories.map(category => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       {filteredTopics.length === 0 ? (
//         <div className="bg-white rounded-lg shadow-md p-6 text-center">
//           <p className="text-gray-600">No topics found. Be the first to create a topic!</p>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <ul className="divide-y divide-gray-200">
//             {filteredTopics.map(topic => (
//               <li key={topic._id} className="p-4 hover:bg-gray-50">
//                 <Link to={`/forum/${topic._id}`} className="block">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h2 className="text-lg font-medium text-gray-900 mb-1">{topic.title}</h2>
//                       <p className="text-gray-600 mb-2 line-clamp-2">{topic.content}</p>
//                       <div className="flex items-center text-sm text-gray-500">
//                         <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-3">
//                           {topic.category}
//                         </span>
//                         <span>By {topic.creator?.name}</span>
//                         <span className="mx-2">•</span>
//                         <span>{new Date(topic.createdAt).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       <span className="font-medium">{topic?.replies?.length}</span> replies
//                     </div>
//                   </div>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ForumList;








import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api/api';
import { Card, Button, Alert, Form } from 'react-bootstrap';
import Spinner from '../common/Spinner';


const ForumList = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await api.get('/api/forum');
        setTopics(res.data);
        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map(topic => topic.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError('Failed to load forum topics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const filteredTopics = selectedCategory === 'all'
    ? topics
    : topics.filter(topic => topic.category === selectedCategory);

  if (loading) {
    return <Spinner />;
  }


  


  return (

    

    <div className="d-flex justify-content-center">
      <Card className="w-100" style={{ maxWidth: '550px', padding: '20px', margin: '25px' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-2xl font-weight-bold text-gray-800 mb-0">Discussion Forum</h1>
            <Link
              to="/forum/create"
              className="btn btn-primary"
            >
              Create New Topic
            </Link>
          </div>

          {error && (
            <Alert variant="danger">{error}</Alert>
          )}

          <Form.Group className="mb-4">
            <Form.Label>Filter by Category:</Form.Label>
            <Form.Select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}

            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {filteredTopics.length === 0 ? (
            <Card className="p-4 text-center">
              <p className="text-gray-600">No topics found. Be the first to create a topic!</p>
            </Card>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="list-group list-group-flush">
                {filteredTopics.map(topic => (
                  <li key={topic._id} className="list-group-item p-4 hover:bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className='w-100'>

                        <div className="text-sm text-muted d-flex align-items-center justify-content-between">
                          <h2 className="text-lg  font-weight-medium text-gray-900">
                            
                              {topic.title}
                        
                          </h2>
                          <Link to={`/forum/${topic._id}`} className="text-decoration-underline">
                            <span>{topic?.replies?.length}</span>
                            <h6>REPLIES</h6>
                          </Link>
                          
                        </div>
                        <p className="text-gray-600 mb-2 small text-truncate">{topic.content}</p>
                        <div className="d-flex  text-sm text-muted" style={{ display: 'flex' }}>
                          <span className="text text-secondary mr-3 fw-bold text-start" style={{ minWidth: '100px', flex: '2' }}>{topic.category}</span>
                          <span className='mx-2' style={{ minWidth: '100px', flex: '1' }}>By {topic.creator?.name}</span>

                          <span style={{ minWidth: '100px', flex: '1' }}>{new Date(topic.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>


                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForumList;
