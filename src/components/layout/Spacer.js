import React from "react";
import PropTypes from 'prop-types';

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

Spacer.propTypes = {
  size: PropTypes.number
}

export default Spacer;
