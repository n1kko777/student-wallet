import React, { useState, useEffect } from "react";
import locale from "antd/es/date-picker/locale/ru_RU";

import { DatePicker } from "antd";
import { Row, Col } from "react-flexbox-grid";

import moment from "moment";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateFilterDate } from "../../store/actions/operations";

const CustomDatePicker = ({
  day_start,
  day_end,
  updateFilterDate,
  period,
  period_start
}) => {
  useEffect(() => {
    let currentPeriod;

    switch (period) {
      case "Неделя":
        currentPeriod = moment().day(period_start.format("DD.MM.YYYY"));
        updateFilterDate(currentPeriod, moment(currentPeriod).add(7, "d"));
        break;
      case "Две недели":
        currentPeriod = moment().day(period_start.format("DD.MM.YYYY"));
        updateFilterDate(currentPeriod, moment(currentPeriod).add(14, "d"));
        break;
      case "Четыре недели":
        currentPeriod = moment().day(period_start.format("DD.MM.YYYY"));
        updateFilterDate(currentPeriod, moment(currentPeriod).add(28, "d"));
        break;
      case "Месяц":
        currentPeriod = moment().date(period_start.format("DD"));
        updateFilterDate(currentPeriod, moment(currentPeriod).add(1, "M"));
        break;
      case "Квартал":
        currentPeriod = moment().date(period_start.format("DD"));
        updateFilterDate(currentPeriod, moment(currentPeriod).add(1, "Q"));
        break;
      case "Год":
        currentPeriod = moment().dayOfYear(period_start.format("DD.MM.YYYY"));
        updateFilterDate(period_start, moment(period_start).add(1, "y"));
        break;

      default:
        updateFilterDate(period_start, moment().endOf("month"));
        break;
    }
  }, [period, period_start, updateFilterDate]);

  const [endOpen, setEndOpen] = useState(false);

  const disabledEndDate = day_end => {
    if (!day_end || !day_start) {
      return false;
    }
    return day_end.valueOf() <= day_start.valueOf();
  };

  const onStartChange = value => {
    value === null
      ? updateFilterDate(moment().startOf("month"), day_end)
      : updateFilterDate(value.startOf("day"), day_end);
  };

  const onEndChange = value => {
    value === null
      ? updateFilterDate(day_start, moment().endOf("month"))
      : updateFilterDate(day_start, value.endOf("day"));
  };

  const handleEndOpenChange = open => {
    setEndOpen(open);
  };

  return (
    <Row>
      <Col xs={6}>
        <DatePicker
          style={{ width: "100%" }}
          format="DD.MM.YYYY"
          value={day_start}
          placeholder="Начало периода"
          locale={locale}
          onChange={onStartChange}
        />
      </Col>
      <Col xs={6}>
        <DatePicker
          style={{ width: "100%" }}
          disabledDate={disabledEndDate}
          format="DD.MM.YYYY"
          value={day_end}
          placeholder="Конец периода"
          locale={locale}
          onChange={onEndChange}
          open={endOpen}
          onOpenChange={handleEndOpenChange}
        />
      </Col>
    </Row>
  );
};

CustomDatePicker.propTypes = {
  day_start: PropTypes.object,
  day_end: PropTypes.object,
  updateFilterDate: PropTypes.func.isRequired,
  period: PropTypes.string.isRequired,
  period_start: PropTypes.object
};

const mapStateToProps = ({ operations }) => ({
  day_start: operations.day_start,
  day_end: operations.day_end,
  period_start: operations.period_start,
  period: operations.period
});

const mapDispatchToProps = dispatch => ({
  updateFilterDate: (day_start, day_end) =>
    dispatch(updateFilterDate(day_start, day_end))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDatePicker);
