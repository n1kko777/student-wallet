import React from "react";
import { Menu, Dropdown, Icon } from "antd";

import { Link, useLocation } from "react-router-dom";

import PropTypes from "prop-types";

const MainMenu = ({ isAuth, setAuth }) => {
  const { pathname } = useLocation();

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

  if (
    isAuth &&
    (pathname === "/feed" ||
      pathname === "/settings" ||
      pathname === "/reports")
  ) {
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

MainMenu.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  setAuth: PropTypes.func.isRequired
};

export default MainMenu;
