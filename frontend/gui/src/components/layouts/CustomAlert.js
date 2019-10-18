import React from "react";
import PropTypes from "prop-types";
import { Alert } from "antd";

const CustomAlert = ({ typeAlert, messageAlert }) => {
  return (
    <Alert
      message={messageAlert}
      type={typeAlert}
      style={{
        position: "absolute",
        left: "0",
        bottom: "58px",
        width: "100%"
      }}
      showIcon
      closable
      banner
    />
  );
};

CustomAlert.protoType = {
  typeAlert: PropTypes.string.isRequired,
  messageAlert: PropTypes.string.isRequired
};

export default CustomAlert;
