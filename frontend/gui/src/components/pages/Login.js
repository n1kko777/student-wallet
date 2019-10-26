import React from "react";
import { Form, Icon, Input, Button, Checkbox, Spin } from "antd";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authLogin } from "../../store/actions/auth";

import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";

const Login = ({ onAuth, form, loading, error, isAuth }) => {
  const { push } = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, { email, password }) => {
      if (!err) {
        onAuth(email, password);
      }

      push("/");
    });
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
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Пожалуйста введите почту!" }]
            })(
              <Input
                prefix={
                  <Icon type='mail' style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder='Почта'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Пожалуйста введите пароль!" }]
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type='password'
                placeholder='Пароль'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Запомнить меня</Checkbox>)}
            <Link className='login-form-forgot' to='/reset'>
              Восстановить пароль
            </Link>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Войти
            </Button>
            Или <Link to='/register'>Зарегистрироваться!</Link>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

Login.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    isAuth: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(authLogin(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
