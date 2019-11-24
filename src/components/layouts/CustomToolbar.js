import React, { useState } from "react";
import { Layout, Typography, Select, Icon, Divider } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Link, useLocation } from "react-router-dom";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import OperationTitle from "../operations/OperationTitle";
import MainMenu from "./MainMenu";

import CreateWallet from "../wallets/CreateWallet";

const CustomToolbar = ({ isAuth, user_amount, userLoading, wallets }) => {
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

  return (
    <>
      <CreateWallet
        visible={isModalCreate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <Header
        style={{
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className="header" style={{ width: "100%" }}>
          <Grid>
            <Row middle="xs" between="xs">
              <Col xs={isAuth ? 9 : 3} sm={isAuth ? 6 : 3} md={4} lg={3}>
                {pathname === "/feed" ? (
                  <Select
                    defaultValue="main"
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
                          <Icon type="plus" /> Добавить кошелек
                        </div>
                      </div>
                    )}
                  >
                    <Option value="main">
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
                    </Option>

                    {wallets !== null &&
                      wallets.map(wallet => (
                        <Option key={wallet.id} value={wallet.wallet_name}>
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
  wallets: PropTypes.array
};

const mapStateToProps = ({ auth, user }) => {
  return {
    isAuth: typeof auth.user["token"] !== "undefined",
    wallets: user.user.wallets,
    user_amount: user.user.user_amount,
    userLoading: user.loading
  };
};

export default connect(mapStateToProps)(CustomToolbar);
