import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import "./App.css";

import axios from "axios";

import { Layout } from "antd";
import { Grid } from "react-flexbox-grid";

import CustomToolbar from "./components/layouts/CustomToolbar";
import OperationList from "./components/operations/OperationsList";
import CustomFooter from "./components/layouts/CustomFooter";
import CustomControls from "./components/layouts/CustomControls";

const App = () => {
  const { Content } = Layout;

  const [loading, setLoading] = useState(true);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("http://127.0.0.1:8000/api/operations/").then(res => {
      setOperations(res.data);
      setLoading(false);
    });
  }, []);

  const [isAlert, setAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  const fetchData = (method = "get", cotnent = "") => {
    setLoading(true);
    switch (method) {
      case "get":
        axios.get("http://127.0.0.1:8000/api/operations/").then(res => {
          setOperations(res.data);
          setLoading(false);
        });
        break;
      case "delete":
        axios
          .delete(`http://127.0.0.1:8000/api/operations/${cotnent}/`)
          .then(res => {
            setLoading(false);
            setAlert(true);
            setTypeAlert("success");
            setMessageAlert("Запись удалена.");

            fetchData();
          })
          .catch(err => {
            setLoading(false);
            setAlert(true);
            setTypeAlert("error");
            setMessageAlert(
              `Произошла ошибка ${err.message}! Повторите попытку позже.`
            );
            console.error("Ошибка:", err.message);
          });
        break;
      case "post":
        axios
          .post(`http://127.0.0.1:8000/api/operations/`, {
            credit: cotnent.credit,
            removeFromAmount: true,
            category: cotnent.category,
            wallet: cotnent.wallet,
            created_at: cotnent.created_at
          })
          .then(res => {
            setLoading(false);
            setAlert(true);
            setTypeAlert("success");
            setMessageAlert("Запись создана.");

            fetchData();
          })
          .catch(err => {
            setLoading(false);
            setAlert(true);
            setTypeAlert("error");
            setMessageAlert(
              `Произошла ошибка ${err.message}! Повторите попытку позже.`
            );
            console.error("Ошибка:", err.message);
          });
        break;
      case "put":
        axios
          .put(`http://127.0.0.1:8000/api/operations/${cotnent.id}/`, {
            credit: cotnent.credit,
            removeFromAmount: true,
            category: cotnent.category,
            wallet: cotnent.wallet,
            created_at: cotnent.created_at
          })
          .then(res => {
            setLoading(false);
            setAlert(true);
            setTypeAlert("success");
            setMessageAlert("Запись обновлена.");

            fetchData();
          })
          .catch(err => {
            setLoading(false);
            setAlert(true);
            setTypeAlert("error");
            setMessageAlert(
              `Произошла ошибка ${err.message}! Повторите попытку позже.`
            );
            console.error("Ошибка:", err.message);
          });
        break;

      default:
        setLoading(false);
        setAlert(true);
        setTypeAlert("error");
        setMessageAlert("Опреация не найдена!");
        console.error("Ошибка:", "Опреация не найдена!");
        break;
    }

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  return (
    <Layout className='layout'>
      <CustomToolbar />
      <Content
        style={{ marginBottom: "70px", padding: "25px 0", minHeight: "100vh" }}
      >
        <Grid>
          <CustomControls fetchData={fetchData} />
          <OperationList
            setAlert={setAlert}
            setTypeAlert={setTypeAlert}
            setMessageAlert={setMessageAlert}
            fetchData={fetchData}
            loading={loading}
            setLoading={setLoading}
            operations={operations}
            setOperations={setOperations}
          />
        </Grid>
      </Content>
      <CustomFooter
        isAlert={isAlert}
        typeAlert={typeAlert}
        messageAlert={messageAlert}
      />
    </Layout>
  );
};
export default App;
