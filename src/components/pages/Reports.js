import React, { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Row, Col } from "react-flexbox-grid";

import { Table } from "antd";

import PropTypes from "prop-types";
import moment from "moment";

import { connect } from "react-redux";

import { updateUser } from "../../store/actions/user";

const Reports = ({
  userData,
  updateUser,
  wallets,
  categories,
  operations: { operations },
  day_start,
  day_end,
  currentWallet,
  user_spend,
  user_earn
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
  }, [userData, updateUser, operations, day_start, day_end, currentWallet]);

  const reportDataColumns = [
    {
      title: "Счет",
      dataIndex: "name"
    },
    {
      title: "Процент",
      className: "column-procent",
      dataIndex: "procent"
    },
    {
      title: "Сумма",
      className: "column-money",
      dataIndex: "money"
    }
  ];

  console.clear();

  const categorySpendTable =
    categories !== null && operations !== null
      ? categories
          .map(elem =>
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
              .filter(operation => operation.category === elem.id)
          )
          .filter(elem => elem.length !== 0)
          .map((element, index) => ({
            key: index,
            name: categories.filter(
              categoryElem => categoryElem.id === element[0].category
            )[0].category_name,
            procent:
              element.length > 1
                ? `${parseInt(
                    (element.reduce((a, b) => {
                      return parseFloat(a) + parseFloat(b.credit);
                    }, 0) /
                      parseFloat(user_spend)) *
                      100
                  )} %`
                : `${parseInt(
                    (parseFloat(element[0].credit) / parseFloat(user_spend)) *
                      100
                  )} %`,
            money:
              element.length > 1
                ? element.reduce(
                    (a, b) => parseFloat(a) + parseFloat(b.credit),
                    0
                  )
                : element[0].credit
          }))
      : [];

  const walletSpendTable =
    wallets !== null && operations !== null
      ? wallets
          .map(elem =>
            operations
              .filter(operation =>
                moment(operation.created_at).isBetween(
                  moment(day_start),
                  moment(day_end)
                )
              )
              .filter(operation => operation.wallet === elem.id)
              .filter(operation =>
                currentWallet !== null
                  ? operation.wallet === currentWallet.id
                  : operation
              )
              .filter(walletOperation => walletOperation.operation_type === 0)
          )
          .filter(elem => elem.length !== 0)
          .map((element, index) => ({
            key: index,
            name: wallets.filter(
              walletElem => walletElem.id === element[0].wallet
            )[0].wallet_name,
            procent:
              element.length > 1
                ? `${parseInt(
                    (element.reduce(
                      (a, b) => parseFloat(a) + parseFloat(b.credit),
                      0
                    ) /
                      +user_spend) *
                      100
                  )} %`
                : `${parseInt((+element[0].credit / +user_spend) * 100)} %`,
            money:
              element.length > 1
                ? element.reduce(
                    (a, b) => parseFloat(a) + parseFloat(b.credit),
                    0
                  )
                : element[0].credit
          }))
      : [];

  const walletEarnTable =
    wallets !== null && operations !== null
      ? wallets
          .map(elem =>
            operations
              .filter(operation =>
                moment(operation.created_at).isBetween(
                  moment(day_start),
                  moment(day_end)
                )
              )
              .filter(operation => operation.wallet === elem.id)
              .filter(operation =>
                currentWallet !== null
                  ? operation.wallet === currentWallet.id
                  : operation
              )
              .filter(walletOperation => walletOperation.operation_type === 1)
          )
          .filter(elem => elem.length !== 0)
          .map((element, index) => ({
            key: index,
            name: wallets.filter(
              walletElem => walletElem.id === element[0].wallet
            )[0].wallet_name,
            procent:
              element.length > 1
                ? `${parseInt(
                    (element.reduce(
                      (a, b) => parseFloat(a) + parseFloat(b.credit),
                      0
                    ) /
                      +user_earn) *
                      100
                  )} %`
                : `${parseInt((+element[0].credit / +user_earn) * 100)} %`,
            money:
              element.length > 1
                ? element.reduce(
                    (a, b) => parseFloat(a) + parseFloat(b.credit),
                    0
                  )
                : element[0].credit
          }))
      : [];

  const walletDataSpend = {
    datasets: [
      {
        data:
          wallets !== null && operations !== null
            ? wallets.map(elem =>
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
                  .filter(operation => operation.wallet === elem.id)
                  .map(walletOperation =>
                    walletOperation.operation_type === 0
                      ? walletOperation.credit
                      : 0
                  )
                  .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
              )
            : [],
        backgroundColor:
          wallets !== null ? wallets.map(elem => elem.wallet_color) : []
      }
    ],
    labels: wallets !== null ? wallets.map(elem => elem.wallet_name) : [],
    options: {
      responsive: true
    }
  };

  const walletDataEarn = {
    datasets: [
      {
        data:
          wallets !== null && operations !== null
            ? wallets.map(elem =>
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
                  .filter(operation => operation.wallet === elem.id)
                  .map(walletOperation =>
                    walletOperation.operation_type === 1
                      ? walletOperation.credit
                      : 0
                  )
                  .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
              )
            : [],
        backgroundColor:
          wallets !== null ? wallets.map(elem => elem.wallet_color) : []
      }
    ],
    labels: wallets !== null ? wallets.map(elem => elem.wallet_name) : [],
    options: {
      responsive: true
    }
  };

  const categoryDataSpend = {
    datasets: [
      {
        data:
          categories !== null && operations !== null
            ? categories.map(elem =>
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
                  .filter(operation => operation.category === elem.id)
                  .map(categoryOperation =>
                    categoryOperation.operation_type === 0
                      ? categoryOperation.credit
                      : 0
                  )
                  .reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
              )
            : [],
        backgroundColor:
          categories !== null ? categories.map(elem => elem.category_color) : []
      }
    ],
    labels:
      categories !== null ? categories.map(elem => elem.category_name) : [],
    options: {
      responsive: true
    }
  };

  return (
    <div
      className="reports"
      style={{
        margin: "0 0 25px"
      }}
    >
      <h2> Отчет по счетам </h2>
      <Row>
        <Col xs={12} sm={6}>
          <h3> Расход </h3>
          <Doughnut
            data={walletDataSpend}
            legend={{
              position: "bottom"
            }}
          />
        </Col>
        <Col xs={12} sm={6}>
          <Table
            className="display-table"
            columns={reportDataColumns}
            dataSource={walletSpendTable}
            pagination={false}
            scroll={{
              y: 210
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6}>
          <h3> Доход </h3>
          <Doughnut
            data={walletDataEarn}
            legend={{
              position: "bottom"
            }}
          />
        </Col>
        <Col xs={12} sm={6}>
          <Table
            className="display-table"
            columns={reportDataColumns}
            dataSource={walletEarnTable}
            pagination={false}
            scroll={{
              y: 210
            }}
          />
        </Col>
      </Row>
      <h2> Отчет по категориям </h2>
      <Row>
        <Col xs={12} sm={6}>
          <h3> Расход </h3>
          <Doughnut
            data={categoryDataSpend}
            legend={{
              position: "bottom"
            }}
          />
        </Col>
        <Col xs={12} sm={6}>
          <Table
            className="display-table"
            columns={reportDataColumns}
            dataSource={categorySpendTable}
            pagination={false}
            scroll={{
              y: 210
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

Reports.propTypes = {
  userData: PropTypes.object.isRequired,
  user_spend: PropTypes.number.isRequired,
  user_earn: PropTypes.number.isRequired,
  wallets: PropTypes.array,
  categories: PropTypes.array,
  operations: PropTypes.object.isRequired,
  day_start: PropTypes.object,
  day_end: PropTypes.object,
  currentWallet: PropTypes.object
};

const mapStateToProps = ({ user, operations, wallets }) => ({
  userData: user.user,
  user_spend: user.user.user_spend,
  user_earn: user.user.user_earn,
  wallets: user.user.wallets,
  categories: user.user.categories,
  operations: operations,
  day_start: operations.day_start,
  day_end: operations.day_end,
  currentWallet: wallets.current
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
