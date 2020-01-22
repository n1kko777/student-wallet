import React from "react";
import { Form, Input, Icon, Button, message } from "antd";
import axios from "axios";
import { url } from "../../store/constants";

const ResetPass = ({ form }) => {
  const { getFieldDecorator } = form;
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, { email }) => {
      if (!err) {
        axios
          .post(
            `${url}/rest-auth/password/reset/`,
            { email },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(res => {
            const { detail } = res.data;

            message.success(`${detail}`);
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              const keys = [];

              for (const k in error.response.data) keys.push(k);

              message.error(
                `Код ошибки: ${error.response.status}. ${
                  error.response.data[keys[0]]
                } Повторите попытку позже.`,
                10
              );
            } else if (error.request) {
              // The request was made but no response was received
              message.error(
                "Не удалось соединиться с сервером. Повторите попытку позже.",
                10
              );
            } else {
              // Something happened in setting up the request that triggered an Error
              message.error(
                "Что-то пошло не так... Повторите попытку позже.",
                10
              );
            }
          });

        form.resetFields();
      }
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="login-form"
      style={{ maxWidth: "590px" }}
    >
      <h1>Восстановление пароля</h1>
      <p>
        Забыли пароль? Введите свой адрес электронной почты ниже, и мы вышлем
        вам инструкцию, как установить новый пароль.
      </p>
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
            type="email"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="secondary"
          htmlType="submit"
          className="login-form-button"
        >
          Восстановить мой пароль
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedResetPass = Form.create()(ResetPass);

export default WrappedResetPass;
