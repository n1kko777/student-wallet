import React, { useState, useEffect } from "react";
import { Layout } from "antd";

import axios from "axios";

const CustomLayout = () => {
  const [operations, setOperations] = useState([]);
  const { Header, Footer, Content } = Layout;

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/").then(res => {
      setOperations(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Layout className='layout'>
      <Header>
        <div
          className='logo'
          style={{
            width: "120px",
            height: "31px",
            background: "rgba(255, 255, 255, 0.2)",
            margin: "16px 24px 16px 0"
          }}
        />
      </Header>
      <Content style={{ padding: "25px 50px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: "80vh" }}>
          {operations.length > 0
            ? operations.map(elem => (
                <p key={elem.id}>
                  {elem.title} <b>{elem.credit}</b>
                </p>
              ))
            : "Список операций пуст"}
        </div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default CustomLayout;
