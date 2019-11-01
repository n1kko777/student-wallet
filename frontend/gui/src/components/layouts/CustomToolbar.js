import React from "react";
import { Layout, Typography } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Link, useLocation } from "react-router-dom";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import OperationTitle from "../operations/OperationTitle";
import MainMenu from "./MainMenu";

const CustomToolbar = ({ isAuth, user }) => {
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
                <OperationTitle
                  credit={
                    isAuth && user.user_amount !== undefined
                      ? user.user_amount.toString()
                      : "0"
                  }
                />
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
              <MainMenu />
            </div>
          </Col>
        </Row>
      </Grid>
    </Header>
  );
};

CustomToolbar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isAuth: typeof state.user["token"] !== "undefined",
    user: state.user
  };
};

export default connect(mapStateToProps)(CustomToolbar);
