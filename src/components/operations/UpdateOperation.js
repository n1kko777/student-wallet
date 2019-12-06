import React, { useRef } from "react";
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
import { updateOperation } from "../../store/actions/operations";
import { updateWallet } from "../../store/actions/wallets";

const UpdateOperation = ({
  current,
  updateOperation,
  updateWallet,
  userData,
  visible,
  onCancel,
  onSubmit,
  form
}) => {
  const hasCategory =
    current !== null &&
    current.category !== undefined &&
    current.category !== null;

  const newCategory = useRef();

  const { getFieldDecorator } = form;
  const { Option } = Select;

  const { wallets, categories } = userData;

  const { confirm } = Modal;

  const onCreate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      if (
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
            fieldsValue.id = current.id;

            updateOperation(fieldsValue);
            const newWallet = wallets.filter(
              wallet => wallet.id === fieldsValue.wallet
            )[0];

            newWallet.wallet_amount = hasCategory
              ? parseFloat(
                  parseFloat(newWallet.wallet_amount) -
                    parseFloat(fieldsValue.credit) +
                    parseFloat(current.credit)
                )
              : parseFloat(
                  parseFloat(newWallet.wallet_amount) +
                    parseFloat(fieldsValue.credit) -
                    parseFloat(current.credit)
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
        fieldsValue.id = current.id;

        updateOperation(fieldsValue);
        const newWallet = wallets.filter(
          wallet => wallet.id === fieldsValue.wallet
        )[0];

        newWallet.wallet_amount = hasCategory
          ? parseFloat(
              parseFloat(newWallet.wallet_amount) -
                parseFloat(fieldsValue.credit) +
                parseFloat(current.credit)
            )
          : parseFloat(
              parseFloat(newWallet.wallet_amount) +
                parseFloat(fieldsValue.credit) -
                parseFloat(current.credit)
            );

        updateWallet(newWallet);

        form.resetFields();
        onSubmit();
      }
    });
  };

  const addCategoryItem = () => {
    console.log(
      "addCategoryItem :",
      newCategory.current.rcSelect.state.inputValue
    );
  };

  return (
    <Modal
      visible={visible}
      title={hasCategory ? "Обновить расход" : "Обновить доход"}
      okText="Обновить"
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
                      onClick={addCategoryItem}
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
  );
};

UpdateOperation.propTypes = {
  current: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  updateWallet: PropTypes.func.isRequired,
  updateOperation: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired
};

const WrappedUpdateOperation = Form.create({
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
})(UpdateOperation);

const mapDispatchToProps = dispatch => ({
  updateOperation: operation => dispatch(updateOperation(operation)),
  updateWallet: wallet => dispatch(updateWallet(wallet))
});

const mapStateToProps = ({ user, operations }) => ({
  current: operations.current,
  userData: user.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUpdateOperation);
