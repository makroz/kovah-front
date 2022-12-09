import useAxios from "../hooks/useAxios";
import { useState, useEffect } from "react";

const useAuth = () => {
  const { data, error, loaded, execute } = useAxios();
  const [user, setUser] = useState(null);

  const getUser = () => {
    const user = localStorage.getItem("token");
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  const login = async (credentials) => {
    setUser(null);

    const { data, error } = await execute("/login", "POST", credentials);

    if (data.status === "ok") {
      console.log("Loguedo", data);
      setUser(data.data.token);
      localStorage.setItem("token", data.data.token);
      return { user: data.data.token };
    } else {
      console.log("====================================");
      console.log("Error1", data);
      console.log("====================================");
      return { user, errors: data.errors };
    }
  };
  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    const { data, error } = await execute("/logout", "POST");

    if (data.status === "ok") {
      console.log("Logout", data);
      return;
    } else {
      console.log("====================================");
      console.log("Error1", data);
      console.log("====================================");
      return { user, errors: data.errors };
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user, error, loaded, login, logout };
};

export default useAuth;
