import { useState } from "react";

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
