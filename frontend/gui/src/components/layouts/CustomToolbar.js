import React from "react";
import { Layout, Icon } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";

const CustomToolbar = () => {
  const { Header } = Layout;
  return (
    <Header style={{ paddingTop: "16px" }}>
      <Grid fluid>
        <Row middle='xs'>
          <Col xs={12} sm={3} md={2}>
            <div
              className='logo'
              style={{
                width: "120px",
                height: "31px",
                background: "rgba(255, 255, 255, 0.2)"
              }}
            />
          </Col>
          <Col xs={6} sm={6} md={9} />
          <Col xs={6} sm={3} md={1}>
            <Icon type='menu' key='menu' className='humburger' />
          </Col>
        </Row>
      </Grid>
    </Header>
  );
};

export default CustomToolbar;
