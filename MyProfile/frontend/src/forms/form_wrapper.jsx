import { useState } from "react";
import make_request from "../services/make_request";

function formWrapper(Form, initialFormData=null, responseType="json") {
  const FormWrapper = (props) => {
    const [formData, setFormData] = useState(initialFormData);
    const [disableSubmit, toggleDisableSubmit] = useState(false);
    // function to handle submitting
    const handleSubmit = (event) => {
      event.preventDefault();
      props.setRequestPending(true);
      toggleDisableSubmit(true);
      make_request(props.endpoint, formData, responseType).then((response) => {
        props.setRequestPending(false);
        props.setRequestResult(response ? response.data : null);
        toggleDisableSubmit(false);
      });
    };

    // function to update form data
    const updateFormData = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    return (
      <Form
        onSubmit={handleSubmit}
        onInput={updateFormData}
        disableSubmit={disableSubmit}
        formData={formData}
        {...props}
      />
    );
  };

  return FormWrapper;
}

export default formWrapper;
