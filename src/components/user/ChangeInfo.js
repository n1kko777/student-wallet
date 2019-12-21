import React from "react";
import { Form, Input, Icon, Button, Spin } from "antd";
import { connect } from "react-redux";
import { updateUserInfo } from "../../store/actions/user";

import PropTypes from "prop-types";

const ChangeInfo = ({ form, loading, updateUserInfo, user }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("values :", values);
        updateUserInfo(values, user.id);
      }
    });
  };

  const antIcon = <Icon type="loading" style={{ fontSize: 32 }} spin />;

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      {loading && <Spin indicator={antIcon} />}
      <Form.Item>
        {getFieldDecorator("username", {
          rules: [
            {
              required: true,
              message: "Пожалуйста введите Ваш логин!",
              whitespace: true
            }
          ]
        })(
          <Input
            prefix={<Icon type="number" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Логин"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("first_name", {
          rules: [
            {
              whitespace: true
            }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Имя"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("last_name", {
          rules: [
            {
              whitespace: true
            }
          ]
        })(
          <Input
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Фамилия"
          />
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "Указанная почта не соответсвует стандарту!"
            },
            {
              required: true,
              message: "Пожалуйста введите почту!"
            }
          ]
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Почта"
            disabled
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Обновить данные
        </Button>
      </Form.Item>
    </Form>
  );
};

ChangeInfo.propTypes = {
  loading: PropTypes.bool,
  updateUserInfo: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const WrappedUpdateUser = Form.create({
  mapPropsToFields(props) {
    if (props.user !== null) {
      return {
        first_name: Form.createFormField({
          value: props.user.first_name
        }),
        last_name: Form.createFormField({
          value: props.user.last_name
        }),
        username: Form.createFormField({
          value: props.user.username
        }),
        email: Form.createFormField({
          value: props.user.email
        })
      };
    }
  }
})(ChangeInfo);

const mapDispatchToProps = dispatch => ({
  updateUserInfo: (user, id) => dispatch(updateUserInfo(user, id))
});

const mapStateToProps = ({ user }) => ({
  user: user.user,
  loading: user.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedUpdateUser);
