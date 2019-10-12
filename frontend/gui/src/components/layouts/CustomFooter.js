import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Layout, Icon } from "antd";

import OperationTitle from "../operations/OperationTitle";
import CustomDatePicker from "../layouts/CustomDatePicker";

const CustomFooter = () => {
  const { Footer } = Layout;

  return (
    <Footer className='footer'>
      <Grid>
        <Row between='xs'>
          <Col xs={12} sm={3}>
            <Row between='xs'>
              <Col xs={6}>
                <Icon type='down' style={{ color: "green" }} />{" "}
                <OperationTitle credit='0' />
              </Col>
              <Col xs={6}>
                <Icon type='up' style={{ color: "red" }} />{" "}
                <OperationTitle credit='0' />
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={4}>
            <CustomDatePicker />
          </Col>
        </Row>
      </Grid>
    </Footer>
  );
};

export default CustomFooter;
