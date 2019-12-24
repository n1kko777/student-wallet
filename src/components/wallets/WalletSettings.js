import React, { useState } from "react";
import { Table, Divider, Icon, Popconfirm } from "antd";
import OperationTitle from "../operations/OperationTitle";

import { connect } from "react-redux";
import {
  deleteWallet,
  setCurrent,
  clearCurrent
} from "../../store/actions/wallets";

import UpdateWallet from "./UpdateWallet";

import PropTypes from "prop-types";

const WalletSettings = ({
  wallets,
  deleteWallet,
  setCurrent,
  clearCurrent
}) => {
  const { Column } = Table;
  const [isModalCreate, setModalCreate] = useState(false);

  const showModal = wallet => {
    setCurrent(wallet);
    setModalCreate(true);
  };

  const handleCancel = () => {
    setModalCreate(false);
    clearCurrent();
  };

  const handleSubmit = () => {
    setModalCreate(false);
    clearCurrent();
  };

  const data = wallets.map(
    ({ id, wallet_name, wallet_color, wallet_amount }) => ({
      key: id,
      wallet_name,
      wallet_color,
      wallet_amount
    })
  );

  const onDelete = wallet_id => deleteWallet(wallet_id);

  return (
    <>
      <UpdateWallet
        visible={isModalCreate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <Table
        className="display-table"
        dataSource={data}
        pagination={false}
        scroll={{ x: 350 }}
      >
        <Column title="Название" dataIndex="wallet_name" key="wallet_name" />
        <Column
          title="Цвет"
          dataIndex="wallet_color"
          key="wallet_color"
          render={(text, record) => (
            <span
              style={{
                display: "block",
                width: "15px",
                height: "15px",
                backgroundColor: `${record.wallet_color}`,
                border: "1px solid #595959"
              }}
            ></span>
          )}
        />
        <Column
          title="Баланс"
          dataIndex="wallet_amount"
          key="wallet_amount"
          render={(text, record) => (
            <OperationTitle
              credit={record.wallet_amount}
              color={record.wallet_color}
            />
          )}
        />
        <Column
          title="Действия"
          key="action"
          render={(text, record) => (
            <span>
              <Icon type="edit" key="edit" onClick={() => showModal(record)} />
              <Divider type="vertical" />
              <Popconfirm
                title="Удалить счет?"
                okText="Да"
                cancelText="Нет"
                onConfirm={() => onDelete(record.key)}
              >
                <Icon type="delete" key="delete" />
              </Popconfirm>
            </span>
          )}
        />
      </Table>
    </>
  );
};

WalletSettings.propTypes = {
  wallets: PropTypes.array.isRequired,
  deleteWallet: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = ({ user: { user } }) => ({
  wallets: user.wallets
});

const mapDispatchToProps = dispatch => ({
  deleteWallet: wallet_id => dispatch(deleteWallet(wallet_id)),
  setCurrent: wallet => dispatch(setCurrent(wallet)),
  clearCurrent: () => dispatch(clearCurrent())
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletSettings);
