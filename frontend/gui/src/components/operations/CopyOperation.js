import React, { useState } from "react";
import locale from "antd/es/date-picker/locale/ru_RU";
import PropTypes from "prop-types";

import { Modal, Form, Input, Select, Icon, Divider, DatePicker } from "antd";
import moment from "moment";

import { connect } from "react-redux";
import { addOperation } from "../../store/actions/operations";

const CopyOperation = ({
  addOperation,
  user,
  visible,
  onCancel,
  onSubmit,
  form
}) => {
  const { getFieldDecorator } = form;

  const { Option } = Select;

  const [newCategory, setNewCategory] = useState("");
  const [categoryList, setCategoryList] = useState([
    "Продукты",
    "Развлечения",
    "Хобби",
    "Покупки"
  ]);
  const walletList = ["Наличные", "Сбербанк", "Кредитка"];

  const onCreate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      addOperation(fieldsValue, user);
      form.resetFields();
      onSubmit();
    });
  };

  const onSearch = val => {
    setNewCategory(val);
  };

  const addCategoryItem = () => {
    setCategoryList([...categoryList, newCategory]);
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
                message: "Пожалуйста заполните данное поле!"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Укажите категорию' hasFeedback>
          {getFieldDecorator("category", {
            rules: [
              { required: true, message: "Пожалуйста выберите категорию!" }
            ]
          })(
            <Select
              showSearch
              onSearch={onSearch}
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
              {categoryList.map(category => (
                <Option key={category} value={category}>
                  {category}
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
              {walletList.map(wallet => (
                <Option key={wallet} value={wallet}>
                  {wallet}
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
  user: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  addOperation: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
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

const mapStateToProps = ({ auth, operations }) => ({
  user: auth.user,
  current: operations.current
});

const mapDispatchToProps = dispatch => ({
  addOperation: (operation, user) => dispatch(addOperation(operation, user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedCopyOperation);
