import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";

import { Layout } from "antd";
import { Grid } from "react-flexbox-grid";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "./components/pages/Home";
import Feed from "./components/pages/Feed";
import Login from "./components/pages/Login";
import PageNotFound from "./components/pages/PageNotFound";

import CustomToolbar from "./components/layouts/CustomToolbar";
import CustomFooter from "./components/layouts/CustomFooter";

const App = () => {
  const { Content } = Layout;

  const [isAuth, setAuth] = useState(true);

  const [loading, setLoading] = useState(true);
  const [operations, setOperations] = useState([]);

  const [isAlert, setAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  return (
    <Router>
      <Layout className='layout'>
        <CustomToolbar isAuth={isAuth} setAuth={setAuth} />
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
                path='/'
                component={() => (isAuth ? <Redirect to='/feed' /> : Home)}
              />
              <Route exact path='/home' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/about' />
              <Route
                exact
                path='/feed'
                render={props =>
                  isAuth ? (
                    <Feed
                      loading={loading}
                      setLoading={setLoading}
                      operations={operations}
                      setOperations={setOperations}
                      setAlert={setAlert}
                      setTypeAlert={setTypeAlert}
                      setMessageAlert={setMessageAlert}
                      {...props}
                    />
                  ) : (
                    <Redirect to='/login' />
                  )
                }
              />
              <Route exact path='/settings' />
              <Route exact path='/reports' />
              <Route component={PageNotFound} />
            </Switch>
          </Grid>
        </Content>
        <CustomFooter
          isAlert={isAlert}
          typeAlert={typeAlert}
          messageAlert={messageAlert}
        />
      </Layout>
    </Router>
  );
};
export default App;
