'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Badge, Button, ListGroup } from 'react-bootstrap';
import Link from 'next/link';

const QuestionDetail = ({ params }) => {
  const [question, setQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        const foundQuestion = data.find(q => q.id.toString() === id);
        if (foundQuestion) {
          setQuestion(foundQuestion);
        }
      })
      .catch(error => console.error('Error loading question:', error));
  }, [id]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Link href="/" className="btn btn-link mb-3">← Back to Questions</Link>
      
      <Card className="glassmorphism">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <Badge bg="primary" className="me-2">{question.mainTag}</Badge>
              {question.isDependency && (
                <Badge bg="info" className="me-2">Dependency</Badge>
              )}
              {question.tags.map((tag, index) => (
                <Badge key={index} bg="secondary" className="me-2">{tag}</Badge>
              ))}
            </div>
            <Button 
              variant="outline-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Question
            </Button>
          </div>

          <Card.Title className="h4 mb-3">{question.question}</Card.Title>
          
          <Card.Text className="mb-4">
            <strong>Answer:</strong><br />
            {question.answer}
          </Card.Text>

          {question.sideNote && (
            <Card.Text className="mb-4">
              <strong>Side Note:</strong><br />
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default QuestionDetail; 