import TextAreaForm from "./TextAreaForm";
import MLTK_ENDPOINTS from "../configs/mltk_endpoint";

export default function MLTKForm(props) {
  switch (props.formtype) {
    case "textarea":
      return (
        <TextAreaForm
          endpoint={MLTK_ENDPOINTS["DISASTER_TWEETS"]}
          setRequestPending={props.setRequestPending}
          setRequestResult={props.setRequestResult}
        />
      );
  }
}
