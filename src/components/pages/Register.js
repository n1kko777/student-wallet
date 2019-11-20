import React, { useState } from "react";
import { Form, Input, Button, Icon, Spin, Popover, Checkbox } from "antd";

import { connect } from "react-redux";
import { authSignUp } from "../../store/actions/auth";

import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const Register = ({ form, onRegister, loading }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [passRule, setPassRule] = useState(false);

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
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/;

    if (reg.test(value) && value.length > 7) {
      form.validateFields(["confirm"], { force: true });
      setPassRule(false);
      callback();
    } else {
      setPassRule(true);
    }

    callback("Неверный формат пароля");
  };

  const { getFieldDecorator } = form;

  const antIcon = <Icon type="loading" style={{ fontSize: 32 }} spin />;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <Form onSubmit={handleSubmit} className="login-form">
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
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Ваш логин"
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
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Почта"
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(
              <Input.Password
                onBlur={() => setPassRule(false)}
                onFocus={() => setPassRule(true)}
                prefix={
                  <Popover
                    title="Требования к паролю"
                    visible={passRule}
                    content={
                      <div>
                        <ul style={{ paddingLeft: "18px" }}>
                          <li>Длина больше 8 символов</li>
                          <li>Хотя бы одна маленькая буква</li>
                          <li>Хотя бы одна заглавная</li>
                          <li>Хотя бы одна цифра</li>
                          <li>Разрешены только буквы и цифры</li>
                        </ul>
                      </div>
                    }
                  >
                    <Icon
                      type="info-circle"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  </Popover>
                }
                placeholder="Пароль"
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
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Подтвердите пароль"
                onBlur={handleConfirmBlur}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("agreement", {
              rules: [
                {
                  required: true,
                  message: "Необходимо принять пользовательское соглашение."
                }
              ],
              valuePropName: "checked"
            })(
              <Checkbox>
                Я прочитал(а) и принимаю условия{" "}
                <Link to="">пользовательского соглашения</Link>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Зарегистрироваться
            </Button>
            Или <Link to="/login">Войти!</Link>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

const WrappedRegistrationForm = Form.create({ name: "register" })(Register);

Register.propTypes = {
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onRegister: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return {
    loading: auth.loading
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
