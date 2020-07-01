import React, { useState, useEffect } from "react";
import { Row } from "react-flexbox-grid";
import PropTypes from "prop-types";

import { Card, Skeleton } from "antd";
import { Col } from "react-flexbox-grid";

import moment from "moment";

import { connect } from "react-redux";
import {
  deleteOperation,
  setCurrent,
  clearCurrent
} from "../../store/actions/operations";
import { updateWallet } from "../../store/actions/wallets";

import UpdateOperation from "./UpdateOperation";
import CopyOperation from "./CopyOperation";

import OperationItem from "./OperationItem";
import { updateUser } from "../../store/actions/user";

const OperationsList = ({
  userData,
  updateUser,
  updateWallet,
  wallets,
  categories,
  operations: { operations },
  setCurrent,
  clearCurrent,
  deleteOperation,
  loading,
  day_start,
  day_end,
  currentWallet
}) => {
  useEffect(() => {
    if (operations !== null) {
      userData.user_earn = 0;
      userData.user_spend = 0;
      operations
        .filter(operation =>
          moment(operation.created_at).isBetween(
            moment(day_start),
            moment(day_end)
          )
        )
        .filter(operation =>
          currentWallet !== null
            ? operation.wallet === currentWallet.id
            : operation
        )
        .map(operation =>
          operation.operation_type === 0
            ? (userData.user_spend += parseFloat(operation.credit))
            : operation.operation_type === 1 &&
              (userData.user_earn += parseFloat(operation.credit))
        );

      updateUser(userData);
    }
  }, [operations, userData, updateUser, day_start, day_end, currentWallet]);

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

    const newWallet = wallets.filter(
      wallet => wallet.id === operation.wallet
    )[0];

    operation.operation_type === 0
      ? (newWallet.wallet_amount = parseFloat(
          parseFloat(newWallet.wallet_amount) + parseFloat(operation.credit)
        ))
      : operation.operation_type === 1 &&
        (newWallet.wallet_amount = parseFloat(
          parseFloat(newWallet.wallet_amount) - parseFloat(operation.credit)
        ));

    updateWallet(newWallet);
  };

  const { Meta } = Card;

  const cardPreview = (
    <Col xs={12} sm={6} md={4}>
      <Card style={{ marginBottom: "20px" }} bordered={false}>
        <Skeleton loading={loading} avatar active>
          <Meta avatar="" title="" description="" />
        </Skeleton>
      </Card>
    </Col>
  );

  if (loading) {
    return (
      <Row start="xs">
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
      <Row middle="xs">
        {operations !== null && operations.length > 0 ? (
          operations
            .filter(operation =>
              moment(operation.created_at).isBetween(
                moment(day_start),
                moment(day_end)
              )
            )
            .filter(operation =>
              currentWallet !== null
                ? operation.wallet === currentWallet.id
                : operation
            )
            .sort((a, b) =>
              new Date(b.created_at) > new Date(a.created_at)
                ? 1
                : new Date(a.created_at) > new Date(b.created_at)
                ? -1
                : 0
            )
            .map(elem => (
              <OperationItem
                key={elem.id}
                loading={loading}
                operation={elem}
                credit={elem.credit}
                wallet={
                  elem.wallet !== null &&
                  wallets !== null &&
                  wallets.length !== 0
                    ? wallets.find(
                        (wallet, i) =>
                          elem.wallet === wallet.id &&
                          wallets[i].wallet_name !== null
                      ) !== undefined
                      ? wallets
                          .find(
                            (wallet, i) =>
                              elem.wallet === wallet.id &&
                              wallets[i].wallet_name !== null
                          )
                          .wallet_name.toString()
                      : ""
                    : ""
                }
                wallet_color={
                  elem.wallet !== null &&
                  wallets !== null &&
                  wallets.length !== 0
                    ? wallets.find(
                        (wallet, i) =>
                          elem.wallet === wallet.id &&
                          wallets[i].wallet_color !== null
                      ) !== undefined
                      ? wallets
                          .find(
                            (wallet, i) =>
                              elem.wallet === wallet.id &&
                              wallets[i].wallet_color !== null
                          )
                          .wallet_color.toString()
                      : ""
                    : ""
                }
                category={
                  elem.category !== null &&
                  categories !== null &&
                  categories.length !== 0
                    ? categories.find(
                        (category, i) =>
                          elem.category === category.id &&
                          categories[i].category_name !== null
                      ) !== undefined
                      ? categories
                          .find(
                            (category, i) =>
                              elem.category === category.id &&
                              categories[i].category_name !== null
                          )
                          .category_name.toString()
                      : ""
                    : ""
                }
                category_color={
                  elem.category !== null &&
                  categories !== null &&
                  categories.length !== 0
                    ? categories.find(
                        (category, i) =>
                          elem.category === category.id &&
                          categories[i].category_color !== null
                      ) !== undefined
                      ? categories
                          .find(
                            (category, i) =>
                              elem.category === category.id &&
                              categories[i].category_color !== null
                          )
                          .category_color.toString()
                      : ""
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
  updateWallet: PropTypes.func.isRequired,
  wallets: PropTypes.array,
  categories: PropTypes.array,
  operations: PropTypes.object.isRequired,
  setCurrent: PropTypes.func.isRequired,
  deleteOperation: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
  day_start: PropTypes.object,
  day_end: PropTypes.object,
  currentWallet: PropTypes.object
};

const mapStateToProps = ({ user, operations, wallets }) => ({
  loading: operations.loading,
  userData: user.user,
  wallets: user.user.wallets,
  categories: user.user.categories,
  operations: operations,
  day_start: operations.day_start,
  day_end: operations.day_end,
  currentWallet: wallets.current
});

const mapDispatchToProps = dispatch => ({
  deleteOperation: id => dispatch(deleteOperation(id)),
  setCurrent: operation => dispatch(setCurrent(operation)),
  clearCurrent: () => dispatch(clearCurrent()),
  updateUser: user => dispatch(updateUser(user)),
  updateWallet: wallet => dispatch(updateWallet(wallet))
});

export default connect(mapStateToProps, mapDispatchToProps)(OperationsList);
