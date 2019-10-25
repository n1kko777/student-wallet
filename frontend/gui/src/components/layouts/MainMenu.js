import React from "react";
import { Menu, Dropdown, Icon } from "antd";

import { Link, useLocation } from "react-router-dom";

import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";

import PropTypes from "prop-types";

const MainMenu = ({ isAuth, onLogout, loading, error }) => {
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
      <Menu.Item style={{ fontSize: "14px" }} onClick={onLogout}>
        <Icon type='logout' /> Выход
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
  onLogout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isAuth: state.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);
