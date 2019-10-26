import React, { useEffect } from "react";
import CustomControls from "../layouts/CustomControls";
import OperationList from "../operations/OperationsList";

import axios from "axios";

import PropTypes from "prop-types";

const Feed = ({
  loading,
  setLoading,
  operations,
  setOperations,
  setAlert,
  setTypeAlert,
  setMessageAlert
}) => {
  useEffect(() => {
    setLoading(true);
    axios.get("http://127.0.0.1:8000/api/operations/").then(res => {
      setOperations(res.data);
      setLoading(false);
    });
  }, []);

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
            operation_price: cotnent.operation_price,
            operation_type: true,
            category_id: cotnent.category_id,
            wallet_id: cotnent.wallet_id,
            operation_date: cotnent.operation_date
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
            operation_price: cotnent.operation_price,
            operation_type: true,
            category_id: cotnent.category_id,
            wallet_id: cotnent.wallet_id,
            operation_date: cotnent.operation_date
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
    <>
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
    </>
  );
};

Feed.protoType = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  operations: PropTypes.array.isRequired,
  setOperations: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setTypeAlert: PropTypes.func.isRequired,
  setMessageAlert: PropTypes.func.isRequired
};

export default Feed;
