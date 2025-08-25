import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api/api';
import Spinner from '../common/Spinner';

const FlashcardDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [flashcard, setFlashcard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const res = await api.get(`/api/flashcards/${id}`);
        setFlashcard(res.data);
      } catch (err) {
        setError('Failed to load flashcard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcard();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this flashcard? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/api/flashcards/${id}`);
      navigate('/flashcards');
    } catch (err) {
      setError('Failed to delete flashcard');
      console.error(err);
    }
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!flashcard) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Flashcard Not Found</h2>
        <p className="text-gray-600 mb-4">The flashcard you're looking for doesn't exist or has been removed.</p>
        <Link to="/flashcards" className="text-blue-600 hover:underline">
          Back to Flashcards
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link to="/flashcards" className="text-blue-600 hover:underline flex items-center">
          ← Back to Flashcards
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div 
        className="bg-white rounded-lg shadow-md p-6 mb-6 cursor-pointer transition-all duration-300"
        onClick={toggleFlip}
        style={{ 
          minHeight: '300px',
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div 
          className="w-full h-full flex flex-col justify-between transition-transform duration-500"
          style={{ 
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            backfaceVisibility: 'hidden'
          }}
        >
          {!flipped ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {flashcard.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  flashcard.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  flashcard.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {flashcard.difficulty.charAt(0).toUpperCase() + flashcard.difficulty.slice(1)}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Question:</h2>
              <p className="text-gray-700 whitespace-pre-line">{flashcard.question}</p>
              <p className="text-gray-500 mt-8 text-center italic">Click to see answer</p>
            </div>
          ) : (
            <div style={{ transform: 'rotateY(180deg)' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Answer:</h2>
              <p className="text-gray-700 whitespace-pre-line">{flashcard.answer}</p>
              <p className="text-gray-500 mt-8 text-center italic">Click to see question</p>
            </div>
          )}
        </div>
      </div>

      {user && flashcard.createdBy === user.id && (
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Delete Flashcard
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardDetail;
