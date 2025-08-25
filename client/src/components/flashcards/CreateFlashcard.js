import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api/api';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import ButtonIcon from '../common/ButtonIcon';

const CreateFlashcard = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    difficulty: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = ['JavaScript', 'React', 'Node.js', 'Python', 'System Design', 'Algorithms', 'Behavioral'];
  const difficulties = ['easy', 'medium', 'hard'];
  const { question, answer, category, difficulty } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/flashcards', formData);
      navigate('/flashcards');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create flashcard');
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Body className="text-center">
          <h2 className="text-danger mb-3">Authentication Required</h2>
          <p className="mb-3">You need to be logged in to create flashcards.</p>
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
        </Card.Body>
      </Card>
    );
  }

   

  return (
    <div className="d-flex justify-content-center">
    
      <Card className="px-4 py-2 w-100" style={{ maxWidth: '550px' }}>
        <Card.Body>
         
<div className="d-flex justify-content-between align-items-center mb-1">
<h2 className="text-center">Create New Flashcard</h2>
          <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
            <Link to="/flashcards" className="text-decoration-none">
           
      
      <Button variant="primary" type="submit" >
                
                <i className={"bi-arrow-left"}>
      </i> Back
              </Button>

            </Link>
           
          </div>

</div>
         
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="question"
                value={question}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="answer"
                value={answer}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={category}
                onChange={onChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Difficulty</Form.Label>
              <div className="d-flex gap-3 justify-content-center">
                {difficulties.map(diff => (
                  <Form.Check
                    inline
                    label={diff.charAt(0).toUpperCase() + diff.slice(1)}
                    name="difficulty"
                    type="radio"
                    value={diff}
                    checked={difficulty === diff}
                    onChange={onChange}
                    key={diff}
                  />
                ))}
              </div>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate('/flashcards')}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Flashcard'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateFlashcard;
