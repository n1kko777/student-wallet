import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "./App.css";

import { connect } from "react-redux";
import { authCheckState } from "./store/actions/auth";

import { Layout } from "antd";
import { Grid } from "react-flexbox-grid";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Feed from "./components/pages/Feed";
import { About } from "./components/pages/About";
import { Settings } from "./components/pages/Settings";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Reports from "./components/pages/Reports";
import ResetPass from "./components/pages/ResetPass";
import PageNotFound from "./components/pages/PageNotFound";

import CustomToolbar from "./components/layouts/CustomToolbar";
import CustomFooter from "./components/layouts/CustomFooter";

import PropTypes from "prop-types";

const App = ({ isAuth, onTryAuthSignUp }) => {
  useEffect(() => {
    onTryAuthSignUp();
    // eslint-disable-next-line
  }, []);

  const { Content } = Layout;

  return (
    <Router>
      <Layout className="layout">
        <CustomToolbar />
        <Content
          style={{
            marginBottom: "70px",
            padding: "25px 0",
            minHeight: "100vh"
          }}
        >
          <Grid>
            <Switch>
              <Route
                exact
                path="/"
                component={() => (isAuth ? <Redirect to="/feed" /> : <Login />)}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/accounts/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/reset" component={ResetPass} />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/feed"
                render={props =>
                  isAuth ? <Feed {...props} /> : <Redirect to="/login" />
                }
              />
              <Route
                exact
                path="/settings"
                render={props =>
                  isAuth ? <Settings /> : <Redirect to="/login" />
                }
              />
              <Route
                exact
                path="/reports"
                render={props =>
                  isAuth ? <Reports /> : <Redirect to="/login" />
                }
              />
              <Route component={PageNotFound} />
            </Switch>
          </Grid>
        </Content>
        <CustomFooter />
      </Layout>
    </Router>
  );
};

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  onTryAuthSignUp: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuth: typeof auth.user["token"] !== "undefined"
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAuthSignUp: () => dispatch(authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
