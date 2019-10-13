import React from "react";
import { Button, Icon } from "antd";

const AppOperationButton = () => {
  return (
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
    >
      <Icon style={{ paddingRight: "8px", paddingLeft: "6px" }} type='plus' />
      Добавить расход
    </Button>
  );
};

export default AppOperationButton;
