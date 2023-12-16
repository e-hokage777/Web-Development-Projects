import { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import IconButton from "../buttons/IconButton/IconButton";
import Loader from "../loader/Loader";

import MLTK_ENDPOINTS from "../../configs/mltk_endpoint";
import MLTKForm from "../../forms/MLTKForm";

import PredictionResultsDisplay from "../../result_displays/PredictionResultsDisplay";

export default function MLTKModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <IconButton onClick={handleShow} icon={props.btnIcon}>
        {props.title}
      </IconButton>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="xl"
        fullscreen="sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="p-3 border-end border-primary" xs={12} sm={6}>
              {props.children[0]}
            </Col>
            <Col className="p-3" xs={12} sm={6}>
              {props.children[1]}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}
