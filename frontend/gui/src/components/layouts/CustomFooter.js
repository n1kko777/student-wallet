import React from "react";
import { Grid } from "react-flexbox-grid";
import { Layout } from "antd";

const CustomFooter = () => {
  const { Footer } = Layout;

  return (
    <Footer style={{ paddingLeft: "0", paddingRight: "0" }}>
      <Grid>Footer</Grid>
    </Footer>
  );
};

export default CustomFooter;
