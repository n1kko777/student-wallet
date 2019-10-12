import React from "react";
import PropTypes from "prop-types";

const OperationTitle = ({ credit }) => {
  return (
    <>
      {credit}
      &#8381;
    </>
  );
};

OperationTitle.propTypes = {
  credit: PropTypes.string.isRequired
};

export default OperationTitle;
