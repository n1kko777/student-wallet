import React, { useState, useEffect } from "react";
import { Grid, Row } from "react-flexbox-grid";

import OperationItem from "./OperationItem";

import axios from "axios";

const OperationsList = () => {
  const [loading, setLoading] = useState(true);
  const [operations, setOperations] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/").then(res => {
      setOperations(res.data);
      setLoading(false);
      console.log(res.data);
    });
  }, []);

  if (loading) {
    return (
      <Grid fluid>
        <Row start='xs'>
          <OperationItem credit='' title='' loading={loading} created_at='' />
        </Row>
      </Grid>
    );
  }

  return (
    <Grid>
      <Row middle='xs'>
        {operations.length > 0 ? (
          operations.map(elem => (
            <OperationItem
              key={elem.id}
              credit={elem.credit}
              title={elem.title}
              created_at={elem.created_at}
              loading={loading}
            />
          ))
        ) : (
          <p style={{ width: "100%", textAlign: "center" }}>Список пуст.</p>
        )}
      </Row>
    </Grid>
  );
};

export default OperationsList;
