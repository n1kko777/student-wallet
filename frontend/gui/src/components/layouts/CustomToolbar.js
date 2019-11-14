import React from "react";
import { Layout, Typography, Select, Icon } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";

import { Link, useLocation } from "react-router-dom";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import OperationTitle from "../operations/OperationTitle";
import MainMenu from "./MainMenu";

const CustomToolbar = ({ isAuth, user_amount, userLoading, wallets }) => {
  const { Header } = Layout;
  const { Title } = Typography;
  const { Option } = Select;

  const { pathname } = useLocation();

  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <Grid>
        <Row middle="xs" between="xs">
          <Col xs={7} sm={5} md={4} lg={3}>
            {pathname === "/feed" ? (
              <Select
                defaultValue="main"
                className="select-title"
                dropdownClassName="select-title__option"
                loading={userLoading}
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
                      />
                    </Option>
                  ))}
              </Select>
            ) : (
              // <div className="amount">
              // <OperationTitle
              //   credit={
              //     isAuth && user_amount !== null && user_amount !== undefined
              //       ? user_amount.toString()
              //       : "0"
              //   }
              // />
              // </div>
              <Link to={isAuth ? "/feed" : "/"}>
                <Title style={{ color: "#fff", marginBottom: "0" }} level={3}>
                  StudWall
                </Title>
              </Link>
            )}
          </Col>
          <Col xs={2} sm={1}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <MainMenu />
            </div>
          </Col>
        </Row>
      </Grid>
    </Header>
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
