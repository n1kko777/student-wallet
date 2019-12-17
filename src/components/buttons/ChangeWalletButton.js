import React, { useState } from "react";
import { Button, Icon } from "antd";

import PropTypes from "prop-types";

import ChangeWalletBalance from "../wallets/ChangeWalletBalance";

const ChangeWalletButton = () => {
  const [isModalCreate, setModalCreate] = useState(false);

  const showModal = () => {
    setModalCreate(true);
  };

  const handleCancel = () => {
    setModalCreate(false);
  };

  const handleSubmit = () => {
    setModalCreate(false);
  };

  return (
    <>
      <Button
        style={{
          width: "100%",
          color: "#fff",
          borderRadius: "0",
          backgroundColor: "#436C94",
          textAlign: "left",
          marginBottom: "10px"
        }}
        size={"large"}
        onClick={showModal}
      >
        <Icon
          style={{ paddingRight: "8px", paddingLeft: "6px" }}
          type="retweet"
        />
        Перевести средства
      </Button>
      <ChangeWalletBalance
        visible={isModalCreate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </>
  );
};
ChangeWalletButton.propTypes = {
  isWallet: PropTypes.bool.isRequired
};

export default ChangeWalletButton;
