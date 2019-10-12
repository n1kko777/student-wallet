import React from "react";
import { Card, Skeleton, Icon } from "antd";
import { Col } from "react-flexbox-grid";

import OperationTitle from "./OperationTitle";

import PropTypes from "prop-types";

const OperationItem = ({ credit, title, loading }) => {
  const { Meta } = Card;

  return (
    <Col xs={12} sm={6} md={4}>
      <Card
        style={{ marginBottom: "20px" }}
        bordered={false}
        actions={[
          <Icon type='copy' key='copy' />,
          <Icon type='edit' key='edit' />,
          <Icon type='delete' key='delete' />
        ]}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Icon type='up' key='up' style={{ color: "red" }} />}
            title={<OperationTitle credit={credit} />}
            description={title}
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

OperationItem.propTypes = {
  credit: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

export default OperationItem;
