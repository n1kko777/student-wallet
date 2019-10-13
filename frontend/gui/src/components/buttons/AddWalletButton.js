import React from "react";
import { Button, Icon } from "antd";

const AddWalletButton = () => {
  return (
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
    >
      <Icon style={{ paddingRight: "8px", paddingLeft: "6px" }} type='plus' />
      Добавить источник
    </Button>
  );
};

export default AddWalletButton;
