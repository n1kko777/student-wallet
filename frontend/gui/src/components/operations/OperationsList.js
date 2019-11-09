import React, { useState } from "react";
import { Row } from "react-flexbox-grid";
import PropTypes from "prop-types";

import { Card, Skeleton } from "antd";
import { Col } from "react-flexbox-grid";

import { connect } from "react-redux";
import {
  deleteOperation,
  setCurrent,
  clearCurrent
} from "../../store/actions/operations";

import UpdateOperation from "../operations/UpdateOperation";
import CopyOperation from "../operations/CopyOperation";

import OperationItem from "./OperationItem";

const OperationsList = ({
  userData,
  operations: { operations },
  setCurrent,
  clearCurrent,
  deleteOperation,
  loading
}) => {
  const { wallets, categories } = userData;

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
              key={elem.id}
              loading={loading}
              operation={elem}
              credit={elem.credit}
              wallet={
                elem.wallet !== null && wallets !== null
                  ? wallets
                      .map(
                        (wallet, i) =>
                          elem.wallet === wallet.id && wallets[i].wallet_name
                      )[0]
                      .toString()
                  : ""
              }
              category={
                elem.category !== null && categories !== null
                  ? categories
                      .map(
                        (category, i) =>
                          elem.category === category.id &&
                          categories[i].category_name
                      )[0]
                      .toString()
                  : ""
              }
              removeFromAmount={elem.category !== null}
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
  loading: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  operations: PropTypes.object.isRequired,
  setCurrent: PropTypes.func.isRequired,
  deleteOperation: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = ({ user, operations }) => ({
  loading: user.loading,
  userData: user.user,
  operations: operations
});

const mapDispatchToProps = dispatch => ({
  deleteOperation: id => dispatch(deleteOperation(id)),
  setCurrent: operation => dispatch(setCurrent(operation)),
  clearCurrent: () => dispatch(clearCurrent())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OperationsList);
