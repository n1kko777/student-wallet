import React from "react";

import { Row, Col } from "react-flexbox-grid";

import { connect } from "react-redux";

import PropTypes from "prop-types";

import AddOperationButton from "../buttons/AddOperationButton";
import AddAmountButton from "../buttons/AddAmountButton";
import ChangeWalletButton from "../buttons/ChangeWalletButton";
import SearchButton from "../buttons/SearchButton";

const CustomControls = ({ isWallet, walletCount }) => {
  return (
    <div
      style={{
        margin: "0 0 25px"
      }}
    >
      <Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <AddOperationButton isWallet={isWallet} />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <AddAmountButton isWallet={isWallet} />
        </Col>
        {walletCount > 1 && (
          <Col xs={12} sm={6} md={4} lg={3}>
            <ChangeWalletButton />
          </Col>
        )}
        <Col xs={12} sm={6} md={4} lg={3}>
          <SearchButton />
        </Col>
      </Row>
    </div>
  );
};

CustomControls.propTypes = {
  isWallet: PropTypes.bool.isRequired,
  walletCount: PropTypes.number
};

const mapStateToProps = ({ user }) => ({
  isWallet: user.user.wallets !== null,
  walletCount: user.user.wallets !== null ? user.user.wallets.length : 0
});

export default connect(mapStateToProps)(CustomControls);
