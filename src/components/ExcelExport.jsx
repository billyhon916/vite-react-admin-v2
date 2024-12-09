import { Button, message } from "antd";
import Excel from "exceljs/dist/exceljs";
import React, { useState } from "react";

////////////////////////////////////////////////////////
// ********************* Example ***********************
{
  /* <ExcelExport
    btnName="DBS"
    excelData={excelData}
    rowData={(data) => [
        data[2],
        data[1],
        data[3],
        data[4],
        data[5],
    ]}
    header={["Time", "Name", "Gender", "Content", "Content"]}
    fileName="Excel1"
/> */
}
////////////////////////////////////////////////////////
// ****************** Function Guide *******************
// handleExportExcel()          -Check Data is correct
// exportExec()                 -Generate the excel list
////////////////////////////////////////////////////////

function ExcelExport({ btnName, excelData, rowData, header, fileName }) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleExportExcel = async (data, rowDataFunc, headerName) => {
    setLoading(true);
    // await new Promise((r) => setTimeout(r, 500));
    if (data.length === 0) {
      messageApi.error("No data to export");
      setLoading(false);
      return;
    }

    // Set the header first
    const newHeader =
      headerName && headerName.length > 0 ? headerName : excelData[0];

    const processedData = data.map((row) => {
      return rowDataFunc(row);
    });

    // Export excel with the updated header
    exportExec(processedData, newHeader, fileName);
    setLoading(false);
  };

  const exportExec = (data, header, fileName) => {
    let workbook = new Excel.Workbook();
    let sheet = workbook.addWorksheet("List");
    sheet.properties.defaultRowHeight = 50;

    sheet.addRow(header);

    data.forEach((item) => {
      sheet.addRow(item);
    });

    // Page setup
    const rowHeight = 20;
    const columnWidth = 20;
    sheet.columns.forEach((column, index) => {
      column.width = columnWidth;
    });

    sheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell((cell) => {
        if (cell.font) cell.font = { ...cell.font };
        else cell.font = { name: "Times New Roman" };
      });

      if (!row.height) row.height = rowHeight;
    });

    // Export excel
    workbook.xlsx.writeBuffer().then((data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${fileName ? fileName : "Excel"}.xlsx`;
      document.body.appendChild(a);
      a.click();
    });
  };

  return (
    <Button
      loading={loading}
      onClick={() => {
        handleExportExcel(excelData, rowData, header);
      }}
    >
      {contextHolder}
      {btnName ? btnName : "Button"}
    </Button>
  );
}

export default ExcelExport;
