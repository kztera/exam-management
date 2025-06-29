import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Typography, Card } from "antd";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={2}>Dashboard 2</Typography.Title>
      </Col>
    </Row>
  );
};

export default Home;
