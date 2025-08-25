import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api/api';
import Spinner from '../common/Spinner';

const MockInterviewDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeMode, setActiveMode] = useState('preview'); // preview, practice, review
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await api.get(`/api/interviews/${id}`);
        setInterview(res.data);
        // Initialize user answers array with empty strings
        setUserAnswers(new Array(res.data.questions.length).fill(''));
      } catch (err) {
        setError('Failed to load mock interview');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();

    // Cleanup timer on unmount
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this mock interview? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/api/interviews/${id}`);
      navigate('/mock-interviews');
    } catch (err) {
      setError('Failed to delete mock interview');
      console.error(err);
    }
  };

  const startPractice = () => {
    setActiveMode('practice');
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(interview.questions.length).fill(''));
    
    // Set up timer
    const totalSeconds = interview.duration * 60;
    setTimeRemaining(totalSeconds);
    
    const intervalId = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          endPractice();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimer(intervalId);
  };

  const endPractice = () => {
    if (timer) clearInterval(timer);
    setActiveMode('review');
  };

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setUserAnswers(updatedAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < interview.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      endPractice();
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return <Spinner />;
  }

  if (!interview) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Interview Not Found</h2>
        <p className="text-gray-600 mb-4">The mock interview you're looking for doesn't exist or has been removed.</p>
        <Link to="/mock-interviews" className="text-blue-600 hover:underline">
          Back to Mock Interviews
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link to="/mock-interviews" className="text-blue-600 hover:underline flex items-center">
          ← Back to Mock Interviews
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {activeMode === 'preview' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-800">{interview.title}</h1>
            {user && interview.createdBy === user.id && (
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            )}
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {interview.category}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${
              interview.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              interview.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {interview.difficulty.charAt(0).toUpperCase() + interview.difficulty.slice(1)}
            </span>
            <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
              {interview.duration} minutes
            </span>
          </div>

          <p className="text-gray-700 mb-6">{interview.description}</p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Questions Preview</h2>
            <ul className="list-disc pl-5 space-y-2">
              {interview.questions.map((q, index) => (
                <li key={index} className="text-gray-700">
                  {q.question} <span className="text-xs text-gray-500">({q.category})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center">
            <button
              onClick={startPractice}
              className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
            >
              Start Practice Interview
            </button>
          </div>
        </div>
      )}

      {activeMode === 'practice' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-800">
              Question {currentQuestionIndex + 1} of {interview.questions.length}
            </h1>
            <div className="text-lg font-mono bg-gray-100 px-3 py-1 rounded">
              {formatTime(timeRemaining)}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              {interview.questions[currentQuestionIndex].question}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Category: {interview.questions[currentQuestionIndex].category}
            </p>
            <textarea
              value={userAnswers[currentQuestionIndex]}
              onChange={handleAnswerChange}
              className="w-full p-3 border rounded"
              rows="8"
              placeholder="Type your answer here..."
            ></textarea>
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 disabled:opacity-50"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {currentQuestionIndex < interview.questions.length - 1 ? (
              <button
                onClick={nextQuestion}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={endPractice}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Finish Interview
              </button>
            )}
          </div>
        </div>
      )}

      {activeMode === 'review' && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Interview Review</h1>

          <div className="space-y-8 mb-6">
            {interview.questions.map((q, index) => (
              <div key={index} className="border-b pb-6 last:border-b-0">
                <h2 className="text-lg font-semibold mb-2">
                  Question {index + 1}: {q.question}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Category: {q.category}
                </p>

                <div className="mb-4">
                  <h3 className="font-medium text-gray-700 mb-2">Your Answer:</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    {userAnswers[index] ? (
                      <p className="whitespace-pre-line">{userAnswers[index]}</p>
                    ) : (
                      <p className="text-gray-500 italic">No answer provided</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Expected Answer:</h3>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="whitespace-pre-line">{q.expectedAnswer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setActiveMode('preview')}
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mr-4"
            >
              Back to Overview
            </button>
            <button
              onClick={startPractice}
              className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
            >
              Practice Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterviewDetail;
