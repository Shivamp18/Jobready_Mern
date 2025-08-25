import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api/api';
import Spinner from '../common/Spinner';

const MockInterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    search: ''
  });

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await api.get('/api/interviews');
        setInterviews(res.data);
      } catch (err) {
        setError('Failed to load mock interviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const categories = ['Technical', 'Behavioral', 'System Design', 'Frontend', 'Backend', 'Full Stack', 'DevOps'];
  const difficulties = ['easy', 'medium', 'hard'];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredInterviews = interviews.filter(interview => {
    const matchesCategory = filters.category === 'all' || interview.category === filters.category;
    const matchesDifficulty = filters.difficulty === 'all' || interview.difficulty === filters.difficulty;
    const matchesSearch = filters.search === '' || 
      interview.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      interview.description.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Mock Interviews</h1>
        <Link
          to="/mock-interviews/create"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block"
        >
          Create Mock Interview
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Filter Interviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={filters.difficulty}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded"
            >
              <option value="all">All Difficulties</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="search" className="block text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search interviews..."
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {filteredInterviews.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">No mock interviews found. Try adjusting your filters or create a new mock interview.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInterviews.map(interview => (
            <Link
              to={`/mock-interviews/${interview._id}`}
              key={interview._id}
              className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-medium text-gray-900">{interview.title}</h2>
                <div className="flex space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    interview.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    interview.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {interview.difficulty.charAt(0).toUpperCase() + interview.difficulty.slice(1)}
                  </span>
                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-800">
                    {interview.duration} min
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {interview.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{interview.description}</p>
              <p className="text-sm text-gray-500">
                {interview.questions.length} questions
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MockInterviewList;
