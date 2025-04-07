import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionCard from './Card';

const Feed = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error loading questions:', error));
  };

  // Filter questions based on search term
  const filteredQuestions = questions.filter(question => 
    question.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <Row>
        {filteredQuestions.map((question, index) => (
          <Col key={question.id || index} xs={12} className="mb-3">
            <QuestionCard question={question} />
          </Col>
        ))}
        {filteredQuestions.length === 0 && (
          <Col xs={12} className="text-center">
            <p>No questions found. Try adding some!</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Feed;