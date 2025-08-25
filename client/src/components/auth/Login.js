import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Card className="p-3 w-100" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                className="custom-input"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                className="custom-input"
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Sign In
            </Button>
          </Form>

          <div className="w-100 text-center mt-2">
            Don't have an account? <Link to="/register" style={{ color: '#0d6efd', textDecoration: 'none' }}
  onMouseEnter={e => (e.target.style.color = 'rgb(41 86 153)')}
  onMouseLeave={e => (e.target.style.color = 'rgb(13, 110, 253)')}>Signup</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
