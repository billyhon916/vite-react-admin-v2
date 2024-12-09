import { Result, theme } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import SettingsPage from "../pages/SettingsPage";

const instance = axios.create({
  timeout: 15000,
});

instance.interceptors.request.use((cfg) => {
  return cfg;
});

instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return new Promise.reject(err);
  }
);

const defaultTheme = {
  token: {
    fontFamily: "'IBM Plex Sans',Inter",
    fontSize: 12,
    padding: 16,
  },
  algorithm: [theme.darkAlgorithm],
};

const NAVIGATION = [
  {
    path: "/",
    label: "Home",
    //   icon: <HomeOutlined />,
    element: <></>,
  },
  {
    path: "/payments",
    label: "Payments",
    //   icon: <DollarCircleOutlined />,
    element: <></>,
  },
  {
    path: "/settlements",
    label: "Settlements",
    //   icon: <BankOutlined />,
    element: <></>,
  },
  {
    path: "/settings",
    label: "Settings",
    //   icon: <SettingOutlined />,
    element: <SettingsPage />,
  },
  {
    path: "*",
    element: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, page not found"
        extra={<Link to="/">Back Home</Link>}
      />
    ),
  },
];

const MENU_ITEMS = NAVIGATION.filter((item) => item.label);

export { instance, defaultTheme, NAVIGATION, MENU_ITEMS };
