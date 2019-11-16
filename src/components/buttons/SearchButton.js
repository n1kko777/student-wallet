import React from "react";
import { Button, Icon } from "antd";

const SearchButton = () => {
  return (
    <Button
      style={{
        width: "100%",
        color: "#fff",
        borderRadius: "0",
        backgroundColor: "#000E1B",
        textAlign: "left",
        marginBottom: "10px"
      }}
      size={"large"}
    >
      <Icon style={{ paddingRight: "8px", paddingLeft: "6px" }} type='search' />
      Поиск операции
    </Button>
  );
};

export default SearchButton;
