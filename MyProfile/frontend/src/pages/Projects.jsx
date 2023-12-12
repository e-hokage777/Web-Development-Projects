import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCrack } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

import axios from "axios";

import { useState } from "react";

function ProjectButton(props) {
  // const container = styled.div`
  //     display: flex;
  //     flex-direction: column,
  //     gap: 1rem;
  //     align-items: center,
  //     justify-content: center,
  //     background-color: #f63,
  //     cursor: pointer;
  // `
  return (
    <div
      onClick={props.onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f63",
        cursor: "pointer",
      }}
    >
      <div style={{ fontSize: "5rem" }}>{props.icon}</div>
      <h3>{props.children}</h3>
    </div>
  );
}

// form for textarea
function TextAreaForm() {
  const [ formData, setFormData ] = useState({tweet: ""});
  // function to handle submitting
  const handleSubmit = (event) => {
    event.preventDefault();
    // axios.post()
  };

  // function to update form data
  const updateFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="tweet"
          value={formData.tweet}
          onInput={updateFormData}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function ProjectModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ProjectButton icon={props.icon} onClick={handleShow}>
        {props.title}
      </ProjectButton>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextAreaForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <Container fluid>
      <Row>
        <Col lg={4} md={6} xs={12}>
          {/* <ProjectButton icon={<FontAwesomeIcon icon={faHouseCrack} />}>
            Disaster Tweets
          </ProjectButton> */}
          <ProjectModal
            title="Disaster Tweets"
            icon={<FontAwesomeIcon icon={faHouseCrack} />}
          />
        </Col>
        <Col lg={4} md={6} xs={12}>
          first
        </Col>
        <Col lg={4} md={6} xs={12}>
          first
        </Col>
      </Row>
    </Container>
  );
}
