import React, { useState, useEffect } from "react";
import { Row } from "react-flexbox-grid";

import OperationItem from "./OperationItem";

import axios from "axios";

const OperationsList = () => {
  const [loading, setLoading] = useState(true);
  const [operations, setOperations] = useState([]);

  const cardPreview = <OperationItem
  credit=''
  loading={loading}
  category=""
  wallet=""
  removeFromAmount={true}
  created_at=''
/>;

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/").then(res => {
      setOperations(res.data);
      setLoading(false);
    });
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
            credit={elem.credit}
            category={elem.category}
            wallet={elem.wallet}
            removeFromAmount={elem.removeFromAmount}
            created_at={elem.created_at}
            loading={loading}
          />
        ))
      ) : (
        <p style={{ width: "100%", textAlign: "center" }}>Список пуст.</p>
      )}
    </Row>
  );
};

export default OperationsList;
