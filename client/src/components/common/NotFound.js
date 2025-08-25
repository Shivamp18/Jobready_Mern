import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1 className="display-1">404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for does not exist or has been removed.</p>
          <Button as={Link} to="/" variant="primary">
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
