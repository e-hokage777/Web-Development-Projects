import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import formWrapper from "./form_wrapper";

function GenerateForm(props) {
  return (
    <Form onSubmit={props.onSubmit} className="d-flex justify-content-center">
      <Button className="fs-5" variant="primary" type="submit" disabled={props.disableSubmit}>
        Generate
      </Button>
    </Form>
  );
}

export default formWrapper(GenerateForm, null, "blob");


