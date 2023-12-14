import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCrack } from "@fortawesome/free-solid-svg-icons";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useState } from "react";

// importing forms
import TextAreaForm from "../forms/TextAreaForm.jsx";
import MLTK_ENDPOINTS from "../configs/mltk_endpoint.js";

import Loader from "../components/loader/Loader.jsx";

// defining the base url
const baseUrl = "http://localhost:5000/mlkit";

function ProjectButton(props) {
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

function ProjectModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ProjectButton icon={props.icon} onClick={handleShow}>
        {props.title}
      </ProjectButton>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="xl"
        fullscreen="sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} sm={6}>
              <TextAreaForm endpoint={MLTK_ENDPOINTS["DISASTER_TWEETS"]} />
            </Col>
            <Col xs={12} sm={6}>
              <div style={{width: "100%", height: "100%", position: "relative"}}>
                <Loader/>
                <h3 style={{color: "blue"}} onClick={()=>{console.log("something")}}>Your results here</h3>
              </div>
            </Col>
          </Row>
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
