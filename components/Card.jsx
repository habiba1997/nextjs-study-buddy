import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { useRouter } from "next/navigation";
import { QuestionType } from "@/models/questiontypes";
import '@/styles/SearchBar.css';

const QuestionCard = ({ question }) => {
  const router = useRouter();

  const handleQuestionClick = () => {
    router.push(`/question/${question.id}`);
  };

  return (
    
    <Card
      className="mb-3 glassmorphism question-card"
      onClick={handleQuestionClick}
      style={{ cursor: "pointer" }}
    >
       <Card.Header >
          <Stack direction="horizontal" gap={3}>
            <div><h5>{question.question}</h5></div>

            <div className="p-2 ms-auto">
              <Badge pill bg="info">
                {QuestionType[question.type]}
              </Badge>
            </div>
          </Stack>
        </Card.Header>
      <Card.Body>
      
      <blockquote className="blockquote mb-0">
      <p>{question.answer}</p>
        <footer className="blockquote-footer">
        {question.sideNote}
        </footer>
        </blockquote>
        <br />
        <Stack direction="horizontal" gap={2} className="mb-2">
          <Badge bg="primary">{question.mainTag}</Badge>

          {question.tags &&
            question.tags.map((tag, index) => (
              <Badge key={index} bg="secondary">
                {tag}
              </Badge>
            ))}

          {/* <Badge bg="info">{QuestionType[question.type]}</Badge> */}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;
