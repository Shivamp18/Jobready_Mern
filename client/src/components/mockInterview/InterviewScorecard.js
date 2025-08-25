import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const InterviewRatingForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [ratings, setRatings] = useState({
    Communication: 0,
    'Problem Solving': 0,
    'Coding Efficiency': 0,
    Confidence: 0,
  });
  const [comments, setComments] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const skillsList = Object.keys(ratings);

  const handleRatingChange = (skill, value) => {
    setRatings((prev) => ({ ...prev, [skill]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // await axios.post(`/api/feedback/${roomId}`, {
      //   ratings,
      //   comments,
      // });
      alert('Thank you for your feedback!');
      navigate(`/feedback/${roomId}/thank-you`); // or another redirect
    } catch (err) {
      setError('Failed to submit feedback.');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="d-flex justify-content-center">
      <Card className="p-4 w-100" style={{ maxWidth: '550px', margin: '2rem' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="text-center w-100">Interview Feedback</h3>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {skillsList.map((skill) => (
              <Form.Group key={skill} className="mb-4">
                <Form.Label className="fw-bold">{skill}</Form.Label>
                <div className="mb-1 fs-5" style={{ color: '#fd7e14' }}>
                  {'⭐'.repeat(ratings[skill]) + '☆'.repeat(5 - ratings[skill])}
                </div>
                <div className="d-flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      type="button"
                      variant={star <= ratings[skill] ? 'warning' : 'outline-secondary'}
                      onClick={() => handleRatingChange(skill, star)}
                      size="sm"
                    >
                      ⭐
                    </Button>
                  ))}
                </div>
                <div className="progress mt-2" style={{ height: '8px' }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${(ratings[skill] / 5) * 100}%` }}
                  />
                </div>
              </Form.Group>
            ))}

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold">Additional Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Enter any additional comments..."
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InterviewRatingForm;
