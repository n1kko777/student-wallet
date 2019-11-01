import React, { useEffect } from "react";
import CustomControls from "../layouts/CustomControls";
import OperationList from "../operations/OperationsList";

import axios from "axios";
import { connect } from "react-redux";

import PropTypes from "prop-types";

const Feed = ({
  token,
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
    axios
      .get("http://127.0.0.1:8000/api/v1/operations/", {
        headers: {
          Authorization: "Token " + token
        }
      })
      .then(res => {
        setOperations(res.data);
        setLoading(false);
      });
  }, []);

  const fetchData = (method = "get", cotnent = "") => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Token " + token
    };

    setLoading(true);
    switch (method) {
      case "get":
        axios
          .get("http://127.0.0.1:8000/api/v1/operations/", {
            headers: headers
          })
          .then(res => {
            setOperations(res.data);
            setLoading(false);
          });
        break;
      case "delete":
        axios
          .delete(`http://127.0.0.1:8000/api/v1/operations/${cotnent}/`, {
            headers: headers
          })
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
          .post(
            `http://127.0.0.1:8000/api/v1/operations/`,
            {
              credit: cotnent.credit,
              removeFromAmount: true,
              category: cotnent.category,
              wallet: cotnent.wallet,
              created_at: cotnent.created_at,
              owner: 1
            },
            {
              headers: headers
            }
          )
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
            setTypeAlert("error", 5000);
            setMessageAlert(
              `Произошла ошибка ${err.message}! Повторите попытку позже.`
            );
            console.error("Ошибка:", err.message);
          });
        break;
      case "put":
        axios
          .put(
            `http://127.0.0.1:8000/api/v1/operations/${cotnent.id}/`,
            {
              credit: cotnent.credit,
              removeFromAmount: true,
              category: cotnent.category,
              wallet: cotnent.wallet,
              created_at: cotnent.created_at,
              owner: 1
            },
            {
              headers: headers
            }
          )
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
  token: PropTypes.string.isRequired,
  user_amount: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  operations: PropTypes.array.isRequired,
  setOperations: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setTypeAlert: PropTypes.func.isRequired,
  setMessageAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  token: state.user.token
});

export default connect(mapStateToProps)(Feed);
