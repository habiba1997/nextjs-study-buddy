import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { useRouter } from "next/navigation";
import { QuestionType } from "@/models/questiontypes";
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
      <Card.Body>
        <Card.Title className="mb-3">
          <Stack direction="horizontal" gap={3}>
            <div className="p-2"> {question.question}</div>

            <div className="p-2 ms-auto">
              <Badge pill bg="info">
                {QuestionType[question.type]}
              </Badge>
            </div>
          </Stack>
        </Card.Title>

        <Card.Text className="text-muted mb-0">{question.answer}</Card.Text>
        <br />
        <Stack direction="horizontal" gap={2} className="mb-2">
          <Badge bg="primary">{question.mainTag}</Badge>

          {question.tags &&
            question.tags.map((tag, index) => (
              <Badge key={index} bg="secondary">
                {tag}
              </Badge>
            ))}

          <Badge bg="info">{QuestionType[question.type]}</Badge>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;
