"use client";

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "./Form";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavLink from "react-bootstrap/NavLink";

const MyNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddResurce = async (newQuestion) => {
    try {
      // Get existing questions
      const response = await fetch("/data.json");
      const questions = await response.json();
      // Add new question
      questions.push(newQuestion);

      // Save updated questions to file through API
      const saveResponse = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questions),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save questions");
      }
      
      handleClose();

      alert(
        "Question added successfully!"
      );
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question. Please try again.");
    }
  };

  return (
    <>
      <Navbar className="bg-body-tertiary container">
        <NavbarBrand href="home">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={30}
            height={30}
            className="d-inline-block align-top object-contain"
          />{" "}
          Study Buddy
        </NavbarBrand>
        <Navbar.Collapse className="justify-content-end">
          <NavLink className="justify-content-end" onClick={handleShow}>
            {" "}
            Add Resource
          </NavLink>
        </Navbar.Collapse>
      </Navbar>

      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        centered
        className="question-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onAddQuestion={handleAddResurce} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyNavbar;
