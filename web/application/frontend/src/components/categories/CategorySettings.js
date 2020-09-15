import React, { useState } from "react";
import { Table, Divider, Icon, Popconfirm } from "antd";

import { connect } from "react-redux";
import {
  deleteCategory,
  setCurrent,
  clearCurrent
} from "../../store/actions/categories";

import UpdateCategory from "./UpdateCategory";

import PropTypes from "prop-types";

const CategorySettings = ({
  categories,
  deleteCategory,
  setCurrent,
  clearCurrent
}) => {
  const { Column } = Table;
  const [isModalCreate, setModalCreate] = useState(false);

  const showModal = category => {
    setCurrent(category);
    setModalCreate(true);
  };

  const handleCancel = () => {
    setModalCreate(false);
    clearCurrent();
  };

  const handleSubmit = () => {
    setModalCreate(false);
    clearCurrent();
  };

  const data = categories.map(({ id, category_name, category_color }) => ({
    key: id,
    category_name,
    category_color
  }));

  const onDelete = category_id => deleteCategory(category_id);

  return (
    <>
      <UpdateCategory
        visible={isModalCreate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
      <Table
        className="display-table"
        dataSource={data}
        pagination={false}
        scroll={{ x: 350 }}
      >
        <Column
          title="Название"
          dataIndex="category_name"
          key="category_name"
        />
        <Column
          title="Цвет"
          dataIndex="category_color"
          key="category_color"
          render={(text, record) => (
            <span
              style={{
                display: "block",
                width: "15px",
                height: "15px",
                backgroundColor: `${record.category_color}`,
                border: "1px solid #595959"
              }}
            ></span>
          )}
        />
        <Column
          title="Действия"
          key="action"
          render={(text, record) => (
            <span>
              <Icon type="edit" key="edit" onClick={() => showModal(record)} />
              <Divider type="vertical" />
              <Popconfirm
                title="Удалить категорию?"
                okText="Да"
                cancelText="Нет"
                onConfirm={() => onDelete(record.key)}
              >
                <Icon type="delete" key="delete" />
              </Popconfirm>
            </span>
          )}
        />
      </Table>
    </>
  );
};

CategorySettings.propTypes = {
  categories: PropTypes.array.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = ({ user: { user } }) => ({
  categories: user.categories
});

const mapDispatchToProps = dispatch => ({
  deleteCategory: category_id => dispatch(deleteCategory(category_id)),
  setCurrent: category => dispatch(setCurrent(category)),
  clearCurrent: () => dispatch(clearCurrent())
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySettings);
