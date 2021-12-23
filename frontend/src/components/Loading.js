import React from "react";
import { Spinner } from "react-bootstrap";
const Loading = () => {
  return (
    <div className="col text-center p-5 ">
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
        }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
