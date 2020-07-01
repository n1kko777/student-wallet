import React, { useState } from "react";
import locale from "antd/es/date-picker/locale/ru_RU";
import PropTypes from "prop-types";

import {
  Modal,
  Form,
  InputNumber,
  Select,
  Icon,
  Divider,
  DatePicker
} from "antd";
import moment from "moment";

import { connect } from "react-redux";
import { addOperation } from "../../store/actions/operations";
import { updateWallet } from "../../store/actions/wallets";

import CreateCategory from "../categories/CreateCategory";

const CreateOperation = ({
  addOperation,
  updateWallet,
  wallets,
  categories,
  visible,
  onCancel,
  onSubmit,
  form,
  isEarn
}) => {
  const { getFieldDecorator } = form;
  const { Option } = Select;

  const [isModalCreate, setModalCreate] = useState(false);

  const showModal = () => {
    setModalCreate(true);
  };

  const handleCancel = () => {
    setModalCreate(false);
  };

  const handleSubmit = () => {
    setModalCreate(false);
  };

  const { confirm } = Modal;

  const onCreate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      if (
        !isEarn &&
        +wallets.filter(wallet => wallet.id === fieldsValue.wallet)[0]
          .wallet_amount -
          +fieldsValue.credit <
          0
      ) {
        confirm({
          title: "Недостаточно средств на счете!",
          content: "Все равно провести операцию?",
          okText: "Подтвердить",
          cancelText: "Отменить",
          onOk() {
            addOperation(fieldsValue);
            const newWallet = wallets.filter(
              wallet => wallet.id === fieldsValue.wallet
            )[0];

            newWallet.wallet_amount = !isEarn
              ? parseFloat(
                  parseFloat(newWallet.wallet_amount) -
                    parseFloat(fieldsValue.credit)
                )
              : parseFloat(
                  parseFloat(newWallet.wallet_amount) +
                    parseFloat(fieldsValue.credit)
                );

            updateWallet(newWallet);

            form.resetFields();
            onSubmit();
          },
          onCancel() {
            return;
          }
        });
      } else {
        addOperation(fieldsValue);
        const newWallet = wallets.filter(
          wallet => wallet.id === fieldsValue.wallet
        )[0];

        newWallet.wallet_amount = !isEarn
          ? parseFloat(
              parseFloat(newWallet.wallet_amount) -
                parseFloat(fieldsValue.credit)
            )
          : parseFloat(
              parseFloat(newWallet.wallet_amount) +
                parseFloat(fieldsValue.credit)
            );

        updateWallet(newWallet);

        form.resetFields();
        onSubmit();
      }
    });
  };

  return (
    <>
      <CreateCategory
        visible={isModalCreate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <Modal
        visible={visible}
        title={!isEarn ? "Добавить расход" : "Добавить доход"}
        okText="Добавить"
        cancelText="Отменить"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="Сумма" hasFeedback>
            {getFieldDecorator("credit", {
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
          {!isEarn && (
            <Form.Item label="Укажите категорию" hasFeedback>
              {getFieldDecorator("category", {
                rules: [
                  { required: true, message: "Пожалуйста выберите категорию!" }
                ]
              })(
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children[2]
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <div
                        style={{ padding: "4px 8px", cursor: "pointer" }}
                        onMouseDown={e => e.preventDefault()}
                        onClick={showModal}
                      >
                        <Icon type="plus" /> Добавить категорию
                      </div>
                    </div>
                  )}
                >
                  {categories !== null &&
                    categories.map(category => (
                      <Option key={category.id} value={category.id}>
                        <span
                          style={{
                            display: "inline-block",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            marginRight: "5px",
                            verticalAlign: "middle",
                            background:
                              category.category_color !== ""
                                ? category.category_color
                                : "initial"
                          }}
                        ></span>{" "}
                        {category.category_name}
                      </Option>
                    ))}
                </Select>
              )}
            </Form.Item>
          )}
          <Form.Item label="Укажите счет" hasFeedback>
            {getFieldDecorator("wallet", {
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
                    <Option key={wallet.id} value={wallet.id}>
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

          <Form.Item label="Укажите дату">
            {getFieldDecorator("created_at")(
              <DatePicker locale={locale} setFieldsValue={moment()} />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

CreateOperation.propTypes = {
  isEarn: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  addOperation: PropTypes.func.isRequired,
  updateWallet: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  wallets: PropTypes.array,
  categories: PropTypes.array
};

const WrappedCreateOperation = Form.create({
  mapPropsToFields() {
    return {
      created_at: Form.createFormField({
        value: moment()
      })
    };
  }
})(CreateOperation);

const mapStateToProps = ({ user }) => ({
  wallets: user.user.wallets,
  categories: user.user.categories
});
const mapDispatchToProps = dispatch => ({
  addOperation: operation => dispatch(addOperation(operation)),
  updateWallet: wallet => dispatch(updateWallet(wallet))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCreateOperation);
