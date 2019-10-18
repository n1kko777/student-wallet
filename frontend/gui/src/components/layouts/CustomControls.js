import React from "react";
import PropTypes from "prop-types";

import { Row, Col } from "react-flexbox-grid";

import AddOperationButton from "../buttons/AddOperationButton";
import AddAmountButton from "../buttons/AddAmountButton";
import ChangeWalletButton from "../buttons/ChangeWalletButton";
import SearchButton from "../buttons/SearchButton";

const CustomControls = ({ fetchData }) => {
  return (
    <div
      style={{
        margin: "0 0 25px"
      }}
    >
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <AddOperationButton fetchData={fetchData} />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <AddAmountButton />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <ChangeWalletButton />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <SearchButton />
        </Col>
      </Row>
    </div>
  );
};

CustomControls.propTypes = {
  fetchData: PropTypes.func.isRequired
};

export default CustomControls;
