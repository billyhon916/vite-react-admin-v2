import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Form, Row, Space, Table, theme } from "antd";
import { useEffect, useState } from "react";

const queryString = (values) => {
  const searchParams = new URLSearchParams();

  // Handle all form values
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      // Handle date range
      if (key === "created_at" && Array.isArray(value)) {
        searchParams.append("created_at", value[0].startOf("day").unix());
        searchParams.append("created_at", value[1].endOf("day").unix());
      } else {
        searchParams.append(key, value);
      }
    }
  });

  return searchParams.toString();
};

function DataTable({
  size = "small",
  instance,
  uri,
  filters = [],
  filtersInitialValues = {},
  filtersExtra,
  tableColumns = [],
  tableBordered,
  tableRowSelection,
}) {
  const { token } = theme.useToken();
  const [elapsed, setElapsed] = useState(0.0);
  const [searchParams, setSearchParams] = useState({
    ...filtersInitialValues,
    page: 1,
    size: 30,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 30,
    total: 1,
  });

  const query = useQuery({
    queryKey: ["data-table", uri],
    queryFn: () => {
      return instance.get(`${uri}?${queryString(searchParams)}`).then((res) => {
        setElapsed(parseFloat((res._elapsed_ms / 1000).toFixed(4)));
        setPagination(res.payload.pagination);
        return res.payload.data;
      });
    },
    enabled: false,
  });

  const onFinish = (values) => {
    setSearchParams({
      ...values,
      page: 1, // Reset to first page when search changes
    });
  };

  useEffect(() => {
    query.refetch();
  }, [searchParams]);

  return (
    <Row gutter={[token.padding, token.padding]}>
      {filters.length > 0 && (
        <Col span={24}>
          <Card title="Filters" size={size} extra={filtersExtra}>
            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={filtersInitialValues}
            >
              <Row gutter={[token.padding, token.padding]}>
                {filters.map((item, k) => {
                  return (
                    <Col key={k} span={6}>
                      {item}
                    </Col>
                  );
                })}
                <Col span={24}>
                  <Form.Item
                    style={{
                      justifyItems: "end",
                    }}
                  >
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SearchOutlined />}
                      >
                        Search
                      </Button>
                      <Button icon={<ClearOutlined />} htmlType="reset">
                        Reset
                      </Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      )}
      <Col span={24}>
        <Table
          loading={query.isFetching}
          size={size}
          bordered={tableBordered}
          rowKey={"id"}
          scroll={{
            x: true,
          }}
          sticky
          rowSelection={tableRowSelection}
          columns={tableColumns}
          dataSource={query.data}
          pagination={{
            position: ["topRight", "bottomRight"],
            showSizeChanger: true,
            pageSizeOptions: [30, 100, 500, 1000],
            onShowSizeChange: (current, size) => {
              setSearchParams((c) => ({
                ...c,
                size,
              }));
            },
            size: "small",
            pageSize: pagination.pageSize,
            total: pagination.total,
            showTotal: () => {
              return `Total ${pagination.total} records in ${elapsed} seconds`;
            },
            onChange: (page) => {
              setSearchParams((c) => ({
                ...c,
                page,
              }));
            },
          }}
        />
      </Col>
    </Row>
  );
}

export default DataTable;
