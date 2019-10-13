import React from "react";
import { Button, Icon } from "antd";

const AddAmountButton = () => {
  return (
    <Button
      style={{
        width: "100%",
        color: "#fff",
        borderRadius: "0",
        backgroundColor: "#52c41a",
        textAlign: "left",
        marginBottom: "10px"
      }}
      size={"large"}
    >
      <Icon style={{ paddingRight: "8px", paddingLeft: "6px" }} type='plus' />
      Добавить доход
    </Button>
  );
};

export default AddAmountButton;
