import React, { useState } from "react";

import { Mentions, Button } from "antd";

const CustomAddInput = () => {
  const { Option } = Mentions;
  const MOCK_DATA = {
    "@": ["Кошелек", "Карточка 1", "Карточка 2"],
    "#": ["Продукты", "Услуги", "Развлечения"],
    ".": ["Текущая дата"],
    "/": ["Сообщение"]
  };
  const [prefix, setPrefix] = useState("@");

  const onSearch = (_, prefix) => {
    setPrefix(prefix);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 40px",
        margin: "0 0 25px"
      }}
    >
      <Mentions
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "0",
          borderRight: "none",
          fontSize: "16px"
        }}
        placeholder='@Кошелек #Категория 1000 ₽ .12.10.2019 /метка комментарий'
        prefix={["@", "#", ".", "/"]}
        onSearch={onSearch}
      >
        {(MOCK_DATA[prefix] || []).map(value => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </Mentions>
      <Button
        style={{ color: "#fff", borderRadius: "0", backgroundColor: "#255D94" }}
        icon='plus'
        size={"large"}
      />
    </div>
  );
};

export default CustomAddInput;
