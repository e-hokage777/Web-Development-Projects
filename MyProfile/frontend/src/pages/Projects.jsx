import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCrack } from "@fortawesome/free-solid-svg-icons";

// importing forms
import TextAreaForm from "../forms/TextAreaForm.jsx";
import MLTK_ENDPOINTS from "../configs/mltk_endpoint.js";

import Loader from "../components/loader/Loader.jsx";

import MLTKModal from "../components/modal/MLTKModal.jsx";

// projects
import DisasterTweets from "../components/projects/DisasterTweets.jsx";
import AnimeFaceGenerator from "../components/projects/AnimeFAceGenerator.jsx";

// defining the base url
const baseUrl = "http://localhost:5000/mlkit";

export default function ProjectsPage() {
  return (
    <Container fluid>
      <Row>
        <Col lg={4} md={6} xs={12}>
          <DisasterTweets/>
        </Col>
        <Col lg={4} md={6} xs={12}>
          <AnimeFaceGenerator/>
        </Col>
        <Col lg={4} md={6} xs={12}>
          first
        </Col>
      </Row>
    </Container>
  );
}
