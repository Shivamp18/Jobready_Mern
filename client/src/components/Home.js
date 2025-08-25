import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
const heading = {
 fontWeight: '400',
};
  return (
    <Container>
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-4" style={heading}>JobReady</h1>
          <p className="lead" style={{ fontWeight: '400' }}>
            Prepare for your interviews with our comprehensive platform featuring discussion forums, flashcards, and mock interviews.
          </p>
          {!isAuthenticated && (
            <div className="mt-4">
              <Button as={Link} to="/register" variant="primary" className="me-3">
                Sign Up
              </Button>
              <Button as={Link} to="/login" variant="primary">
                Login
              </Button>
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Discussion Forum</Card.Title>
              <Card.Text>
                Engage in real-time discussions with other users, ask questions, and share your knowledge.
              </Card.Text>
              {isAuthenticated ? (
                <Button as={Link} to="/forum" variant="primary">Go to Forum</Button>
              ) : (
                <Button as={Link} to="/login" variant="primary">Login to Access</Button>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Flashcards</Card.Title>
              <Card.Text>
                Study and memorize key concepts with our flashcard system. Create your own or use existing ones.
              </Card.Text>
              {isAuthenticated ? (
                <Button as={Link} to="/flashcards" variant="primary">View Flashcards</Button>
              ) : (
                <Button as={Link} to="/login" variant="primary">Login to Access</Button>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Mock Interviews</Card.Title>
              <Card.Text>
                Practice with real coding problems in our integrated code editor with support for multiple languages.
              </Card.Text>
              {isAuthenticated ? (
                <Button as={Link} to="/mock-interviews" variant="primary">Try Mock Interviews</Button>
              ) : (
                <Button as={Link} to="/login" variant="primary">Login to Access</Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
