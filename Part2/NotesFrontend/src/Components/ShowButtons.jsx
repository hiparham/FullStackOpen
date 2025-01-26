import { useState } from "react";

export default function ShowButtons({ handleShow }) {
  const [imp, setImp] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          handleShow(imp ? "a" : "i");
          setImp(!imp);
        }}
      >
        Show {imp ? "All" : "Important"} Notes
      </button>
    </div>
  );
}
