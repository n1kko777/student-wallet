import React, { useState } from "react";
import { Layout, Typography, Select, Icon, Divider } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Link, useLocation } from "react-router-dom";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import OperationTitle from "../operations/OperationTitle";
import MainMenu from "./MainMenu";

import CreateWallet from "../wallets/CreateWallet";

import { setCurrent, clearCurrent } from "../../store/actions/wallets";

const CustomToolbar = ({
  isAuth,
  user_amount,
  userLoading,
  wallets,
  setCurrentWallet,
  clearCurrentWallet
}) => {
  const { Header } = Layout;
  const { Title } = Typography;
  const { Option } = Select;

  const { pathname } = useLocation();
  const [isModalCreate, setModalCreate] = useState(false);

  const showModal = () => {
    setModalCreate(true);
  };

  const handleCancel = () => {
    setModalCreate(false);
  };

  const handleSubmit = () => {
    setModalCreate(false);
  };

  const onChangeWallet = e => {
    e === "all"
      ? clearCurrentWallet()
      : setCurrentWallet(wallets.filter(wallet => wallet.id === e)[0]);
  };

  return (
    <>
      <CreateWallet
        visible={isModalCreate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <Header className="header">
        <div style={{ width: "100%" }}>
          <Grid>
            <Row middle="xs" between="xs">
              <Col xs={isAuth ? 9 : 3} sm={isAuth ? 6 : 3} md={4} lg={3}>
                {pathname === "/feed" || pathname === "/reports" ? (
                  <Select
                    defaultValue="all"
                    onChange={onChangeWallet}
                    className="select-title"
                    dropdownClassName="select-title__option"
                    loading={userLoading}
                    dropdownRender={menu => (
                      <div style={{ background: "#324454" }}>
                        {menu}
                        <Divider
                          style={{ margin: "4px 0", background: "#fff" }}
                        />
                        <div
                          onMouseDown={e => e.preventDefault()}
                          onClick={showModal}
                          className="select-title__add"
                        >
                          <Icon type="plus" /> Добавить счет
                        </div>
                      </div>
                    )}
                  >
                    <Option value="all">
                      <OperationTitle
                        credit={
                          isAuth &&
                          user_amount !== null &&
                          user_amount !== undefined
                            ? user_amount.toString()
                            : "0"
                        }
                        color={"#fff"}
                      />
                      <small>Баланс</small>
                    </Option>

                    {wallets !== null &&
                      wallets.map(wallet => (
                        <Option key={wallet.id} value={wallet.id}>
                          <OperationTitle
                            credit={
                              wallet.wallet_amount !== null
                                ? wallet.wallet_amount.toString()
                                : "0"
                            }
                            color={
                              wallet.wallet_color !== null
                                ? wallet.wallet_color.toString()
                                : ""
                            }
                          />
                          <small style={{ color: `${wallet.wallet_color}` }}>
                            {wallet.wallet_name}
                          </small>
                        </Option>
                      ))}
                  </Select>
                ) : (
                  <Link to={isAuth ? "/feed" : "/"}>
                    <Title
                      style={{ color: "#fff", marginBottom: "0" }}
                      level={3}
                    >
                      StudWall
                    </Title>
                  </Link>
                )}
              </Col>
              <Col xs={isAuth ? 3 : 8}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <MainMenu />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </Header>
    </>
  );
};

CustomToolbar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  user_amount: PropTypes.number,
  userLoading: PropTypes.bool.isRequired,
  wallets: PropTypes.array,
  setCurrentWallet: PropTypes.func.isRequired,
  clearCurrentWallet: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth, user }) => {
  return {
    isAuth: typeof auth.user["token"] !== "undefined",
    wallets: user.user.wallets,
    user_amount: user.user.user_amount,
    userLoading: user.loading
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentWallet: wallet => dispatch(setCurrent(wallet)),
  clearCurrentWallet: () => dispatch(clearCurrent())
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomToolbar);
