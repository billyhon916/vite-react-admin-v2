import { FontSizeOutlined } from "@ant-design/icons";
import { theme } from "antd";
import axios from "axios";

const defaultTheme = {
  token: {
    fontFamily: "'IBM Plex Sans',Inter",
    fontSize: 12,
    padding: 16,
  },
  algorithm: [theme.darkAlgorithm],
};

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

function useEndeavour() {
  return {};
}

export default useEndeavour;

export { defaultTheme, instance };
