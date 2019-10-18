import React from "react";
import Moment from "react-moment";

import { Card, Skeleton, Icon, Typography } from "antd";
import { Col } from "react-flexbox-grid";

import OperationTitle from "./OperationTitle";

import PropTypes from "prop-types";

const OperationItem = ({
  id,
  credit,
  category,
  wallet,
  fetchData,
  created_at,
  removeFromAmount,
  loading
}) => {
  const { Meta } = Card;
  const { Text } = Typography;

  const onDelete = id => {
    fetchData("delete", id);
  };

  return (
    <Col xs={12} sm={6} md={4}>
      <Card
        style={{ marginBottom: "20px" }}
        bordered={false}
        actions={
          !loading && [
            <Icon type='copy' key='copy' />,
            <Icon type='edit' key='edit' />,
            <Icon type='delete' key='delete' onClick={() => onDelete(id)} />
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
                  <Text>{category}</Text>
                </p>
                <Text
                  type='secondary'
                  style={{
                    display: "block",
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
  id: PropTypes.number.isRequired,
  credit: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  wallet: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  removeFromAmount: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchData: PropTypes.func.isRequired
};

export default OperationItem;
