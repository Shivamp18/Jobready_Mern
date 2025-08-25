import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../utils/api/api';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const CreateTopic = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Technical Interview',
    'Behavioral Interview',
    'Resume Tips',
    'Job Search',
    'Career Advice',
    'Coding Challenges',
    'System Design',
    'Other'
  ];

  const { title, description, category } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/api/forum', formData);
      navigate('/forum');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create topic');
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Body className="text-center">
          <h2 className="text-danger mb-3">Authentication Required</h2>
          <p className="mb-3">You need to be logged in to create a topic.</p>
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
            <h2 className="text-center">Create New Topic</h2>
            <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
              <Link to="/forum" className="text-decoration-none">
                <Button variant="primary" type="button">
                  <i className="bi bi-arrow-left"></i> Back
                </Button>
              </Link>
            </div>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={title}
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
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="description"
                value={description}
                onChange={onChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate('/forum')}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Topic'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateTopic;
