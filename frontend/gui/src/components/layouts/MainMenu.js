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
    <Menu>
      <Menu.Item style={{ fontSize: "14px" }}>
        <Link rel='noopener noreferrer' to='/login'>
          <Icon type='login' /> Войти
        </Link>
      </Menu.Item>
      <Menu.Item style={{ fontSize: "14px" }}>
        <Link rel='noopener noreferrer' to='/about'>
          <Icon type='info' /> О приложении
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={isAuth ? authUser : guestUser}
      placement='bottomRight'
      trigger={["click"]}
    >
      <Icon
        type={isAuth ? "setting" : "menu"}
        style={{ cursor: "pointer", color: "#fff", fontSize: "24px" }}
      />
    </Dropdown>
  );
};

export default MainMenu;
