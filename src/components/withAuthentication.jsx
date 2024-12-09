import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  Layout,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { defaultTheme } from "../hooks/useEndeavour";
import { LoadingOutlined, LoginOutlined } from "@ant-design/icons";

const Container = ({ children, contentStyle }) => {
  return (
    <ConfigProvider theme={defaultTheme}>
      <Layout>
        <Layout.Content
          style={{
            minHeight: "100vh",
            ...contentStyle,
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};

function withAuthentication(WrappedComponent) {
  const authenticatedComponent = (props) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(false);

    const onFinish = (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setAuthenticated(true);
      }, 500);
    };

    useEffect(() => {
      const auth = () => {
        // check your response from server side
        setChecking(true);
        setTimeout(() => {
          setChecking(false);
        }, 500);
      };
      auth();
    }, []);

    if (checking) {
      return (
        <Container
          contentStyle={{
            justifyItems: "center",
            alignContent: "center",
          }}
        >
          <LoadingOutlined />
        </Container>
      );
    }

    if (!authenticated) {
      return (
        <Container>
          <Row
            justify="center"
            style={{
              minHeight: "100vh",
              alignItems: "center",
            }}
          >
            <Col span={8}>
              <Card title="Restricted Area">
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item>
                    <Input autoFocus placeholder="Username" />
                  </Form.Item>
                  <Form.Item>
                    <Input placeholder="Password" />
                  </Form.Item>
                  <Form.Item>
                    <Input placeholder="Google Authenticator" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      loading={loading}
                      type="primary"
                      block
                      icon={<LoginOutlined />}
                      htmlType="submit"
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </Card>{" "}
            </Col>
          </Row>
        </Container>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return authenticatedComponent;
}

export default withAuthentication;
