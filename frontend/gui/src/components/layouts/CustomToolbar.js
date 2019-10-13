import React from "react";
import { Layout } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";

import OperationTitle from "../operations/OperationTitle";
import ProfileMenu from "../profile/ProfileMenu";

const CustomToolbar = () => {
  const { Header } = Layout;
  return (
    <Header style={{ padding: "16px 0 0" }}>
      <Grid>
        <Row middle='xs' between='xs'>
          <Col xs={6} sm={4} md={3} lg={2}>
            <div className='logo'>
              <OperationTitle credit='1 000 000' />
            </div>
          </Col>
          <Col xs={2} sm={1}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <ProfileMenu />
            </div>
          </Col>
        </Row>
      </Grid>
    </Header>
  );
};

export default CustomToolbar;
