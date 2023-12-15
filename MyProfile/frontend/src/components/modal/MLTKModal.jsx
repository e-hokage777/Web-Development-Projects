import { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import IconButton from "../buttons/IconButton/IconButton";
import Loader from "../loader/Loader";

import TextAreaForm from "../../forms/TextAreaForm";
import MLTK_ENDPOINTS from "../../configs/mltk_endpoint";
import MLTKForm from "../../forms/MLTKForm";

import PredictionResultsDisplay from "../../result_displays/PredictionResultsDisplay";


export default function MLTKModal(props) {
  const [show, setShow] = useState(false);
  const [pending, setPending] = useState(false);
  const [requestResult, setRequestResult] = useState(null);

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
            <Col xs={12} sm={6}>
              <MLTKForm formtype="textarea" setRequestPending={setPending} setRequestResult={setRequestResult}/>
            </Col>
            <Col xs={12} sm={6}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >{
                pending? <Loader />: ""
              }
               {!requestResult ? <h3>Your results here</h3>: <PredictionResultsDisplay prediction={requestResult["prediction"]} probability={requestResult["probability"]}/>}
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
