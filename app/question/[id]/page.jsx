"use client";

import React, { useState, useEffect } from "react";
import { Card, Badge, Button, ListGroup, Form, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { QuestionType } from "@models/questiontypes";
import { CardSubtitle } from "react-bootstrap";

const QuestionDetail = ({ params }) => {
  const [question, setQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(null);
  const unwrappedParams = React.use(params);
  const { id } = unwrappedParams;

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const foundQuestion = data.find((q) => q.id.toString() === id);
        if (foundQuestion) {
          setQuestion(foundQuestion);
          setEditedQuestion({...foundQuestion});
        }
      })
      .catch((error) => console.error("Error loading question:", error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedQuestion({
      ...editedQuestion,
      [name]: value
    });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setEditedQuestion({
      ...editedQuestion,
      tags
    });
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...editedQuestion.notes];
    updatedNotes[index] = value;
    setEditedQuestion({
      ...editedQuestion,
      notes: updatedNotes
    });
  };

  const addNote = () => {
    setEditedQuestion({
      ...editedQuestion,
      notes: [...(editedQuestion.notes || []), ""]
    });
  };

  const removeNote = (indexToRemove) => {
    setEditedQuestion({
      ...editedQuestion,
      notes: editedQuestion.notes.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleNotesChange = (e) => {
    const notes = e.target.value.split('\n').filter(note => note.trim() !== '');
    setEditedQuestion({
      ...editedQuestion,
      notes
    });
  };

  const handleSave = async () => {
    try {
      // Get existing questions
      const response = await fetch("/data.json");
      const questions = await response.json();
      
      // Find and replace the question being edited
      const updatedQuestions = questions.map(q => 
        q.id.toString() === id ? editedQuestion : q
      );

      // Save updated questions to file through API
      const saveResponse = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestions),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save question");
      }
      
      // Update local state and exit edit mode
      setQuestion(editedQuestion);
      setIsEditing(false);
      
      alert("Question updated successfully!");
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Failed to update question. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditedQuestion({...question});
    setIsEditing(false);
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Link href="/" className="btn btn-link mb-3">
        ← Back to Questions
      </Link>

      <Card className="glassmorphism">
        <Card.Body>
          {isEditing ? (
            <Form>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Main Tag</Form.Label>
                    <Form.Control
                      type="text"
                      name="mainTag"
                      value={editedQuestion.mainTag}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tags (comma separated)</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedQuestion.tags.join(', ')}
                      onChange={handleTagsChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={editedQuestion.type}
                      onChange={handleInputChange}
                    >
                      {Object.entries(QuestionType).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div>
                  <Button variant="success" className="me-2" onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="question"
                  value={editedQuestion.question}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="answer"
                  value={editedQuestion.answer}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Side Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="sideNote"
                  value={editedQuestion.sideNote || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label>Notes</Form.Label>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={addNote}
                  >
                    Add Note
                  </Button>
                </div>
                {editedQuestion.notes && editedQuestion.notes.length > 0 ? (
                  editedQuestion.notes.map((note, index) => (
                    <div key={index} className="d-flex mb-2">
                      <Form.Control
                        type="text"
                        value={note}
                        onChange={(e) => handleNoteChange(index, e.target.value)}
                        className="me-2"
                      />
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => removeNote(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-muted">No notes added. Click "Add Note" to create one.</div>
                )}
              </Form.Group>
            </Form>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <Badge bg="primary" className="me-2">
                    {question.mainTag}
                  </Badge>
                  {question.tags.map((tag, index) => (
                    <Badge key={index} bg="secondary" className="me-2">
                      {tag}
                    </Badge>
                  ))}
                  <Badge bg="info" className="me-2">
                    {QuestionType[question.type]}
                  </Badge>
                </div>
                <Button
                  variant="outline-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Question
                </Button>
              </div>
              <Card.Title className="h2 mb-3">{question.question}</Card.Title>

              <Card.Text className="mb-4">
                <strong>Answer:</strong>
                <br />
                {question.answer}
              </Card.Text>

              {question.sideNote && (
                <Card.Text className="mb-4">
                  <strong>Side Note:</strong>
                  <br />
                  {question.sideNote}
                </Card.Text>
              )}

              {question.notes && question.notes.length > 0 && (
                <>
                  <h5 className="mb-3">Notes:</h5>
                  <ListGroup variant="flush">
                    {question.notes.map((note, index) => (
                      <ListGroup.Item key={index} className="bg-transparent">
                        {note}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )}

              <div className="text-muted mt-3">
                Created: {new Date(question.createdAt).toLocaleDateString()}
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default QuestionDetail;
