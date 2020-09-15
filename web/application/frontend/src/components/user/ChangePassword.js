import React, { useState } from "react";
import { Form, Input, Icon, Button, Spin, Popover } from "antd";
import { connect } from "react-redux";
import { resetUserPass } from "../../store/actions/user";

import PropTypes from "prop-types";

const ChangePassword = ({ form, loading, user, resetUserPass }) => {
  const { getFieldDecorator } = form;
  const [passRule, setPassRule] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        resetUserPass(values, user.id);
        form.resetFields();
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
      form.validateFields(["new_password"], { force: true });
      setPassRule(false);
      callback();
    } else {
      setPassRule(true);
    }

    callback("Неверный формат пароля");
  };

  const antIcon = <Icon type="loading" style={{ fontSize: 32 }} spin />;

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      {loading && <Spin indicator={antIcon} />}
      <Form.Item hasFeedback>
        {getFieldDecorator("old_password", {
          rules: [
            {
              required: true,
              message: "Поле обязательное для заполнения!"
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Текущий пароль"
          />
        )}
      </Form.Item>
      <Form.Item hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Поле обязательное для заполнения!"
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
                <Icon type="info-circle" style={{ color: "rgba(0,0,0,.25)" }} />
              </Popover>
            }
            placeholder="Новый пароль"
          />
        )}
      </Form.Item>
      <Form.Item hasFeedback>
        {getFieldDecorator("new_password", {
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
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Подтвердите новый пароль"
            onBlur={handleConfirmBlur}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="secondary"
          htmlType="submit"
          className="login-form-button"
        >
          Сменить пароль
        </Button>
      </Form.Item>
    </Form>
  );
};

ChangePassword.propTypes = {
  loading: PropTypes.bool,
  resetUserPass: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const WrappedUpdatePassword = Form.create()(ChangePassword);

const mapDispatchToProps = dispatch => ({
  resetUserPass: (userData, id) => dispatch(resetUserPass(userData, id))
});

const mapStateToProps = ({ user }) => ({
  user: user.user,
  loading: user.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUpdatePassword);
