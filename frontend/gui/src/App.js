import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";

import { Layout } from "antd";
import { Grid } from "react-flexbox-grid";

import CustomToolbar from "./components/layouts/CustomToolbar";
import OperationList from "./components/operations/OperationsList";
import CustomFooter from "./components/layouts/CustomFooter";
import CustomControls from "./components/layouts/CustomControls";

const App = () => {
  const { Content } = Layout;

  const [isAlert, setAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  return (
    <Layout className='layout'>
      <CustomToolbar />
      <Content
        style={{ marginBottom: "70px", padding: "25px 0", minHeight: "100vh" }}
      >
        <Grid>
          <CustomControls />
          <OperationList
            setAlert={setAlert}
            setTypeAlert={setTypeAlert}
            setMessageAlert={setMessageAlert}
          />
        </Grid>
      </Content>
      <CustomFooter
        isAlert={isAlert}
        typeAlert={typeAlert}
        messageAlert={messageAlert}
      />
    </Layout>
  );
};
export default App;
