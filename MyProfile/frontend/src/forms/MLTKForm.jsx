import TextAreaForm from "./TextAreaForm";
import GenerateForm from "./GenerateForm";
import MLTK_ENDPOINTS from "../configs/mltk_endpoint";

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
          <GenerateForm endpoint={props.endpoint}/>
        )
  }
}
