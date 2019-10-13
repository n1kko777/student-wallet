import React from "react";

import { Row, Col } from "react-flexbox-grid";

import AddOperationButton from "../buttons/AppOperationButton";
import AddAmountButton from "../buttons/AddAmountButton";
import AddWalletButton from "../buttons/AddWalletButton";
import SearchButton from "../buttons/SearchButton";

const CustomControls = () => {
  return (
    <div
      style={{
        margin: "0 0 25px"
      }}
    >
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <AddOperationButton />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <AddAmountButton />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <AddWalletButton />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <SearchButton />
        </Col>
      </Row>
    </div>
  );
};

export default CustomControls;
