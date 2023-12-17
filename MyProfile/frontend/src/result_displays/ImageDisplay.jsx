import { useState } from "react";

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export default function ImageDisplay(props) {
  const [some, dosome] = useState();

  const reader = new FileReader();
  reader.onloadend = () => dosome(reader.result)
  reader.readAsDataURL(props.data);

  return (
    <div>
      {/* <img src={'data:image/png;base64,'+btoa(props.data)} alt="Random Generated Image" /> */}
      <img
        src={some}
        alt="Random Generated Image"
      />
    </div>
  );
}
