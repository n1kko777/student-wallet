import React from "react";
import { Card, Skeleton, Icon } from "antd";
import PropTypes from "prop-types";

const OperationItem = ({ credit, title, loading }) => {
  const { Meta } = Card;

  return (
    <Card
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
          title={credit}
          description={title}
        />
      </Skeleton>
    </Card>
  );
};

OperationItem.propTypes = {
  credit: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

export default OperationItem;
