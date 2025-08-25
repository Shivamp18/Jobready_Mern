
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const IntervieweeFeedbackView = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`/api/feedback/${roomId}`);
        setFeedback(response.data);
      } catch (err) {
        setError('Failed to load feedback.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [roomId]);

  const renderStars = (score) => '⭐'.repeat(score) + '☆'.repeat(5 - score);

  const renderProgress = (score) => (
    <div className="progress mt-2" style={{ height: '8px' }}>
      <div className="progress-bar bg-success" style={{ width: `${(score / 5) * 100}%` }} />
    </div>
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <span className="text-muted">Loading feedback...</span>
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Alert variant="danger">{error || 'No feedback available for this session.'}</Alert>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <Card className="p-4 w-100" style={{ maxWidth: '550px', margin: '2rem' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="text-center w-100 text-success">Your Interview Feedback</h3>
          </div>

          {Object.entries(feedback.ratings).map(([skill, value]) => (
            <div key={skill} className="mb-4">
              <div className="fw-bold">{skill}</div>
              <div className="mb-1 fs-5" style={{ color: '#fd7e14' }}>
                {renderStars(value)}
              </div>
              {renderProgress(value)}
            </div>
          ))}

          <div className="mb-3">
            <div className="fw-bold">Additional Comments</div>
            <div className="text-muted mt-1">{feedback.comments || 'No comments provided.'}</div>
          </div>

          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={() => navigate('/')}>
              Back to Dashboard
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default IntervieweeFeedbackView;
