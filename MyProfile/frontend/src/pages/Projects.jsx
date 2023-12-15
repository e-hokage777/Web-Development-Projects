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

import MLTKModal from "../components/modal/MLTKModal.jsx";

// defining the base url
const baseUrl = "http://localhost:5000/mlkit";

export default function ProjectsPage() {
  return (
    <Container fluid>
      <Row>
        <Col lg={4} md={6} xs={12}>
          <MLTKModal
            title="Disaster Tweets"
            btnIcon={<FontAwesomeIcon icon={faHouseCrack} />}
            // form={<TextAreaForm endpoint={MLTK_ENDPOINTS["DISASTER_TWEETS"]} />}
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
