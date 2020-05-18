import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <div className="loader-wrapper">
        <Spinner animation="border" role="status" variant="dark">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </>
  );
};

export default Loader;
