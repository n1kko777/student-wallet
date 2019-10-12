import React from "react";
import locale from "antd/es/date-picker/locale/ru_RU";

import { DatePicker } from "antd";
import moment from "moment";

const CustomDatePicker = () => {
  const { RangePicker } = DatePicker;

  const onChange = (dates, dateStrings) => {
    console.log("From: ", dates[0], ", to: ", dates[1]);
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  };

  return (
    <RangePicker
      defaultValue={[moment().startOf("week"), moment().endOf("week")]}
      ranges={{
        Сегодня: [moment(), moment()],
        "Текущая неделя": [moment().startOf("week"), moment().endOf("week")],
        "Текущий месяц": [moment().startOf("month"), moment().endOf("month")]
      }}
      style={{ width: "100%" }}
      locale={locale}
      onChange={onChange}
    />
  );
};

export default CustomDatePicker;
