import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import make_request from "../services/make_request";

export default function TextAreaForm(props) {
  const [formData, setFormData] = useState({ text: "" });
  const [disableSubmit, toggleDisableSubmit] = useState(false)
  // function to handle submitting
  const handleSubmit = (event) => {
    event.preventDefault();
    props.setRequestPending(true)
    toggleDisableSubmit(true)
    make_request(props.endpoint, formData).then((response) => {
      props.setRequestPending(false)
      props.setRequestResult(response.data);
      toggleDisableSubmit(false)
    });
  };

  // function to update form data
  const updateFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>{props.formMessage}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="text"
          value={formData.text}
          onInput={updateFormData}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={disableSubmit}>
        Submit
      </Button>
    </Form>
  );
}
