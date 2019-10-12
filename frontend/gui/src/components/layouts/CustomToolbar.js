import React from "react";
import { Layout, Avatar } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";

import OperationTitle from "../operations/OperationTitle";

const CustomToolbar = () => {
  const { Header } = Layout;
  return (
    <Header style={{ padding: "16px 0 0" }}>
      <Grid>
        <Row middle='xs'>
          <Col xs={6} sm={3}>
            <div className='logo'>
              <OperationTitle credit='1 000 000' />
            </div>
          </Col>
          <Col xs={4} sm={8} />
          <Col xs={2} sm={1}>
            <Avatar size={31} icon='user' className='humburger' />
          </Col>
        </Row>
      </Grid>
    </Header>
  );
};

export default CustomToolbar;
