import "./loader.css";
import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <div className="loader">
      <Spinner variant="primary" />
    </div>
  );
}
