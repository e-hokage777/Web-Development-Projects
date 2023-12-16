import TextAreaForm from "./TextAreaForm";
import GenerateForm from "./GenerateForm";

export default function MLTKForm(props) {
  switch (props.formtype) {
    case "textarea":
      return (
        <TextAreaForm
          formMessage={props.formMessage}
          endpoint={props.endpoint}
          setRequestPending={props.setRequestPending}
          setRequestResult={props.setRequestResult}
        />
      );
    case "generator":
      return (
        <GenerateForm
          endpoint={props.endpoint}
          setRequestPending={props.setRequestPending}
          setRequestResult={props.setRequestResult}
        />
      );
  }
}
