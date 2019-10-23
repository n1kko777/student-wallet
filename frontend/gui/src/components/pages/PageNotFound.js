import React from "react";
import { Result, Button } from "antd";

import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='К сожалению, страница, которую вы посетили, не существует.'
      extra={
        <Link to='/login'>
          <Button type='primary'>Вернуться домой</Button>
        </Link>
      }
    />
  );
};

export default PageNotFound;
