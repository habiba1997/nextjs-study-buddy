import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import QuestionCard from './Card';

const Feed = ({questionList}) => {
  return (
    <div>
      <Row>
        {questionList && questionList.length > 0 ? (
          questionList.map((question, index) => (
            <Col key={question.id || index} xs={12} className="mb-3">
              <QuestionCard question={question} />
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <p>No questions found. Try adding some!</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Feed;