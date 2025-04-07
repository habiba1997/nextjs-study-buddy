import React, { useState } from "react";
import { Form as BootstrapForm, Button, Stack } from "react-bootstrap";
import { QuestionType } from "@/models/questiontypes";
import { v4 as uuidv4 } from 'uuid';

const Form = ({ onAddQuestion }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    sideNote: "",
    mainTag: "",
    tags: "",
    type: QuestionType.DEPENDENCY,
    notes: [],
  });

  const [newNote, setNewNote] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        notes: [...prevState.notes, newNote.trim()],
      }));
      setNewNote("");
    }
  };

  const handleRemoveNote = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      notes: prevState.notes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newQuestion = {
        id: uuidv4(),
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        createdAt: new Date().toISOString(),
      };


      if (onAddQuestion) {
        await onAddQuestion(newQuestion);
      }

      // Reset form
      setFormData({
        question: "",
        answer: "",
        sideNote: "",
        mainTag: "",
        tags: "",
        isDependency: false,
        notes: [],
      });
      setNewNote("");
    } catch (error) {
      console.error("Error adding question:", error);
      throw error;
    }
  };

  return (
    <BootstrapForm onSubmit={handleSubmit}>
      <BootstrapForm.Group className="mb-3">
        <BootstrapForm.Label>Question</BootstrapForm.Label>
        <BootstrapForm.Control
          as="textarea"
          rows={3}
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="Enter your question"
          required
        />
      </BootstrapForm.Group>

      <BootstrapForm.Group className="mb-3">
        <BootstrapForm.Label>Answer</BootstrapForm.Label>
        <BootstrapForm.Control
          as="textarea"
          rows={3}
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          placeholder="Enter the answer"
          required
        />
      </BootstrapForm.Group>

      <BootstrapForm.Group className="mb-3">
        <BootstrapForm.Label>Side Note</BootstrapForm.Label>
        <BootstrapForm.Control
          as="textarea"
          rows={2}
          name="sideNote"
          value={formData.sideNote}
          onChange={handleChange}
          placeholder="Add a brief side note"
        />
      </BootstrapForm.Group>

      <BootstrapForm.Group className="mb-3">
        <BootstrapForm.Label>Main Tag</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          name="mainTag"
          value={formData.mainTag}
          onChange={handleChange}
          placeholder="Enter the main tag (e.g., spring-cloud)"
          required
        />
      </BootstrapForm.Group>

      <BootstrapForm.Group className="mb-3">
        <BootstrapForm.Label>Additional Tags</BootstrapForm.Label>
        <BootstrapForm.Control
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Enter additional tags separated by commas"
        />
        <BootstrapForm.Text className="text-muted">
          Separate tags with commas
        </BootstrapForm.Text>
      </BootstrapForm.Group>

      <BootstrapForm.Group className="mb-4">
        <BootstrapForm.Label>Question Type</BootstrapForm.Label>
        <BootstrapForm.Select
          name="type"
          value={formData.questionType}
          onChange={handleChange}
        >
          {Object.entries(QuestionType).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </BootstrapForm.Select>
      </BootstrapForm.Group>

      <BootstrapForm.Group className="mb-3">
        <BootstrapForm.Label>Notes</BootstrapForm.Label>
        <Stack gap={2}>
          {formData.notes.map((note, index) => (
            <div key={index} className="d-flex align-items-center gap-2">
              <BootstrapForm.Control
                type="text"
                value={note}
                readOnly
                className="flex-grow-1"
              />
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleRemoveNote(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="d-flex gap-2">
            <BootstrapForm.Control
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note"
            />
            <Button
              variant="outline-primary"
              onClick={handleAddNote}
              type="button"
            >
              Add Note
            </Button>
          </div>
        </Stack>
      </BootstrapForm.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">
          Save Question
        </Button>
      </div>
    </BootstrapForm>
  );
};

export default Form;
