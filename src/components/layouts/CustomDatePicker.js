import React, { useState, useEffect } from "react";
import locale from "antd/es/date-picker/locale/ru_RU";

import { DatePicker } from "antd";
import { Row, Col } from "react-flexbox-grid";

import moment from "moment";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { updateFilterDate } from "../../store/actions/operations";

const CustomDatePicker = ({ day_start, day_end, updateFilterDate }) => {
  useEffect(() => {
    updateFilterDate(
      moment()
        .isoWeekday(1)
        .startOf("day"),
      moment()
        .isoWeekday(7)
        .endOf("day")
    );
  }, [updateFilterDate]);

  const [endOpen, setEndOpen] = useState(false);

  const disabledEndDate = day_end => {
    if (!day_end || !day_start) {
      return false;
    }
    return day_end.valueOf() <= day_start.valueOf();
  };

  const onStartChange = value => {
    value === null
      ? updateFilterDate(
          moment()
            .isoWeekday(1)
            .startOf("day"),
          day_end
        )
      : updateFilterDate(value.startOf("day"), day_end);
  };

  const onEndChange = value => {
    value === null
      ? updateFilterDate(
          day_start,
          moment()
            .isoWeekday(7)
            .endOf("day")
        )
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
  updateFilterDate: PropTypes.func.isRequired
};

const mapStateToProps = ({ operations }) => ({
  day_start: operations.day_start,
  day_end: operations.day_end
});

const mapDispatchToProps = dispatch => ({
  updateFilterDate: (day_start, day_end) =>
    dispatch(updateFilterDate(day_start, day_end))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDatePicker);
