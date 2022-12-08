import axios from "axios";
import { useState, useContext, useMemo, useRef, useEffect } from "react";
import { AxiosContext } from "../contexts/AxiosInstanceProvider";

const useAxios = (url = null, method = "GET", payload = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const contextInstance = useContext(AxiosContext);
  const instance = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const execute = async (url = url, method = method, payload = payload) => {
    setLoaded(false);
    let data = null;
    try {
      const response = await instance.request({
        signal: controllerRef.current.signal,
        data: payload,
        method,
        url,
      });

      setData(response.data);
      data = response.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoaded(true);
    }
    return { data, error, loaded };
  };

  useEffect(() => {
    if (url) {
      execute(url, method, payload);
    } else {
      setData([]);
      setLoaded(true);
    }
  }, []);

  return { cancel, data, error, loaded, execute };
};

export default useAxios;
