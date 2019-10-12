import React from "react";
import PropTypes from "prop-types";

const OperationTitle = ({ credit }) => {
  const splitToDigits = str => {
    let parts = (str + "").split("."),
      main = parts[0],
      len = main.length,
      output = "",
      i = len - 1;

    while (i >= 0) {
      output = main.charAt(i) + output;
      if ((len - i) % 3 === 0 && i > 0) {
        output = " " + output;
      }
      --i;
    }

    if (parts[1]) {
      parts[1] = parts[1].slice(0, 3);
    }

    if (parts.length > 1) {
      output += "." + parts[1];
    }
    credit = output.slice(0, len + 4);
  };

  splitToDigits(credit.replace(/\s/g, ""));

  return <>{credit} &#8381;</>;
};

OperationTitle.propTypes = {
  credit: PropTypes.string.isRequired
};

export default OperationTitle;
