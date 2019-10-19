import React from "react";
import { Menu, Dropdown, Icon } from "antd";

const ProfileMenu = () => {
  const menu = (
    <Menu>
      <Menu.Item style={{ fontSize: "14px" }}>
        {/* eslint-disable-next-line */}
        <a target='_blank' rel='noopener noreferrer' href='#'>
          <Icon type='setting' /> Настройки
        </a>
      </Menu.Item>
      <Menu.Item style={{ fontSize: "14px" }}>
        {/* eslint-disable-next-line */}
        <a target='_blank' rel='noopener noreferrer' href='#'>
          <Icon type='form' /> Отчет
        </a>
      </Menu.Item>
      <Menu.Item style={{ fontSize: "14px" }}>
        {/* eslint-disable-next-line */}
        <a target='_blank' rel='noopener noreferrer' href='#'>
          <Icon type='logout' /> Выход
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement='bottomRight'>
      <Icon type='setting' style={{ color: "#fff", fontSize: "24px" }} />
    </Dropdown>
  );
};

export default ProfileMenu;
