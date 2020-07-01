// ChangeWalletBalance
import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { updateWallet } from "../../store/actions/wallets";

import { Modal, Form, InputNumber, Select } from "antd";
import moment from "moment";

const ChangeWalletBalance = ({
  wallets,
  updateWallet,
  visible,
  onCancel,
  onSubmit,
  form
}) => {
  const { getFieldDecorator } = form;
  const { Option } = Select;
  const { confirm } = Modal;

  const onCreate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      if (
        +wallets.filter(wallet => wallet.id === fieldsValue.walletFrom)[0]
          .wallet_amount -
          +fieldsValue.wallet_change <
        0
      ) {
        confirm({
          title: "Недостаточно средств на счете!",
          content: "Все равно провести операцию?",
          okText: "Подтвердить",
          cancelText: "Отменить",
          onOk() {
            const fromWallet = wallets.filter(
              wallet => fieldsValue.walletFrom === wallet.id
            )[0];
            fromWallet.wallet_amount =
              parseFloat(fromWallet.wallet_amount) -
              parseFloat(fieldsValue.wallet_change);
            fromWallet.created_at = form.getFieldValue("created_at");

            const toWallet = wallets.filter(
              wallet => fieldsValue.walletTo === wallet.id
            )[0];
            toWallet.wallet_amount =
              parseFloat(toWallet.wallet_amount) +
              parseFloat(fieldsValue.wallet_change);
            toWallet.created_at = form.getFieldValue("created_at");

            updateWallet(fromWallet);
            updateWallet(toWallet);
            form.resetFields();
            onSubmit();
          },
          onCancel() {
            return;
          }
        });
      } else {
        const fromWallet = wallets.filter(
          wallet => fieldsValue.walletFrom === wallet.id
        )[0];
        fromWallet.wallet_amount =
          parseFloat(fromWallet.wallet_amount) -
          parseFloat(fieldsValue.wallet_change);
        fromWallet.created_at = form.getFieldValue("created_at");

        const toWallet = wallets.filter(
          wallet => fieldsValue.walletTo === wallet.id
        )[0];
        toWallet.wallet_amount =
          parseFloat(toWallet.wallet_amount) +
          parseFloat(fieldsValue.wallet_change);
        toWallet.created_at = form.getFieldValue("created_at");

        updateWallet(fromWallet);
        updateWallet(toWallet);
        form.resetFields();
        onSubmit();
      }
    });
  };

  return (
    <Modal
      visible={visible}
      title="Перевести средства"
      okText="Перевести"
      cancelText="Отменить"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <Form.Item label="Счет списания" hasFeedback>
          {getFieldDecorator("walletFrom", {
            rules: [{ required: true, message: "Пожалуйста выберите счет!" }]
          })(
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children[2]
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {wallets !== null &&
                wallets.map(wallet => (
                  <Option
                    key={wallet.id}
                    value={wallet.id}
                    disabled={wallet.id === form.getFieldValue("walletTo")}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        marginRight: "5px",
                        verticalAlign: "middle",
                        background:
                          wallet.wallet_color !== ""
                            ? wallet.wallet_color
                            : "initial"
                      }}
                    ></span>{" "}
                    {wallet.wallet_name} ({wallet.wallet_amount + " ₽"})
                  </Option>
                ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Счет пополнения" hasFeedback>
          {getFieldDecorator("walletTo", {
            rules: [{ required: true, message: "Пожалуйста выберите счет!" }]
          })(
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children[2]
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {wallets !== null &&
                wallets.map(wallet => (
                  <Option
                    key={wallet.id}
                    value={wallet.id}
                    disabled={wallet.id === form.getFieldValue("walletFrom")}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        marginRight: "5px",
                        verticalAlign: "middle",
                        background:
                          wallet.wallet_color !== ""
                            ? wallet.wallet_color
                            : "initial"
                      }}
                    ></span>{" "}
                    {wallet.wallet_name} ({wallet.wallet_amount + " ₽"})
                  </Option>
                ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Сумма перевода" hasFeedback>
          {getFieldDecorator("wallet_change", {
            rules: [
              {
                required: true,
                message: "Пожалуйста введите число!"
              }
            ]
          })(
            <InputNumber
              min={0}
              formatter={value =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              style={{ width: "100%" }}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

ChangeWalletBalance.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  updateWallet: PropTypes.func.isRequired,
  wallets: PropTypes.array,
  form: PropTypes.object.isRequired
};

const WrappedCreateWallet = Form.create({
  mapPropsToFields() {
    return {
      created_at: Form.createFormField({
        value: moment()
      })
    };
  }
})(ChangeWalletBalance);

const mapDispatchToProps = dispatch => ({
  updateWallet: wallet => dispatch(updateWallet(wallet))
});

const mapStateToProps = ({ user }) => ({
  wallets: user.user.wallets
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCreateWallet);
