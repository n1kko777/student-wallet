import React, { useState } from "react";
import { Menu, Dropdown, Icon } from "antd";

import { Link } from "react-router-dom";

const MainMenu = () => {
  const [isAuth, setAuth] = useState(false);

  const authUser = (
    <Menu>
      <Menu.Item style={{ fontSize: "14px" }}>
        <Link rel='noopener noreferrer' to='/settings'>
          <Icon type='setting' /> Настройки
        </Link>
      </Menu.Item>
      <Menu.Item style={{ fontSize: "14px" }}>
        <Link rel='noopener noreferrer' to='/reports'>
          <Icon type='form' /> Отчет
        </Link>
      </Menu.Item>
      <Menu.Item style={{ fontSize: "14px" }}>
        <Link rel='noopener noreferrer' to='/'>
          <Icon type='logout' /> Выход
        </Link>
      </Menu.Item>
    </Menu>
  );

  const guestUser = (
    <Menu
      mode='horizontal'
      theme='dark'
      style={{ lineHeight: "64px" }}
      selectable={false}
    >
      <Menu.Item>
        <Link
          style={{ fontSize: "14px" }}
          rel='noopener noreferrer'
          to='/login'
        >
          <Icon type='login' /> Войти
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          style={{ fontSize: "14px" }}
          rel='noopener noreferrer'
          to='/about'
        >
          <Icon type='info' /> О приложении
        </Link>
      </Menu.Item>
    </Menu>
  );

  if (isAuth) {
    return (
      <Dropdown overlay={authUser} placement='bottomRight' trigger={["click"]}>
        <Icon
          type={"setting"}
          style={{ cursor: "pointer", color: "#fff", fontSize: "24px" }}
        />
      </Dropdown>
    );
  } else {
    return guestUser;
  }
};

export default MainMenu;
