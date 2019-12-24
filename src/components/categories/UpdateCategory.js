import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { updateCategory } from "../../store/actions/categories";

import { Modal, Form, Input } from "antd";
import moment from "moment";
import { CirclePicker } from "react-color";

const UpdateCategory = ({
  updateCategory,
  visible,
  onCancel,
  onSubmit,
  form
}) => {
  const { getFieldDecorator } = form;

  const onCreate = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      fieldsValue.id = form.getFieldValue("key");
      updateCategory(fieldsValue);
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
      title="Обновить категорию"
      okText="Обновить"
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
                message: "Пожалуйста введите название счета!"
              }
            ]
          })(<Input style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item label="Выберите цвет счета" hasFeedback>
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

UpdateCategory.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired
};

const WrappedUpdateCategory = Form.create({
  mapPropsToFields(props) {
    if (props.current !== null) {
      return {
        key: Form.createFormField({
          value: props.current.key
        }),
        category_name: Form.createFormField({
          value: props.current.category_name
        }),
        category_color: Form.createFormField({
          value: props.current.category_color
        }),
        created_at: Form.createFormField({
          value: moment(props.current.created_at)
        })
      };
    }
  }
})(UpdateCategory);

const mapStateToProps = ({ categories }) => ({
  current: categories.current
});

const mapDispatchToProps = dispatch => ({
  updateCategory: operation => dispatch(updateCategory(operation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUpdateCategory);
