import React from "react";
import { Layout, Typography } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Link } from "react-router-dom";

import OperationTitle from "../operations/OperationTitle";
import MainMenu from "./MainMenu";

const CustomToolbar = () => {
  const { Header } = Layout;
  const { Title } = Typography;
  return (
    <Header style={{ padding: "16px 0 0" }}>
      <Grid>
        <Row middle='xs' between='xs'>
          <Col xs={6} sm={4} md={3} lg={2}>
            {window.location.pathname === "/feed" ? (
              <div className='amount'>
                <OperationTitle credit='1 000 000' />
              </div>
            ) : (
              <Link to='/'>
                <Title style={{ color: "#fff", marginBottom: "0" }} level={3}>
                  StudWall
                </Title>
              </Link>
            )}
          </Col>
          <Col xs={2} sm={1}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <MainMenu />
            </div>
          </Col>
        </Row>
      </Grid>
    </Header>
  );
};

export default CustomToolbar;
