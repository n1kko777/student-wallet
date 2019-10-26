import React, { useState } from "react";
import { Row } from "react-flexbox-grid";
import PropTypes from "prop-types";

import { Card, Skeleton } from "antd";
import { Col } from "react-flexbox-grid";

import axios from "axios";

import UpdateOperation from "../operations/UpdateOperation";
import CopyOperation from "../operations/CopyOperation";

import OperationItem from "./OperationItem";

const OperationsList = ({ fetchData, loading, setLoading, operations }) => {
  const [isModalUpdate, setModalUpdate] = useState(false);
  const [isModalCopy, setModalCopy] = useState(false);
  const [operation, setoperation] = useState({});

  const [id, setId] = useState(0);

  const handleCancel = seModalElem => {
    seModalElem(false);
  };

  const handleSubmit = seModalElem => {
    seModalElem(false);
  };

  const showEditModal = id => {
    setId(id);
    axios.get(`http://127.0.0.1:8000/api/operations/${id}/`).then(res => {
      setoperation(res.data);
    });
    setModalUpdate(true);
  };

  const showCopyModal = id => {
    setId(id);
    axios.get(`http://127.0.0.1:8000/api/operations/${id}/`).then(res => {
      setoperation(res.data);
    });
    setModalCopy(true);
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
        visible={isModalUpdate}
        onSubmit={() => {
          handleSubmit(setModalUpdate);
        }}
        onCancel={() => {
          handleCancel(setModalUpdate);
        }}
        fetchData={fetchData}
        setLoading={setLoading}
      />
      <CopyOperation
        operation={operation}
        visible={isModalCopy}
        onSubmit={() => {
          handleSubmit(setModalCopy);
        }}
        onCancel={() => {
          handleCancel(setModalCopy);
        }}
        fetchData={fetchData}
        setLoading={setLoading}
      />
      <Row middle='xs'>
        {operations.length > 0 ? (
          operations.map(elem => (
            <OperationItem
              key={elem.id}
              id={elem.id}
              operation_price={elem.operation_price}
              category_id={elem.category_id}
              wallet_id={elem.wallet_id}
              operation_type={elem.operation_type}
              operation_date={elem.operation_date}
              loading={loading}
              fetchData={fetchData}
              setLoading={setLoading}
              showEditModal={showEditModal}
              showCopyModal={showCopyModal}
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
