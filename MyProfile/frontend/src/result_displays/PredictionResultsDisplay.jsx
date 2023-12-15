import CircularLoader from "../components/circularloader/CircularLoader";

export default function PredictionResultsDisplay(props) {
  const predictionColor = props.prediction ? "red" : "blue";
  return (
    <div>
      <CircularLoader size="200" value={props.probability}>
        {parseFloat(props.probability).toFixed(2) * 100}%
        <span style={{ fontSize: "10px", color: predictionColor }}>
          {props.prediction ? "Positive" : "Negative"}
        </span>
      </CircularLoader>
    </div>
  );
}
