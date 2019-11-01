import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Alert } from "antd";

const CustomAlert = ({ alert: { alert } }) => {
  return (
    alert && (
      <Alert
        message={alert.msg}
        type={alert.type}
        style={{
          position: "absolute",
          left: "0",
          bottom: "58px",
          width: "100%"
        }}
        showIcon
        banner
      />
    )
  );
};

CustomAlert.propTypes = {
  alert: PropTypes.object.isRequired
};

const mapStateToProps = ({ alert }) => ({
  alert: alert
});

export default connect(mapStateToProps)(CustomAlert);
