import React from "react";
import Moment from "react-moment";

import { Card, Skeleton, Icon, Typography } from "antd";
import { Col } from "react-flexbox-grid";

import OperationTitle from "./OperationTitle";

import PropTypes from "prop-types";

const OperationItem = ({
  credit,
  title,
  created_at,
  removeFromAmount,
  loading
}) => {
  const { Meta } = Card;
  const { Text } = Typography;

  return (
    <Col xs={12} sm={6} md={4}>
      <Card
        style={{ marginBottom: "20px" }}
        bordered={false}
        actions={
          !loading && [
            <Icon type='copy' key='copy' />,
            <Icon type='edit' key='edit' />,
            <Icon type='delete' key='delete' />
          ]
        }
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={
              removeFromAmount ? (
                <Icon type='up' key='up' style={{ color: "red" }} />
              ) : (
                <Icon type='down' key='down' style={{ color: "green" }} />
              )
            }
            title={<OperationTitle credit={credit} />}
            description={
              <>
                <p>
                  <Text>{title}</Text>
                </p>
                <Text
                  type='secondary'
                  style={{
                    display: "block",
                    textAlign: "right",
                    fontSize: "12px"
                  }}
                >
                  {<Moment format='DD.MM.YYYY HH:mm'>{created_at}</Moment>}
                </Text>
              </>
            }
          />
        </Skeleton>
      </Card>
    </Col>
  );
};

OperationItem.propTypes = {
  credit: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  removeFromAmount: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

export default OperationItem;
