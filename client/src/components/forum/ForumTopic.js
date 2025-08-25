// // import React, { useState, useEffect, useContext } from 'react';
// // import { useParams, Link, useNavigate } from 'react-router-dom';
// // import { AuthContext } from '../../context/AuthContext';
// // import api from '../../utils/api/api';
// // import Spinner from '../common/Spinner';
// // import { Alert, Button, Card } from 'react-bootstrap';

// // const ForumTopic = () => {
// //   const { id } = useParams();
// //   const { user } = useContext(AuthContext);
// //   const [topic, setTopic] = useState(null);
// //   const [replyContent, setReplyContent] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// // console.log(id);

// //   useEffect(() => {
// //     const fetchTopic = async () => {
// //       try {
// //         const res = await api.get(`/api/forum/${id}`);
// //         setTopic(res.data);
// //         console.log(topic);
// //         console.log(res.data);
// //       } catch (err) {
// //         setError('Failed to load topic');
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchTopic();
// //   }, [id]);

// //   const handleReplySubmit = async (e) => {
// //     e.preventDefault();
// //     if (!replyContent.trim()) return;

// //     setSubmitting(true);
// //     try {
// //       const res = await api.post(`/api/forum/${id}/replies`, { content: replyContent });
// //       setTopic(res.data);
// //       setReplyContent('');
// //     } catch (err) {
// //       setError('Failed to post reply');
// //       console.error(err);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (!window.confirm('Are you sure you want to delete this topic? This action cannot be undone.')) {
// //       return;
// //     }

// //     try {
// //       await api.delete(`/api/forum/${id}`);
// //       navigate('/forum');
// //     } catch (err) {
// //       setError('Failed to delete topic');
// //       console.error(err);
// //     }
// //   };

// //   if (loading) {
// //     return <Spinner />;
// //   }

// //   if (!topic) {
// //     return (
// //       <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
// //         <h2 className="text-xl font-bold text-red-600 mb-4">Topic Not Found</h2>
// //         <p className="text-gray-600 mb-4">The topic you're looking for doesn't exist or has been removed.</p>
// //         <Link to="/forum" className="text-blue-600 hover:underline">
// //           Back to Forum
// //         </Link>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-4xl mx-auto">
// //       <div className="mb-6">
// //         <Link to="/forum" className="text-blue-600 hover:underline flex items-center">
// //           ← Back to Forum
// //         </Link>
// //       </div>

// //       {error && (
// //         <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
// //           {error}
// //         </div>
// //       )}

// //       <div className="d-flex justify-content-center">
// //       <Card className="w-100" style={{ maxWidth: '550px', padding: '20px' }}>
// //         <Card.Body>
// //           <div className="mb-4">
// //             <Link to="/forum" className="btn btn-link mb-3">
// //               <Button variant="primary" type="submit" >

// //                 <i className={"bi-arrow-left"}>
// //                 </i>  Back to Forum

// //               </Button>
// //             </Link>
// //             {error && (
// //               <Alert variant="danger">{error}</Alert>
// //             )}
// //             <div className="d-flex justify-content-between align-items-start mb-2">
// //               <h1 className="text-2xl font-weight-bold text-gray-800">{topic.title}</h1>
// //               {user && topic.creator._id === user.id && (
// //                 <Button variant="danger" size="sm" onClick={handleDelete}>
// //                   Delete
// //                 </Button>
// //               )}
// //             </div>
// //             <span className="badge badge-primary">{topic.category}</span>
// //           </div>

// //           <div className="border-bottom pb-4 mb-4">
// //             <p className="text-gray-800 whitespace-pre-line">{topic.content}</p>
// //             <div className="mt-4 text-sm text-muted">
// //               Posted by {topic.creator.name} on {new Date(topic.createdAt).toLocaleString()}
// //             </div>
// //           </div>

// //           <h2 className="text-xl font-semibold mb-3">
// //             {topic.replies.length} {topic.replies.length === 1 ? 'Reply' : 'Replies'}
// //           </h2>

// //           {topic.replies.length > 0 ? (
// //             <ul className="list-group list-group-flush">
// //               {topic.replies.map((reply, index) => (
// //                 <li key={index} className="list-group-item p-4">
// //                   <div className="d-flex align-items-center justify-content-center">
// //                     <div className="">
// //                       <p className="text-gray-800 whitespace-pre-line">{reply.content}</p>
// //                       <div className="mt-2 text-sm text-muted">
// //                         {reply.sender.name} • {new Date(reply.createdAt).toLocaleString()}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </li>
// //               ))}
// //             </ul>
// //           ) : (
// //             <p className="text-muted italic">No replies yet. Be the first to reply!</p>
// //           )}
// //         </Card.Body>
// //       </Card>
// //     </div>

// //       {user ? (
// //         <div className="bg-white rounded-lg shadow-md p-6">
// //           <h2 className="text-xl font-semibold mb-4">Add a Reply</h2>
// //           <form onSubmit={handleReplySubmit}>
// //             <div className="mb-4">
// //               <textarea
// //                 value={replyContent}
// //                 onChange={(e) => setReplyContent(e.target.value)}
// //                 className="w-full p-2 border rounded"
// //                 rows="4"
// //                 placeholder="Write your reply here..."
// //                 required
// //               ></textarea>
// //             </div>
// //             <button
// //               type="submit"
// //               className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
// //               disabled={submitting || !replyContent.trim()}
// //             >
// //               {submitting ? 'Posting...' : 'Post Reply'}
// //             </button>
// //           </form>
// //         </div>
// //       ) : (
// //         <div className="bg-white rounded-lg shadow-md p-6 text-center">
// //           <p className="text-gray-600 mb-4">
// //             You need to be logged in to reply to this topic.
// //           </p>
// //           <Link
// //             to="/login"
// //             className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block"
// //           >
// //             Log In
// //           </Link>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ForumTopic;







// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import api from '../../utils/api/api';
// import { Card, Button, Alert, Form } from 'react-bootstrap';
// import Spinner from '../common/Spinner';

// const ForumTopic = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const [topic, setTopic] = useState(null);
//   const [replyContent, setReplyContent] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const fetchTopic = async () => {
//     setLoading(true); // Set loading to true before fetching
//     try {
//         const res = await api.get(`/api/forum/${id}`);
//         setTopic(res.data);
//     } catch (err) {
//         setError('Failed to load topic');
//         console.error(err);
//     } finally {
//         setLoading(false); // Set loading to false after fetching
//     }
// };

// useEffect(() => {
//     fetchTopic();
// }, [id]);

//   const handleReplySubmit = async (e) => {
//     e.preventDefault();
//     if (!replyContent.trim()) return;

//     setSubmitting(true);
//     try {
//       const res = await api.post(`/api/forum/${id}/replies`, { content: replyContent });
//     fetchTopic();

//       setReplyContent('');
//     } catch (err) {
//       setError('Failed to post reply');
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete this topic? This action cannot be undone.')) {
//       return;
//     }

//     try {
//       await api.delete(`/api/forum/${id}`);
//       navigate('/forum');
//     } catch (err) {
//       setError('Failed to delete topic');
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return <Spinner />;
//   }

//   if (!topic) {
//     return (
//       <Card className="mx-auto" style={{ maxWidth: '550px' }}>
//         <Card.Body>
//           <h2 className="text-xl font-weight-bold text-danger mb-4">Topic Not Found</h2>
//           <p className="text-muted mb-4">The topic you're looking for doesn't exist or has been removed.</p>
//           <Link to="/forum" className="btn btn-primary">
//             <Button variant="primary" type="submit" >

//               <i className={"bi-arrow-left"}>
//               </i>  Back to Forum

//             </Button>
//           </Link>
//         </Card.Body>
//       </Card>
//     );
//   }

//   return (
//     <div className="d-flex justify-content-center">
//       <Card className="w-100" style={{ maxWidth: '550px', padding: '20px' }}>
//         <Card.Body>
//           <div className="mb-4">
//             <Link to="/forum" className="btn btn-link mb-3">
//               <Button variant="primary" type="submit" >

//                 <i className={"bi-arrow-left"}>
//                 </i>  Back to Forum

//               </Button>
//             </Link>
//             {error && (
//               <Alert variant="danger">{error}</Alert>
//             )}
//             <div className="d-flex justify-content-between align-items-start mb-2">
//               <h1 className="text-2xl font-weight-bold text-gray-800">{topic.title}</h1>

//               {user && topic?.creator?._id === user.id && (
//                 <Button variant="danger" size="sm" onClick={handleDelete}>
//                   Delete
//                 </Button>
//               )}
//             </div>
//             <span className="badge badge-primary">{topic.category}</span>
//           </div>

//           <div className="border-bottom pb-4 mb-4">
//             <p className="text-gray-800 whitespace-pre-line">{topic.content}</p>
//             <div className="mt-4 text-sm text-muted">
//               Posted by {topic?.creator?.name} on {new Date(topic.createdAt).toLocaleString()}
//             </div>
//           </div>

//           <h2 className="text-xl font-semibold mb-3">
//             {topic?.replies?.length} {topic?.replies?.length === 1 ? 'Reply' : 'Replies'}
//           </h2>

//           {topic?.replies?.length > 0 ? (
//             <ul className="list-group list-group-flush">
//               {topic?.replies?.map((reply, index) => (
//                 <li key={index} className="list-group-item p-4">
//                   <div className="d-flex align-items-center justify-content-center">
//                     <div className="">
//                       <p className="text-gray-800 whitespace-pre-line">{reply.content}</p>
//                       <div className="mt-2 text-sm text-muted">
//                         {reply?.sender?.name} • {new Date(reply.createdAt).toLocaleString()}
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-muted italic">No replies yet. Be the first to reply!</p>
//           )}
//         </Card.Body>
//       </Card>
//       {user ? (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Add a Reply</h2>
//           <form onSubmit={handleReplySubmit}>
//             <div className="mb-4">
//               <textarea
//                 value={replyContent}
//                 onChange={(e) => setReplyContent(e.target.value)}
//                 className="w-full p-2 border rounded"
//                 rows="4"
//                 placeholder="Write your reply here..."
//                 required
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-blue-400"
//               disabled={submitting || !replyContent.trim()}
//             >
//               {submitting ? 'Posting...' : 'Post Reply'}
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className="bg-white rounded-lg shadow-md p-6 text-center">
//           <p className="text-gray-600 mb-4">
//             You need to be logged in to reply to this topic.
//           </p>
//           <Link
//             to="/login"
//             className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block"
//           >
//             Log In
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ForumTopic;




// Inside ForumTopic.js
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api/api';
import { Card, Button, Alert, Form } from 'react-bootstrap';
import Spinner from '../common/Spinner';
// Import socket.io-client
import io from 'socket.io-client';

// Determine the socket server URL
const SOCKET_SERVER_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Use your backend URL


const ForumTopic = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext); // Assuming user is from AuthContext
  const [topic, setTopic] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Use useCallback for fetchTopic for useEffect dependency stability
  const fetchTopic = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/api/forum/${id}`);
      setTopic(res.data);
    } catch (err) {
      setError('Failed to load topic');
      console.error(err);
      setTopic(null); // Explicitly set to null if topic not found/failed
    } finally {
      setLoading(false);
    }
  }, [id]); // Dependency on 'id' ensures it refetches if the topic ID in the URL changes

  // --- Socket.io Logic ---
  useEffect(() => {
    // Connect to the socket server, including credentials for session authentication
    const socket = io(SOCKET_SERVER_URL, { withCredentials: true }); // CRUCIAL for sessions

    // Event: successful connection
    socket.on('connect', () => {
      console.log(`Socket connected: ${socket.id}`);
      // Once connected, join the room for this specific topic
      socket.emit('joinTopic', id);
    });

    // Event: connection error
    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      // Optionally update UI or state to show connection issue
    });

    // Event: listen for new replies for this topic
    socket.on('newReply', (newReply) => {
      console.log('Received new reply:', newReply);
      // Update the topic state by adding the new reply
      setTopic(prevTopic => {
        if (!prevTopic) return null; // Should not happen if topic was loaded
        return {
          ...prevTopic,
          replies: [...prevTopic.replies, newReply]
        };
      });
    });

    // Event: listen for topic deleted
    socket.on('topicDeleted', (deletedTopicId) => {
      console.log(`Topic deleted: ${deletedTopicId}`);
      if (deletedTopicId === id) {
        // If the currently viewed topic was deleted, navigate away
        setError('This topic has been deleted.'); // Optionally show a message
        navigate('/forum'); // Navigate back to the forum list
      }
    });


    // Cleanup function: runs when the component unmounts or id changes
    return () => {
      console.log(`Socket leaving topic: ${id}`);
      socket.emit('leaveTopic', id); // Leave the room
      socket.disconnect(); // Disconnect the socket
      console.log('Socket disconnected');
    };
  }, [id, navigate]); // Dependencies: id (to re-join room if changed) and navigate (for topicDeleted)
  // --- End Socket.io Logic ---


  // Fetch topic data on component mount and when ID changes
  useEffect(() => {
    fetchTopic();
  }, [fetchTopic]); // Dependency on useCallback's identity


  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setSubmitting(true);
    try {
      // Send the reply via HTTP POST (still needed to save to DB)
      // The backend will then emit the socket event upon successful save
      await api.post(`/api/forum/${id}/replies`, { content: replyContent });

      // *** REMOVE the direct fetchTopic() call here ***
      // fetchTopic(); // <-- REMOVE THIS LINE

      // The state update will now happen via the 'newReply' socket event handler

      setReplyContent(''); // Clear the input field
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Failed to post reply');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this topic? This action cannot be undone.')) {
      return;
    }

    try {
      // Send the delete request via HTTP DELETE
      await api.delete(`/api/forum/${id}`);
      // The backend should emit a 'topicDeleted' event upon successful deletion
      // The socket listener above will handle navigation.
      // navigate('/forum'); // <-- REMOVE direct navigation here if socket handles it
    } catch (err) {
      setError('Failed to delete topic');
      console.error(err);
    }
  };


  // ... Rest of your component rendering logic (Spinner, Topic Not Found, displaying topic and replies)
  // Make sure you use optional chaining (`?.`) when accessing topic and reply properties
  // as `topic` might be null initially or if not found.
  // e.g., topic?.title, topic?.creator?.name, topic?.replies?.map(...)

  if (loading) {
    return <Spinner />;
  }

  // Render Topic Not Found if topic is null after loading
  if (!topic) {
    return (
      <Card className="mx-auto" style={{ maxWidth: '550px' }}>
        <Card.Body>
          <h2 className="text-xl font-weight-bold text-danger mb-4">Topic Not Found</h2>
          <p className="text-muted mb-4">The topic you're looking for doesn't exist or has been removed.</p>
          <Link to="/forum" className="btn btn-primary">
            <Button variant="primary">
              <i className={"bi-arrow-left"}></i> Back to Forum
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column justify-content-center">
        <Card className="w-100" style={{ maxWidth: '550px', padding: '20px', marginTop: '28px' }}>
          <Card.Body>
            <div className="mb-4">
              <Link to="/forum" className="btn btn-link mb-3">
                <Button variant="primary">
                  <i className={"bi-arrow-left"}></i> Back to Forum
                </Button>
              </Link>
              {error && (
                <Alert variant="danger">{error}</Alert>
              )}
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h1 className="text-2xl font-weight-bold text-gray-800">{topic.title}</h1>
                {/* Use optional chaining on topic.creator */}
                {user && topic?.creator?._id === user?.id && ( // Also use optional chaining on user
                  <Button variant="danger" size="sm" onClick={handleDelete}>
                    Delete
                  </Button>
                )}
              </div>
              <span className="badge badge-primary">{topic.category}</span>
            </div>

            <div className="border-bottom pb-4 mb-4">
              <p className="text-gray-800 whitespace-pre-line">{topic.content}</p>
              <div className="mt-4 text-sm text-muted">
                {/* Use optional chaining on topic.creator */}
                Posted by {topic?.creator?.name} on {new Date(topic.createdAt).toLocaleString()}
              </div>
            </div>

            {/* Use optional chaining on topic.replies */}
            <h2 className="text-xl font-semibold mb-3">
              {topic?.replies?.length || 0} {topic?.replies?.length === 1 ? 'Reply' : 'Replies'}
            </h2>

            {/* Use optional chaining on topic.replies before mapping */}
            {topic?.replies?.length > 0 ? (
              <ul className="list-group list-group-flush" style={{ maxHeight: '225px', overflowY: 'scroll' }}>
                {topic.replies.map((reply, index) => (
                  // Use a more stable key if possible (like reply._id)
                  // If reply objects don't have an _id yet when emitted, index is okay as a fallback
                  <li key={reply._id || index} className="list-group-item p-4">
                    <div> {/* Removed d-flex justify-content-center */}
                      <div>
                        <p className="text-gray-800 whitespace-pre-line">{reply.content}</p>
                        <div className="mt-2 text-sm text-muted">
                          {/* Use optional chaining on reply.sender */}
                          {reply?.sender?.name} • {new Date(reply.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted italic">No replies yet. Be the first to reply!</p>
            )}
          </Card.Body>
        </Card>

        {/* The reply form should likely be outside the first Card if it's full width */}
        {/* Or adjust Card widths and layout. Keeping it in a separate div for clarity here */}
        {user ? (
          <Card className="w-100 mt-4" style={{ maxWidth: '550px', padding: '20px', marginBottom: '28px' }}> {/* Added margin-top */}
            <Card.Body>
              <h2 className="text-xl font-semibold mb-4">Add a Reply</h2>
              <Form onSubmit={handleReplySubmit}> {/* Use Bootstrap Form */}
                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows="4"
                    placeholder="Write your reply here..."
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting || !replyContent.trim()}
                >
                  {submitting ? 'Posting...' : 'Post Reply'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        ) : (
          <Card className="w-100 mt-4 text-center" style={{ maxWidth: '550px', padding: '20px', marginBottom: '28px' }}> {/* Added margin-top */}
            <Card.Body>
              <p className="text-gray-600 mb-4">
                You need to be logged in to reply to this topic.
              </p>
              <Link
                to="/login"
                className="btn btn-primary"
              >
                Log In
              </Link>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ForumTopic;

