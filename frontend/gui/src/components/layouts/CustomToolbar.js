import React from "react";
import { Layout, Typography } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Link, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

import OperationTitle from "../operations/OperationTitle";
import MainMenu from "./MainMenu";

const CustomToolbar = ({ isAuth, setAuth }) => {
  const { Header } = Layout;
  const { Title } = Typography;

  const { pathname } = useLocation();

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Grid>
        <Row middle='xs' between='xs'>
          <Col xs={6} sm={4} md={3} lg={2}>
            {pathname === "/feed" ? (
              <div className='amount'>
                <OperationTitle credit='1 000 000' />
              </div>
            ) : (
              <Link to={isAuth ? "/feed" : "/"}>
                <Title style={{ color: "#fff", marginBottom: "0" }} level={3}>
                  StudWall
                </Title>
              </Link>
            )}
          </Col>
          <Col xs={2} sm={1}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <MainMenu isAuth={isAuth} setAuth={setAuth} />
            </div>
          </Col>
        </Row>
      </Grid>
    </Header>
  );
};

CustomToolbar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  setAuth: PropTypes.func.isRequired
};

export default CustomToolbar;
