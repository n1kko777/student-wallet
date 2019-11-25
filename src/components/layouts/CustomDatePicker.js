// moment(each.date).isBetween(last7DayStart, yesterdayEndOfRange) ;

import React, { useState } from "react";
import locale from "antd/es/date-picker/locale/ru_RU";

import { DatePicker } from "antd";
import { Row, Col } from "react-flexbox-grid";
import moment from "moment";

const CustomDatePicker = () => {
  const [startValue, setStartValue] = useState(moment().isoWeekday(1));
  const [endValue, setEndValue] = useState(moment().isoWeekday(7));
  const [endOpen, setEndOpen] = useState(false);

  const disabledEndDate = endValue => {
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  const onStartChange = value => {
    setStartValue(value);
  };

  const onEndChange = value => {
    setEndValue(value);
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setEndOpen(true);
    }
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
          value={startValue}
          placeholder="Начало периода"
          locale={locale}
          onChange={onStartChange}
          onOpenChange={handleStartOpenChange}
        />
      </Col>
      <Col xs={6}>
        <DatePicker
          style={{ width: "100%" }}
          disabledDate={disabledEndDate}
          format="DD.MM.YYYY"
          value={endValue}
          placeholder="Конец периода"
          locale={locale}
          onChange={onEndChange}
          open={endOpen}
          onOpenChange={handleEndOpenChange}
        />
      </Col>
    </Row>
  );

  // const onChange = (dates, dateStrings) => {
  //   console.log("From: ", dates[0], ", to: ", dates[1]);
  //   console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  // };

  // return (
  //   <RangePicker
  //     defaultValue={[moment().startOf("week"), moment().endOf("week")]}
  //     ranges={{
  //       Сегодня: [moment(), moment()],
  //       "Текущая неделя": [moment().startOf("week"), moment().endOf("week")],
  //       "Текущий месяц": [moment().startOf("month"), moment().endOf("month")]
  //     }}
  //     style={{ width: "100%", fontSize: "16px" }}
  //     locale={locale}
  //     onChange={onChange}
  //   />
  // );
};

export default CustomDatePicker;
