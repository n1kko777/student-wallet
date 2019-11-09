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
import { addOperation } from "../../store/actions/operations";

const CopyOperation = ({
  addOperation,
  userData,
  visible,
  onCancel,
  onSubmit,
  form
}) => {
  const newCategory = useRef();

  const { getFieldDecorator } = form;
  const { Option } = Select;

  const { wallets, categories } = userData;

  const onCreate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      addOperation(fieldsValue);
      form.resetFields();
      onSubmit();
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
      title='Скопировать расход'
      okText='Скопировать'
      cancelText='Отменить'
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout='vertical'>
        <Form.Item label='Сумма' hasFeedback>
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
                `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              // eslint-disable-next-line
              parser={value => value.replace(/\₽\s?|(,*)/g, "")}
              style={{ width: "100%" }}
            />
          )}
        </Form.Item>
        <Form.Item label='Укажите категорию' hasFeedback>
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
                    <Icon type='plus' /> Добавить категорию
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
        <Form.Item label='Укажите кошелек' hasFeedback>
          {getFieldDecorator("wallet", {
            rules: [{ required: true, message: "Пожалуйста выберите кошелек!" }]
          })(
            <Select>
              {wallets !== null &&
                wallets.map(wallet => (
                  <Option key={wallet.id} value={wallet.id}>
                    {wallet.wallet_name}
                  </Option>
                ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label='Укажите дату'>
          {getFieldDecorator("created_at")(
            <DatePicker locale={locale} setFieldsValue={moment()} />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

CopyOperation.propTypes = {
  current: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
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
  addOperation: operation => dispatch(addOperation(operation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCopyOperation);
