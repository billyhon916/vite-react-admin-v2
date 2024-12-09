import { App, ConfigProvider, Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Outlet, Route, Routes } from "react-router-dom";
import { MENU_ITEMS, NAVIGATION } from "./hooks/useConfig";
import { defaultTheme } from "./hooks/useEndeavour";

const createMenuItem = ({ path, label, icon }) => ({
  key: path,
  label: <Link to={path}>{label}</Link>,
  icon,
});

const MainLayout = () => {
  const { token } = theme.useToken();
  const [headerHeight, setHeaderHeight] = useState(64);

  useEffect(() => {
    setHeaderHeight(document.querySelector(".ant-layout-header").clientHeight);
  }, []);

  return (
    <Layout>
      <Layout.Header>Hello</Layout.Header>
      <Layout>
        <Layout hasSider>
          <Layout.Sider
            style={{
              overflow: "auto",
              position: "fixed",
              insetInlineStart: 0,
              top: headerHeight,
              bottom: 0,
            }}
          >
            <Menu theme="dark" items={MENU_ITEMS.map(createMenuItem)} />
          </Layout.Sider>
          <Layout>
            <Layout.Content
              style={{
                marginInlineStart: 200,
                padding: token.padding,
              }}
            >
              <Outlet />
            </Layout.Content>
            <Layout.Footer
              style={{
                marginInlineStart: 200,
              }}
            >
              Powered by ANKA
            </Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          element={
            <ConfigProvider theme={defaultTheme}>
              <App>
                <Layout>
                  <Outlet />
                </Layout>
              </App>
            </ConfigProvider>
          }
        >
          <Route element={<MainLayout />}>
            {NAVIGATION.map(
              ({ path, element }) =>
                element && <Route key={path} path={path} element={element} />
            )}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
