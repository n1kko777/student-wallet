import React from "react";
import ChangeInfo from "./ChangeInfo";
import ChangePassword from "./ChangePassword";

import { Row, Col } from "react-flexbox-grid";

const UserSettings = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Row style={{ width: "100%" }} between={"xs"}>
        <Col xs={12} sm={6} xlOffset={1}>
          <ChangeInfo />
        </Col>
        <Col xs={12} sm={5}>
          <ChangePassword />
        </Col>
      </Row>
    </div>
  );
};
export default UserSettings;
