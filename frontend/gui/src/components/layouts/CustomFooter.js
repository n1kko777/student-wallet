import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Layout, Icon, Typography } from "antd";
import PropTypes from "prop-types";

import OperationTitle from "../operations/OperationTitle";
import CustomDatePicker from "../layouts/CustomDatePicker";
import CustomAlert from "./CustomAlert";

const CustomFooter = ({ isAlert, typeAlert, messageAlert }) => {
  const { Footer } = Layout;
  const { Text } = Typography;

  return (
    <Footer className='footer'>
      {isAlert && (
        <CustomAlert messageAlert={messageAlert} typeAlert={typeAlert} />
      )}
      <Grid>
        {window.location.pathname === "/feed" ? (
          <Row between='xs'>
            <Col xs={12} sm={3}>
              <Row between='xs'>
                <Col xs={6}>
                  <Icon type='up' style={{ color: "red" }} />{" "}
                  <OperationTitle credit='0' />
                </Col>
                <Col xs={6}>
                  <Icon type='down' style={{ color: "green" }} />{" "}
                  <OperationTitle credit='0' />
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={4}>
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
  isAlert: PropTypes.bool.isRequired,
  typeAlert: PropTypes.string.isRequired,
  messageAlert: PropTypes.string.isRequired
};

export default CustomFooter;
