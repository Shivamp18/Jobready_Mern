import React, { useState, useEffect } from 'react';
//FIXME - import { Link } from 'react-router-dom';
import api from '../../utils/api/api';
import Spinner from '../common/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import InactiveCardsList from './InactiveCardsList';
import NoCards from './NoCards';
import './scss/main.scss';
import './scss/main.css';
import NoActiveCards from './NoActiveCards';
import ActiveCardsList from './ActiveCardsList';
import errorContent from './UserCards';
import UserCards from './UserCards';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    search: ''
  });


  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const res = await api.get('/api/flashcards');
        setFlashcards(res.data);
      } catch (err) {
        setError('Failed to load flashcards');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, []);



  const categories = ['JavaScript', 'React', 'Node.js', 'Python', 'System Design', 'Algorithms', 'Behavioral'];
  const difficulties = ['easy', 'medium', 'hard'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredFlashcards = flashcards.filter(card => {
    const matchesCategory = filters.category === 'all' || card.category === filters.category;
    const matchesDifficulty = filters.difficulty === 'all' || card.difficulty === filters.difficulty;
    const matchesSearch = filters.search === '' ||
      card.question.toLowerCase().includes(filters.search.toLowerCase()) ||
      card.answer.toLowerCase().includes(filters.search.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  if (loading) {
    return <Spinner />;
  }



  return (
    <React.Fragment>
      <div className="container py-5 h-100 w-100">
        {/* <Link to={"/card-session"} title="Start session">
                    <i className="bi bi-play-circle-fill fs-2"></i>
                  </Link> */}
        <UserCards />



      </div>
    </React.Fragment>
  );


};

export default FlashcardList;
