import React, { useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox, Spin } from "antd";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { authLogin, remindMe } from "../../store/actions/auth";

import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";

const Login = ({
  isAuth,
  isRemindMe,
  remindMe,
  onAuth,
  form,
  loading,
  error
}) => {
  useEffect(() => {
    if (isAuth) {
      push("/feed");
    }
  });

  const { push } = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, { username, password }) => {
      if (!err) {
        onAuth(username, password, isRemindMe);
      }
    });
  };

  const onChange = e => {
    remindMe(e.target.checked);
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
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Пожалуйста введите почту!" }]
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder='логин'
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
            {getFieldDecorator("remember")(
              <Checkbox checked={isRemindMe} onChange={onChange}>
                Запомнить меня
              </Checkbox>
            )}
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
  form: PropTypes.object.isRequired,
  isRemindMe: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  remindMe: PropTypes.func.isRequired,
  error: PropTypes.object
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: typeof auth.user["token"] !== "undefined",
    loading: auth.loading,
    error: auth.error,
    isRemindMe: auth.isRemindMe
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password, isRemindMe) =>
      dispatch(authLogin(username, password, isRemindMe)),
    remindMe: state => dispatch(remindMe(state))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
