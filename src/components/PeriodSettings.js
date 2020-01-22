import React from "react";
import { Form, Select, Button, DatePicker, message } from "antd";
import { Row, Col } from "react-flexbox-grid";

import locale from "antd/es/date-picker/locale/ru_RU";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updatePeriod } from "../store/actions/operations";

const PeriodSettings = ({ form, updatePeriod, period, period_start }) => {
  const { Option } = Select;
  const { getFieldDecorator } = form;

  const configStartDate = {
    initialValue: period_start,
    rules: [
      {
        type: "object",
        required: true,
        message: "Выберите дату начала периода!"
      }
    ]
  };

  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        period_start: fieldsValue["period_start"]
      };

      try {
        updatePeriod(values.period, values.period_start);
        localStorage.setItem("periodData", JSON.stringify(values));
        message.success("Период обновлен.");
      } catch (error) {
        message.error("Что-то пошло не так...");
      }
    });
  };

  return (
    <Row between={"xs"}>
      <Col xs={12} sm={6}>
        <Form
          layout="horizontal"
          style={{ width: "100%" }}
          onSubmit={handleSubmit}
        >
          <Form.Item label="Период" hasFeedback>
            {getFieldDecorator("period", {
              initialValue: period,
              rules: [
                {
                  required: true,
                  message: "Укажите промежуток отчетности."
                }
              ]
            })(
              <Select placeholder="Выберите промежуток отчетности">
                <Option value="Неделя">Неделя</Option>
                <Option value="Две недели">Две недели</Option>
                <Option value="Четыре недели">Четыре недели</Option>
                <Option value="Месяц">Месяц</Option>
                <Option value="Квартал">Квартал</Option>
                <Option value="Год">Год</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item label="Начало">
            {getFieldDecorator(
              "period_start",
              configStartDate
            )(
              <DatePicker
                style={{ width: "100%" }}
                format="DD.MM.YYYY"
                //   value={day_start}
                placeholder="Начало периода"
                locale={locale}
                //   onChange={onStartChange}
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Изменить
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

PeriodSettings.propTypes = {
  form: PropTypes.object.isRequired,
  updatePeriod: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  period_start: PropTypes.object.isRequired
};

const WrappedPeriodSettings = Form.create()(PeriodSettings);

const mapStateToProps = ({ operations }) => ({
  period: operations.period,
  period_start: operations.period_start
});

const mapDispatchToProps = dispatch => ({
  updatePeriod: (period, period_start) =>
    dispatch(updatePeriod(period, period_start))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedPeriodSettings);
