import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addWallet } from "../../store/actions/wallets";

import { Modal, Form, Input, InputNumber } from "antd";
import moment from "moment";
import { CirclePicker } from "react-color";

const CreateWallet = ({ addWallet, visible, onCancel, onSubmit, form }) => {
  const { getFieldDecorator } = form;

  const onCreate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      addWallet(fieldsValue);
      form.resetFields();
      onSubmit();
    });
  };

  const handleChange = (color, event) => {
    event.target.style.boxShadow = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}) 0px 0px 0px 4px inset`;
    form.setFieldsValue({
      wallet_color: color.hex
    });
  };

  return (
    <Modal
      visible={visible}
      title="Добавить кошелек"
      okText="Добавить"
      cancelText="Отменить"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <Form.Item label="Название кошелька" hasFeedback>
          {getFieldDecorator("wallet_name", {
            rules: [
              {
                required: true,
                message: "Пожалуйста введите название кошелька!"
              }
            ]
          })(<Input style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item label="Остаток в кошельке" hasFeedback>
          {getFieldDecorator("wallet_amount", {
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
        <Form.Item label="Выберите цвет кошелька" hasFeedback>
          {getFieldDecorator("wallet_color", {
            rules: [
              {
                required: true,
                message: "Пожалуйста выберите цвет!"
              }
            ]
          })(<Input className="hidden-input" disabled />)}

          <div>
            <CirclePicker onChange={handleChange} />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CreateWallet.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  addWallet: PropTypes.func.isRequired,
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
})(CreateWallet);

const mapDispatchToProps = dispatch => ({
  addWallet: operation => dispatch(addWallet(operation))
});

export default connect(null, mapDispatchToProps)(WrappedCreateWallet);
