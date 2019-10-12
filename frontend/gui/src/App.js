import React from "react";
import "antd/dist/antd.css";
import "./App.css";

import { Layout } from "antd";
import { Grid } from "react-flexbox-grid";

import CustomToolbar from "./components/layouts/CustomToolbar";
import OperationList from "./components/operations/OperationsList";
import CustomFooter from "./components/layouts/CustomFooter";
import CustomAddInput from "./components/layouts/CustomAddInput";

const App = () => {
  const { Content } = Layout;

  return (
    <Layout className='layout'>
      <CustomToolbar />
      <Content style={{ padding: "25px 0", minHeight: "100vh" }}>
        <Grid>
          <CustomAddInput />
          <OperationList />
        </Grid>
      </Content>
      <CustomFooter />
    </Layout>
  );
};
export default App;
