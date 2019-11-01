import React, { useState, useEffect } from "react";
import { Form, Input, Button, Icon, Spin } from "antd";

import { connect } from "react-redux";
import { authSignUp } from "../../store/actions/auth";

import { useHistory, Link } from "react-router-dom";

import PropTypes from "prop-types";

const Register = ({ isRegister, form, onRegister, loading, error }) => {
  const { push } = useHistory();
  const [confirmDirty, setConfirmDirty] = useState(false);

  useEffect(() => {
    if (isRegister) {
      push("/login");
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onRegister(
          values.nickname,
          values.email,
          values.password,
          values.confirm
        );
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Пароли не совпадают!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  const { getFieldDecorator } = form;

  const antIcon = <Icon type='loading' style={{ fontSize: 32 }} spin />;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {error !== null ? <p>{error.message}</p> : <></>}
      {loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <Form onSubmit={handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator("nickname", {
              rules: [
                {
                  required: true,
                  message: "Пожалуйста введите Ваш логин!",
                  whitespace: true
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder='Ваш логин'
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
                prefix={
                  <Icon type='mail' style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder='Почта'
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Пожалуйста введите пароль!"
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(
              <Input.Password
                prefix={
                  <Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder='Пароль'
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Пожалуйста введите повторно пароль!"
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                prefix={
                  <Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder='Подтвердите пароль'
                onBlur={handleConfirmBlur}
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Зарегистрироваться
            </Button>
            Или <Link to='/'>Войти!</Link>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

const WrappedRegistrationForm = Form.create({ name: "register" })(Register);

Register.propTypes = {
  form: PropTypes.object.isRequired,
  isRegister: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onRegister: PropTypes.func.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isRegister: state.isRegister,
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (nickname, email, password1, password2) =>
      dispatch(authSignUp(nickname, email, password1, password2))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
