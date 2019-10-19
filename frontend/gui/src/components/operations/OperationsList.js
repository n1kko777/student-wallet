import React, { useState } from "react";
import { Row } from "react-flexbox-grid";
import PropTypes from "prop-types";

import { Card, Skeleton } from "antd";
import { Col } from "react-flexbox-grid";

import axios from "axios";

import UpdateOperation from "../operations/UpdateOperation";

import OperationItem from "./OperationItem";

const OperationsList = ({ fetchData, loading, setLoading, operations }) => {
  const [isModalCreate, setModalCreate] = useState(false);
  const [operation, setoperation] = useState({});

  const [id, setId] = useState(0);

  const handleCancel = () => {
    setModalCreate(false);
  };

  const handleSubmit = () => {
    setModalCreate(false);
  };

  const showEditModal = id => {
    setId(id);
    axios.get(`http://127.0.0.1:8000/api/operations/${id}/`).then(res => {
      setoperation(res.data);
    });
    setModalCreate(true);
  };

  const onDelete = id => {
    fetchData("delete", id);
  };

  const { Meta } = Card;

  const cardPreview = (
    <Col xs={12} sm={6} md={4}>
      <Card style={{ marginBottom: "20px" }} bordered={false}>
        <Skeleton loading={loading} avatar active>
          <Meta avatar='' title='' description='' />
        </Skeleton>
      </Card>
    </Col>
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
    <>
      <UpdateOperation
        id={id}
        operation={operation}
        visible={isModalCreate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        fetchData={fetchData}
        setLoading={setLoading}
      />
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
              setLoading={setLoading}
              showEditModal={showEditModal}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p style={{ width: "100%", textAlign: "center" }}>Список пуст.</p>
        )}
      </Row>
    </>
  );
};

OperationsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  operations: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired
};

export default OperationsList;
