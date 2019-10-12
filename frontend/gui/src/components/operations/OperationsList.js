import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";

import OperationItem from "./OperationItem";

import axios from "axios";

const OperationsList = () => {
  const [loading, setLoading] = useState(true);
  const [operations, setOperations] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/").then(res => {
      setOperations(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Grid fluid>
        <Row start='xs'>
          <Col xs={4}>
            <OperationItem credit='' title='' loading={loading} />
          </Col>
        </Row>
      </Grid>
    );
  }

  return (
    <Grid fluid>
      <Row middle='xs'>
        {operations.length > 0 ? (
          operations.map(elem => (
            <Col xs={4} key={elem.id}>
              <OperationItem
                credit={elem.credit}
                title={elem.credit}
                loading={loading}
              />
            </Col>
          ))
        ) : (
          <p style={{ width: "100%", textAlign: "center" }}>Список пуст.</p>
        )}
      </Row>
    </Grid>
  );
};

export default OperationsList;
