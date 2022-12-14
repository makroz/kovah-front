import React from "react";
import { Routes, Route } from "react-router-dom";
import AxiosInstanceProvider from "./contexts/AxiosInstanceProvider";
import axiosInterceptors from "./interceptors/axiosInterceptors";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AxiosInstanceProvider interceptors={axiosInterceptors}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AxiosInstanceProvider>
  );
}

export default App;
