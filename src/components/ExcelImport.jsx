import { Col, Image, message } from "antd";
import ExcelJS from "exceljs";
import React from "react";

/////////////////////////////////////////////////////////////////
// ************************* Example ****************************
{
  /* <ExcelImport oriData={oriData} setOriData={setOriData} /> */
}
/////////////////////////////////////////////////////////////////
// ********************* Function Guide *************************
// handleDrop()          -Handle Drop Components
// readExcelFile()       -Read Excel File
/////////////////////////////////////////////////////////////////

function ExcelImport({ oriData, setOriData }) {
  const [messageApi, contextHolder] = message.useMessage();

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // console.log(files[0].type);

    const isExcel =
      files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      files[0].type === "application/vnd.ms-excel" ||
      files[0].name.endsWith(".xls") ||
      files[0].name.endsWith(".xlsx");

    if (!isExcel) {
      messageApi.error("Please upload correct excel");
      return;
    }

    if (files.length > 1) {
      messageApi.error("Only handle 1 excel file each time.");
      return;
    }
    const file = files[0];
    readExcelFile(file);
  };

  const readExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const buffer = e.target.result;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
      const worksheet = workbook.getWorksheet(1);
      const jsonData = [];
      worksheet.eachRow((row) => {
        const rowData = [];
        row.eachCell((cell) => {
          rowData.push(cell.value);
        });
        jsonData.push(rowData);
      });
      setOriData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <Col
      span={24}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{
        border: "2px dashed #bbb",
        padding: "50px",
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: 10,
      }}
    >
      {contextHolder}
      {!oriData && "Drop Excel file here"}
      {oriData && <Image width={100} preview={false} src="excellogo.png" />}
    </Col>
  );
}

export default ExcelImport;
