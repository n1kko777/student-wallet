import React from "react";
import "antd/dist/antd.css";
import "./App.css";

import { Layout } from "antd";

import CustomToolbar from "./components/layouts/CustomToolbar";
import OperationList from "./components/operations/OperationsList";
import CustomFooter from "./components/layouts/CustomFooter";

const App = () => {
  const { Content } = Layout;

  return (
    <Layout className='layout'>
      <CustomToolbar />
      <Content style={{ padding: "25px 0", minHeight: "80vh" }}>
        <OperationList />
      </Content>
      <CustomFooter />
    </Layout>
  );
};
export default App;
