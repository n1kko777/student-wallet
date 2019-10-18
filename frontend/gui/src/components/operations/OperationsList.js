import React, { useState, useEffect } from "react";
import { Row } from "react-flexbox-grid";
import PropTypes from "prop-types";

import OperationItem from "./OperationItem";

import axios from "axios";

const OperationsList = ({ setAlert, setTypeAlert, setMessageAlert }) => {
  const [loading, setLoading] = useState(true);
  const [operations, setOperations] = useState([]);

  const cardPreview = (
    <OperationItem
      id={-1}
      credit=''
      loading={loading}
      category=''
      wallet=''
      removeFromAmount={true}
      created_at=''
      fetchData={() => {}}
    />
  );

  const fetchData = (method = "get", cotnent = "") => {
    setLoading(false);
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
            setAlert(true);
            setTypeAlert("error");
            setMessageAlert(
              `Произошла ошибка ${err.message}! Повторите попытку позже.`
            );
            console.error("Ошибка:", err.message);
          });
        break;

      default:
        break;
    }

    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Row start='xs'>
        {cardPreview}
        {cardPreview}
        {cardPreview}
        {cardPreview}
      </Row>
    );
  }

  return (
    <Row middle='xs'>
      {operations.length > 0 ? (
        operations.map(elem => (
          <OperationItem
            key={elem.id}
            id={elem.id}
            credit={elem.credit}
            category={elem.category}
            wallet={elem.wallet}
            removeFromAmount={elem.removeFromAmount}
            created_at={elem.created_at}
            loading={loading}
            fetchData={fetchData}
          />
        ))
      ) : (
        <p style={{ width: "100%", textAlign: "center" }}>Список пуст.</p>
      )}
    </Row>
  );
};

OperationsList.propTypes = {
  setAlert: PropTypes.func.isRequired,
  setTypeAlert: PropTypes.func.isRequired,
  setMessageAlert: PropTypes.func.isRequired
};

export default OperationsList;
