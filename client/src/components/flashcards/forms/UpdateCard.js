import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import api from "../../../utils/api/api";
import CardService from "../../../utils/card.service";

const UpdateCard = () => {
  const [form, setForm] = useState({
    question: "",
    answer: "",
    difficulty: "medium",
    category: "",
    isActive: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ['JavaScript', 'React', 'Node.js', 'Python', 'System Design', 'Algorithms', 'Behavioral'];
  const difficulties = ['easy', 'medium', 'hard'];

  const { question, answer, category, difficulty } = form;
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const backLocation = state?.previousPath ?? "/flashcards";

  useEffect(() => {
    async function getCard() {
      try {
        const result = await CardService.getSpecificCard(params.id);
        setForm(result);
      } catch (error) {
        console.log(error.message);
      }
    }
    getCard();
  }, [params.id]);

  const updateForm = (value) => {
    setForm((prev) => ({ ...prev, ...value }));
  };

  const deleteCard = async () => {
    try {
      await api.delete('/api/flashcards/' + params.id);
      navigate(backLocation);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.put('/api/flashcards/' + params.id, form);
      navigate(backLocation);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update flashcard");
      setLoading(false);
    }
  };

  return (
    <Row className="justify-content-center">
     <Card className="px-4 py-2" style={{ maxWidth: '550px' }}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="mb-0">Edit Flashcard</h2>
              <Button variant="danger" onClick={deleteCard} title="Delete">
                <i className="bi bi-trash3-fill"></i>
              </Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  name="question"
                  value={question}
                  onChange={(e) => updateForm({ question: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="answer"
                  value={answer}
                  onChange={(e) => updateForm({ answer: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={category}
                  onChange={(e) => updateForm({ category: e.target.value })}
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

              <Form.Group className="mb-3">
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
                      onChange={(e) => updateForm({ difficulty: e.target.value })}
                      key={diff}
                    />
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="d-flex gap-3 justify-content-center mb-3">
                <Form.Check
                  type="switch"
                  id="active-switch"
                  label={form.isActive ? "Active" : "Inactive"}
                  checked={form.isActive}
                  onChange={(e) => updateForm({ isActive: e.target.checked })}
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={() => navigate("/flashcards")}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
    </Row>
  );
};

export default UpdateCard;
