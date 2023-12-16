import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseCrack } from "@fortawesome/free-solid-svg-icons";

import Loader from "../loader/Loader";

import MLTK_ENDPOINTS from "../../configs/mltk_endpoint";

import MLTKForm from "../../forms/MLTKForm";
import MLTKModal from "../modal/MLTKModal";
import PredictionResultsDisplay from "../../result_displays/PredictionResultsDisplay";

export default function DisasterTweets(props) {
  const [pending, setPending] = useState(false);
  const [requestResult, setRequestResult] = useState(null);
  return (
    <MLTKModal
      title="Disaster Tweets"
      btnIcon={<FontAwesomeIcon icon={faHouseCrack} />}
    >
      <MLTKForm
        formtype="textarea"
        formMessage="Enter a tweet and I'll tell you the chances of it being a disaster tweet"
        endpoint={MLTK_ENDPOINTS["DISASTER_TWEETS"]}
        setRequestPending={setPending}
        setRequestResult={setRequestResult}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {pending ? <Loader /> : ""}
        {!requestResult ? (
          <h3>Your results here</h3>
        ) : (
          <PredictionResultsDisplay
            prediction={requestResult["prediction"]}
            probability={requestResult["probability"]}
          />
        )}
      </div>
    </MLTKModal>
  );
}
