import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { updateWallet } from "../../store/actions/wallets";

import { Modal, Form, Input, InputNumber } from "antd";
import moment from "moment";
import { CirclePicker } from "react-color";

const UpdateWallet = ({ updateWallet, visible, onCancel, onSubmit, form }) => {
  const { getFieldDecorator } = form;

  const onCreate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      fieldsValue.id = form.getFieldValue("key");
      updateWallet(fieldsValue);
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
      title="Оновить счет"
      okText="Оновить"
      cancelText="Отменить"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <Form.Item label="Название счета" hasFeedback>
          {getFieldDecorator("wallet_name", {
            rules: [
              {
                required: true,
                message: "Пожалуйста введите название счета!"
              }
            ]
          })(<Input style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item label="Остаток на счете" hasFeedback>
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
        <Form.Item label="Выберите цвет счета" hasFeedback>
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

UpdateWallet.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  updateWallet: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
};

const WrappedUpdateWallet = Form.create({
  mapPropsToFields(props) {
    if (props.current !== null) {
      return {
        key: Form.createFormField({
          value: props.current.key
        }),
        wallet_amount: Form.createFormField({
          value: props.current.wallet_amount
        }),
        wallet_name: Form.createFormField({
          value: props.current.wallet_name
        }),
        wallet_color: Form.createFormField({
          value: props.current.wallet_color
        }),
        created_at: Form.createFormField({
          value: moment(props.current.created_at)
        })
      };
    }
  }
})(UpdateWallet);

const mapStateToProps = ({ wallets }) => ({
  current: wallets.current
});

const mapDispatchToProps = dispatch => ({
  updateWallet: operation => dispatch(updateWallet(operation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUpdateWallet);
