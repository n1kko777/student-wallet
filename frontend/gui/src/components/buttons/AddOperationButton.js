import React, { useState } from "react";
import { Button, Icon } from "antd";
import PropTypes from "prop-types";

import CreateOperation from "../operations/CreateOperation";

const AddOperationButton = ({ fetchData }) => {
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
          backgroundColor: "#f5222d",
          textAlign: "left",
          marginBottom: "10px"
        }}
        size={"large"}
        onClick={showModal}
      >
        <Icon style={{ paddingRight: "8px", paddingLeft: "6px" }} type='plus' />
        Добавить расход
      </Button>
      <CreateOperation
        visible={isModalCreate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        fetchData={fetchData}
      />
    </>
  );
};

AddOperationButton.propTypes = {
  fetchData: PropTypes.func.isRequired
};

export default AddOperationButton;
