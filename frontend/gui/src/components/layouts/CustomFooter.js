import React from "react";
import { Grid } from "react-flexbox-grid";
import { Layout } from "antd";

const CustomFooter = () => {
  const { Footer } = Layout;

  return (
    <Footer>
      <Grid fluid>Footer</Grid>
    </Footer>
  );
};

export default CustomFooter;
