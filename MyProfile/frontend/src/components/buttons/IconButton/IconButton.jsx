import "./iconButton.css";

export default function IconButton(props) {
  return (
    <button className="icon-button" onClick={props.onClick}>
      <div style={{ fontSize: "5rem" }}>{props.icon}</div>
      <h3>{props.children}</h3>
    </button>
  );
}
