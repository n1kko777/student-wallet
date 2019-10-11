import React, { useState, useEffect } from "react";
import { Card, Layout, Skeleton, Icon } from "antd";
import { Grid, Row, Col } from "react-flexbox-grid";

import axios from "axios";

const CustomLayout = () => {
  const [loading, setLoading] = useState(true);
  const [operations, setOperations] = useState([]);
  const { Header, Footer, Content } = Layout;
  const { Meta } = Card;

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/").then(res => {
      setOperations(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Layout className='layout'>
      <Header style={{ paddingTop: "16px" }}>
        <Grid fluid>
          <Row middle='xs'>
            <Col xs={12} sm={3} md={2}>
              <div
                className='logo'
                style={{
                  width: "120px",
                  height: "31px",
                  background: "rgba(255, 255, 255, 0.2)"
                }}
              />
            </Col>
            <Col xs={6} sm={6} md={9} />
            <Col xs={6} sm={3} md={1}>
              <Icon type='menu' key='menu' className='humburger' />
            </Col>
          </Row>
        </Grid>
      </Header>
      <Content style={{ padding: "25px 50px", minHeight: "80vh" }}>
        <Grid fluid>
          <Row>
            {operations.length > 0 ? (
              operations.map(elem => (
                <Col xs={4} key={elem.id}>
                  <Card
                    bordered={false}
                    actions={[
                      <Icon type='copy' key='copy' />,
                      <Icon type='edit' key='edit' />,
                      <Icon type='delete' key='delete' />
                    ]}
                  >
                    <Skeleton loading={loading} avatar active>
                      <Meta
                        avatar={
                          <Icon type='up' key='up' style={{ color: "red" }} />
                        }
                        title={elem.credit}
                        description={elem.title}
                      />
                    </Skeleton>
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={8}>
                <Card title='Список операций пуст' bordered={false}></Card>
              </Col>
            )}
          </Row>
        </Grid>
      </Content>
      <Footer>
        <Grid fluid>Footer</Grid>
      </Footer>
    </Layout>
  );
};

export default CustomLayout;
