import React from "react";
import { Menu, Dropdown, Icon } from "antd";

import { Link, useLocation } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";

import PropTypes from "prop-types";

const MainMenu = ({ isAuth, onLogout }) => {
  const { pathname } = useLocation();
  const authUser = (
    <Menu className="main-menu">
      {pathname !== "/feed" && (
        <Menu.Item>
          <Link rel="noopener noreferrer" to="/feed">
            <Icon type="home" /> На главную
          </Link>
        </Menu.Item>
      )}
      {pathname !== "/settings" && (
        <Menu.Item>
          <Link rel="noopener noreferrer" to="/settings">
            <Icon type="setting" /> Настройки
          </Link>
        </Menu.Item>
      )}
      {pathname !== "/reports" && (
        <Menu.Item>
          <Link rel="noopener noreferrer" to="/reports">
            <Icon type="form" /> Отчет
          </Link>
        </Menu.Item>
      )}
      {pathname !== "/about" && (
        <Menu.Item>
          <Link rel="noopener noreferrer" to="/about">
            <Icon type="info" /> О приложении
          </Link>
        </Menu.Item>
      )}
      <Menu.Item onClick={onLogout}>
        <Link rel="noopener noreferrer" to="/">
          <Icon type="logout" /> Выход
        </Link>
      </Menu.Item>
    </Menu>
  );

  const guestUser = (
    <Menu
      mode="horizontal"
      theme="dark"
      style={{ lineHeight: "64px" }}
      selectable={false}
    >
      <Menu.Item>
        <Link
          style={{ fontSize: "14px" }}
          rel="noopener noreferrer"
          to="/login"
        >
          <Icon type="login" /> Войти
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          style={{ fontSize: "14px" }}
          rel="noopener noreferrer"
          to="/about"
        >
          <Icon type="info" /> О приложении
        </Link>
      </Menu.Item>
    </Menu>
  );

  if (isAuth) {
    return (
      <Dropdown overlay={authUser} placement="bottomRight" trigger={["click"]}>
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
  onLogout: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: typeof auth.user["token"] !== "undefined"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
