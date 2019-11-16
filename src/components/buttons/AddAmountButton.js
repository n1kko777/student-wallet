import React, { useState } from "react";
import { Button, Icon } from "antd";

import PropTypes from "prop-types";

import CreateOperation from "../operations/CreateOperation";

const AddAmountButton = ({ isWallet }) => {
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
        onClick={showModal}
      >
        <Icon style={{ paddingRight: "8px", paddingLeft: "6px" }} type="plus" />
        Добавить доход
      </Button>
      <CreateOperation
        visible={isModalCreate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEarn={true}
      />
    </>
  );
};

AddAmountButton.propTypes = {
  isWallet: PropTypes.bool.isRequired
};

export default AddAmountButton;
