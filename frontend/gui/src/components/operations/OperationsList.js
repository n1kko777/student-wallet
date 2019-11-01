import React, { useState, useEffect } from "react";
import { Row } from "react-flexbox-grid";
import PropTypes from "prop-types";

import { Card, Skeleton } from "antd";
import { Col } from "react-flexbox-grid";

import { connect } from "react-redux";
import {
  getOperations,
  deleteOperation,
  setCurrent,
  clearCurrent
} from "../../store/actions/operations";

import UpdateOperation from "../operations/UpdateOperation";
import CopyOperation from "../operations/CopyOperation";

import OperationItem from "./OperationItem";

const OperationsList = ({
  user,
  current,
  setCurrent,
  clearCurrent,
  getOperations,
  deleteOperation,
  loading,
  operations
}) => {
  useEffect(() => {
    getOperations(user.token);
  }, []);

  const [isModalUpdate, setModalUpdate] = useState(false);
  const [isModalCopy, setModalCopy] = useState(false);

  const handleCancel = seModalElem => {
    clearCurrent();
    seModalElem(false);
  };

  const handleSubmit = seModalElem => {
    clearCurrent();
    seModalElem(false);
  };

  const showEditModal = operation => {
    // filter operation
    setCurrent(operation);
    setModalUpdate(true);
  };

  const showCopyModal = operation => {
    // filter operation
    setCurrent(operation);
    setModalCopy(true);
  };

  const onDelete = operation => {
    deleteOperation(operation.id);
  };

  const { Meta } = Card;

  const cardPreview = (
    <Col xs={12} sm={6} md={4}>
      <Card style={{ marginBottom: "20px" }} bordered={false}>
        <Skeleton loading={loading} avatar active>
          <Meta avatar='' title='' description='' />
        </Skeleton>
      </Card>
    </Col>
  );

  if (loading || operations === null) {
    return (
      <Row start='xs'>
        {cardPreview}
        {cardPreview}
        {cardPreview}
        {cardPreview}
      </Row>
    );
  }

  return (
    <>
      <UpdateOperation
        visible={isModalUpdate}
        onSubmit={() => {
          handleSubmit(setModalUpdate);
        }}
        onCancel={() => {
          handleCancel(setModalUpdate);
        }}
      />
      <CopyOperation
        visible={isModalCopy}
        onSubmit={() => {
          handleSubmit(setModalCopy);
        }}
        onCancel={() => {
          handleCancel(setModalCopy);
        }}
      />
      <Row middle='xs'>
        {operations.length > 0 ? (
          operations.map(elem => (
            <OperationItem
              loading={loading}
              key={elem.id}
              operation={elem}
              showEditModal={showEditModal}
              showCopyModal={showCopyModal}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p style={{ width: "100%", textAlign: "center" }}>Список пуст.</p>
        )}
      </Row>
    </>
  );
};

OperationsList.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  operations: PropTypes.array,
  setCurrent: PropTypes.func.isRequired,
  getOperations: PropTypes.func.isRequired,
  deleteOperation: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, operations }) => ({
  user: auth.user,
  loading: operations.loading,
  operations: operations.operations,
  current: operations.current
});

const mapDispatchToProps = dispatch => ({
  deleteOperation: id => dispatch(deleteOperation(id)),
  setCurrent: operation => dispatch(setCurrent(operation)),
  clearCurrent: () => dispatch(clearCurrent()),
  getOperations: token => dispatch(getOperations(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperationsList);
