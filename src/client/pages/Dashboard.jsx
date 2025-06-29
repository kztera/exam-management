import React from "react";
import { Row, Col, Typography, Card } from "antd";

const Dashboard = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={2}>Dashboard</Typography.Title>
      </Col>
      <Col span={8}>
        <Card title="Users" bordered={false}>
          <Typography.Text>Total Users: 120</Typography.Text>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Projects" bordered={false}>
          <Typography.Text>Active Projects: 8</Typography.Text>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Tasks" bordered={false}>
          <Typography.Text>Open Tasks: 34</Typography.Text>
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;