import React from "react";

const Spacer = (props) => {
  const { size } = props;
  let sizeInPx = "1px";
  if(typeof size === "number" && size > 0) {
    sizeInPx = `${size}px`;
  }
  return (
    <p style={{height: sizeInPx}}></p>
  );
};

export default Spacer;
