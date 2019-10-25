import React from "react";
import { Layout, Typography } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Link, useLocation } from "react-router-dom";

import OperationTitle from "../operations/OperationTitle";
import MainMenu from "./MainMenu";

const CustomToolbar = ({ props }) => {
  const { Header } = Layout;
  const { Title } = Typography;

  const { pathname } = useLocation();

  return (
    <Header style={{ padding: "0" }}>
      <Grid>
        <Row middle='xs' between='xs'>
          <Col xs={6} sm={4} md={3} lg={2}>
            {pathname === "/feed" ? (
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
