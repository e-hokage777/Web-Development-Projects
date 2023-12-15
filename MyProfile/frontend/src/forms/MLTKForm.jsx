import TextAreaForm from "./TextAreaForm";
import MLTK_ENDPOINTS from "../configs/mltk_endpoint";

export default function MLTKForm(props) {
  switch (props.formtype) {
    case "textarea":
      return (
        <TextAreaForm
          formMessage={props.formMessage}
          endpoint={MLTK_ENDPOINTS["DISASTER_TWEETS"]}
          setRequestPending={props.setRequestPending}
          setRequestResult={props.setRequestResult}
        />
      );
  }
}
