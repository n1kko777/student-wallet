import React, { useRef, useState } from "react";
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

const CopyOperation = ({
  addOperation,
  updateWallet,
  userData,
  visible,
  onCancel,
  onSubmit,
  form,
  current
}) => {
  const hasCategory =
    current !== null &&
    current.category !== undefined &&
    current.category !== null;

  const newCategory = useRef();

  const { getFieldDecorator } = form;
  const { Option } = Select;

  const { wallets, categories } = userData;
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

  const onCreate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      addOperation(fieldsValue);
      const newWallet = wallets.filter(
        wallet => wallet.id === fieldsValue.wallet
      )[0];

      newWallet.wallet_amount = hasCategory
        ? parseFloat(
            parseFloat(newWallet.wallet_amount) - parseFloat(fieldsValue.credit)
          )
        : parseFloat(
            parseFloat(newWallet.wallet_amount) + parseFloat(fieldsValue.credit)
          );

      updateWallet(newWallet);

      form.resetFields();
      onSubmit();
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
        title={hasCategory ? "Скопировать расход" : "Скопировать доход"}
        okText="Скопировать"
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
          {hasCategory && (
            <Form.Item label="Укажите категорию" hasFeedback>
              {getFieldDecorator("category", {
                rules: [
                  { required: true, message: "Пожалуйста выберите категорию!" }
                ]
              })(
                <Select
                  showSearch
                  ref={newCategory}
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
              <Select>
                {wallets !== null &&
                  wallets.map(wallet => (
                    <Option
                      key={wallet.id}
                      value={wallet.id}
                      title={"Баланс: " + wallet.wallet_amount + " Р"}
                    >
                      {wallet.wallet_name}
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

CopyOperation.propTypes = {
  current: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  updateWallet: PropTypes.func.isRequired,
  addOperation: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired
};

const WrappedCopyOperation = Form.create({
  mapPropsToFields(props) {
    if (props.current !== null) {
      return {
        credit: Form.createFormField({
          value: props.current.credit
        }),
        category: Form.createFormField({
          value: props.current.category
        }),
        wallet: Form.createFormField({
          value: props.current.wallet
        }),
        created_at: Form.createFormField({
          value: moment(props.current.created_at)
        })
      };
    }
  }
})(CopyOperation);

const mapStateToProps = ({ operations, user }) => ({
  current: operations.current,
  userData: user.user
});

const mapDispatchToProps = dispatch => ({
  addOperation: operation => dispatch(addOperation(operation)),
  updateWallet: wallet => dispatch(updateWallet(wallet))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCopyOperation);
