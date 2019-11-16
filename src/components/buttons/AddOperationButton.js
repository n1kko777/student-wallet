import React, { useState } from "react";
import { Button, Icon } from "antd";

import PropTypes from "prop-types";

import CreateOperation from "../operations/CreateOperation";

const AddOperationButton = ({ isWallet }) => {
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
          backgroundColor: "#f5222d",
          textAlign: "left",
          marginBottom: "10px",
          opacity: isWallet ? "1" : "0.7"
        }}
        size={"large"}
        onClick={showModal}
      >
        <Icon style={{ paddingRight: "8px", paddingLeft: "6px" }} type="plus" />
        Добавить расход
      </Button>
      <CreateOperation
        visible={isModalCreate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEarn={false}
      />
    </>
  );
};

AddOperationButton.propTypes = {
  isWallet: PropTypes.bool.isRequired
};

export default AddOperationButton;
