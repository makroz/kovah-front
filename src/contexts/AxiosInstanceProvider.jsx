import axios from "axios";
import { createContext, useEffect, useRef } from "react";

export const AxiosContext = createContext({});
const AxiosInstanceProvider = ({
  config = {},
  interceptors = null,
  children,
}) => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";
  if (!config.baseURL) {
    config = { ...config, baseURL: API_URL };
  }
  const instanceRef = useRef(axios.create(config));

  useEffect(() => {
    if (interceptors) {
      interceptors(instanceRef.current);
    }
  }, []);

  return (
    <AxiosContext.Provider value={instanceRef.current}>
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosInstanceProvider;
