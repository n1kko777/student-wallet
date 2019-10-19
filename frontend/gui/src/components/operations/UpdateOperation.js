import React, { useState } from "react";
import locale from "antd/es/date-picker/locale/ru_RU";
import PropTypes from "prop-types";

import { Modal, Form, Input, Select, Icon, Divider, DatePicker } from "antd";
import moment from "moment";

const UpdateOperation = ({
  id,
  visible,
  onCancel,
  onSubmit,
  fetchData,
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

  const onCreate = current => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      fieldsValue.id = current;

      fetchData("put", fieldsValue);
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
      title='Обновить расход'
      okText='Обновить'
      cancelText='Отменить'
      onCancel={onCancel}
      onOk={() => onCreate(id)}
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

UpdateOperation.propTypes = {
  id: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
};

const WrappedUpdateOperation = Form.create({
  mapPropsToFields(props) {
    return {
      credit: Form.createFormField({
        value: props.operation.credit
      }),
      category: Form.createFormField({
        value: props.operation.category
      }),
      wallet: Form.createFormField({
        value: props.operation.wallet
      }),
      created_at: Form.createFormField({
        value: moment(props.operation.created_at)
      })
    };
  }
})(UpdateOperation);

export default WrappedUpdateOperation;
