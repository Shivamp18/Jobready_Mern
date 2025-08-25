
// // src/components/FeedbackPage.js (or wherever you store your components)
// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// function FeedbackPage() {
//   const [feedback, setFeedback] = useState('');
//   const { roomId } = useParams(); // Get the room ID from the URL if passed
//   const navigate = useNavigate(); // Use navigate for potential redirection after submit

//   const handleSubmitFeedback = (e) => {
//     e.preventDefault(); // Prevent default form submission

//     console.log(`Submitting feedback for room ${roomId || 'N/A'}:`, feedback);
//     // TODO: Implement actual feedback submission logic here.
//     // This might involve sending the feedback and roomId to your backend API.

//     // After submission, you might want to redirect the user, e.g., to a thank you page or dashboard
//      navigate(`/feedback/${roomId}/thank-you`);
//     setFeedback('');
//     alert('Thank you for your feedback!'); // Simple confirmation
//   };

//   return (
//     <div className="container mx-auto p-4"> {/* Add some basic styling */}
//       <h1 className="text-2xl font-bold mb-4">Provide Feedback</h1>
//       <p className="mb-4">For session: {roomId || 'N/A'}</p> {/* Display room ID if available */}
//       <form onSubmit={handleSubmitFeedback}>
//         <textarea
//           className="w-full h-48 border p-2 rounded mb-4"
//           placeholder="Enter your feedback here..."
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//           required
//         ></textarea>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Submit Feedback
//         </button>
//       </form>
//     </div>
//   );
// }

// export default FeedbackPage;









// src/pages/FeedbackPage.js

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InterviewRatingForm from './InterviewScorecard';


const FeedbackPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleFeedbackSubmit = ({ ratings, comments }) => {
    console.log('Room ID:', roomId);
    console.log('Ratings:', ratings);
    console.log('Comments:', comments);

    // Here, you'd send data to your backend API
    // e.g., axios.post('/api/feedback', { roomId, ratings, comments });

    alert('Thank you! Feedback submitted.');
    navigate(`/feedback/${roomId}/thank-you`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <InterviewRatingForm onSubmit={handleFeedbackSubmit} />
    </div>
  );
};

export default FeedbackPage;
