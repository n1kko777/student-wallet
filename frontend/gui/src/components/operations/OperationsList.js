import React from "react";
import { Row } from "react-flexbox-grid";
import PropTypes from "prop-types";

import OperationItem from "./OperationItem";

// const OperationsList = ({ setAlert, setTypeAlert, setMessageAlert }) => {
const OperationsList = ({
  fetchData,
  loading,
  setLoading,
  operations,
  setOperations
}) => {
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
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  operations: PropTypes.array.isRequired,
  setOperations: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired
};

export default OperationsList;
