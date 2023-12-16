import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

import Loader from "../loader/Loader";

import MLTK_ENDPOINTS from "../../configs/mltk_endpoint";

import MLTKForm from "../../forms/MLTKForm";
import MLTKModal from "../modal/MLTKModal";
import ImageDisplay from "../../result_displays/ImageDisplay";

export default function AnimeFaceGenerator(props) {
  const [pending, setPending] = useState(false);
  const [requestResult, setRequestResult] = useState(null);
  return (
    <MLTKModal
      title="Anime Face Generator"
      btnIcon={<FontAwesomeIcon icon={faUserAlt} />}
    >
      <MLTKForm
        formtype="generator"
        formMessage="Click to generate random anime face"
        endpoint={MLTK_ENDPOINTS["ANIME_FACE_GENERATOR"]}
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
          <ImageDisplay
            data={requestResult}
          />
        )}
      </div>
    </MLTKModal>
  );
}
