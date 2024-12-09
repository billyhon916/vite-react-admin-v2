import { Col, Row } from "antd";
import React from "react";
import GenerateExcel from "../components/GenerateExcel";

function SettingsPage() {
  return (
    <Row>
      <Col span={24}>
        <GenerateExcel />
      </Col>
    </Row>
  );
}

export default SettingsPage;
