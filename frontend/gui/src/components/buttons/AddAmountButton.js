import React from "react";
import { Button, Icon } from "antd";

import PropTypes from "prop-types";

const AddAmountButton = ({ isWallet }) => {
  return (
    <Button
      disabled={!isWallet}
      style={{
        width: "100%",
        color: "#fff",
        borderRadius: "0",
        backgroundColor: "#52c41a",
        textAlign: "left",
        marginBottom: "10px",
        opacity: isWallet ? "1" : "0.7"
      }}
      size={"large"}
    >
      <Icon style={{ paddingRight: "8px", paddingLeft: "6px" }} type='plus' />
      Добавить доход
    </Button>
  );
};

AddAmountButton.propTypes = {
  isWallet: PropTypes.bool.isRequired
};

export default AddAmountButton;
