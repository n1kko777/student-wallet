import React from "react";
import { useLocation } from "react-router-dom";

import { Grid, Row, Col } from "react-flexbox-grid";
import { Layout, Icon, Typography } from "antd";

import PropTypes from "prop-types";

import { connect } from "react-redux";

import OperationTitle from "../operations/OperationTitle";
import CustomDatePicker from "../layouts/CustomDatePicker";
import CustomAlert from "./CustomAlert";

const CustomFooter = ({ userData }) => {
  const { user_earn, user_spend } = userData;

  const { Footer } = Layout;
  const { Text } = Typography;

  const { pathname } = useLocation();

  return (
    <Footer className='footer'>
      <CustomAlert />
      <Grid>
        {pathname === "/feed" ? (
          <Row between='xs'>
            <Col xs={12} sm={6} md={4}>
              <Row between='xs'>
                <Col xs={6}>
                  <Icon type='up' style={{ color: "red" }} />{" "}
                  <OperationTitle
                    credit={user_spend !== null ? user_spend.toString() : "0"}
                  />
                </Col>
                <Col xs={6}>
                  <Icon type='down' style={{ color: "green" }} />{" "}
                  <OperationTitle
                    credit={user_earn !== null ? user_earn.toString() : "0"}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <CustomDatePicker />
            </Col>
          </Row>
        ) : (
          <Text>&copy; Copyright 2019</Text>
        )}
      </Grid>
    </Footer>
  );
};

CustomFooter.propTypes = {
  userData: PropTypes.object.isRequired
};

const mapStateToProps = ({ user }) => ({
  userData: user.user
});

export default connect(mapStateToProps)(CustomFooter);
