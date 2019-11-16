import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { addCategory } from "../../store/actions/categories";

import { Modal, Form, Input } from "antd";
import moment from "moment";
import { CirclePicker } from "react-color";

const CreateCategory = ({ addCategory, visible, onCancel, onSubmit, form }) => {
  const { getFieldDecorator } = form;

  const onCreate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      addCategory(fieldsValue);
      form.resetFields();
      onSubmit();
    });
  };

  const handleChange = (color, event) => {
    event.target.style.boxShadow = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}) 0px 0px 0px 4px inset`;
    form.setFieldsValue({
      category_color: color.hex
    });
  };

  return (
    <Modal
      visible={visible}
      title="Добавить категорию"
      okText="Добавить"
      cancelText="Отменить"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form layout="vertical">
        <Form.Item label="Название категории" hasFeedback>
          {getFieldDecorator("category_name", {
            rules: [
              {
                required: true,
                message: "Пожалуйста введите название категории!"
              }
            ]
          })(<Input style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item label="Выберите цвет категории" hasFeedback>
          {getFieldDecorator("category_color", {
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

CreateCategory.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
};

const WrappedCreateCategory = Form.create({
  mapPropsToFields() {
    return {
      created_at: Form.createFormField({
        value: moment()
      })
    };
  }
})(CreateCategory);

const mapDispatchToProps = dispatch => ({
  addCategory: operation => dispatch(addCategory(operation))
});

export default connect(null, mapDispatchToProps)(WrappedCreateCategory);
