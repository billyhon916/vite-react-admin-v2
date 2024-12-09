import { Col, Row, Table } from "antd";
import React from "react";
import DataTable from "../components/DataTable";
import { instance } from "../hooks/useConfig";

function HomePage() {
  return (
    <Row>
      <Col span={24}>
        <DataTable
          instance={instance}
          uri={`https://api.sampleapis.com/bitcoin/historical_prices`}
          tableBordered
          tableColumns={[
            {
              title: "Date",
              align: "center",
              render: (data) => {
                return data.Date;
              },
            },
            {
              title: "Price",
              align: "right",
              render: (data) => {
                return data.Price;
              },
            },
            {
              title: "Open",
              align: "right",
              render: (data) => {
                return data.Open;
              },
            },
            {
              title: "High",
              align: "right",
              render: (data) => {
                return data.High;
              },
            },
            {
              title: "Change Percent From Last Month",
              align: "right",
              render: (data) => {
                return data.ChangePercentFromLastMonth;
              },
            },
            {
              title: "Volume",
              align: "right",
              render: (data) => {
                return data.Volume;
              },
            },
          ]}
        />
      </Col>
    </Row>
  );
}

export default HomePage;
