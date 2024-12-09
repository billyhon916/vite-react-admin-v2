import { Button, Card, Col, Image, message, Row, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import Excel, { S } from "exceljs/dist/exceljs";
import { Header } from "antd/es/layout/layout";
import ExcelImport from "./ExcelImport";
import ExcelExport from "./ExcelExport";

function GenerateExcel() {
  const [oriData, setOriData] = useState(null);
  const [excelData, setExcelData] = useState([]);

  const resetFunc = () => {
    setOriData(null);
    setExcelData([]);
  };

  useEffect(() => {
    if (!oriData) return;
    setExcelData(oriData.slice(1));
  }, [oriData]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="Import Excel">
          <Row>
            <ExcelImport oriData={oriData} setOriData={setOriData} />
            <Col span={20}>
              <Space style={{ marginTop: 10 }}>
                <ExcelExport
                  btnName="WCI"
                  excelData={excelData}
                  rowData={(data) => [
                    data[2] + " " + data[3],
                    data[4],
                    data[8],
                  ]}
                  header={["Column1", "Column2", "Column3"]}
                />
                <ExcelExport
                  btnName="DBS"
                  excelData={excelData}
                  rowData={(data) => [
                    data[2],
                    data[1],
                    data[3],
                    data[4],
                    data[5],
                  ]}
                  header={["Col2", "Col1", "Col3", "Col4", "Col5"]}
                />
              </Space>
            </Col>
            {oriData && (
              <Col span={4} style={{ marginTop: 10, textAlign: "right" }}>
                <Button onClick={() => resetFunc()} danger>
                  Reset
                </Button>
              </Col>
            )}
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default GenerateExcel;
