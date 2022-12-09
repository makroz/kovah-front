const axiosInterceptors = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const apiToken = localStorage.getItem("token");
      if (apiToken) {
        config.headers = { Authorization: "Bearer " + apiToken };
      }

      console.log("Request was sent");
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      console.log("Response was received");
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        window.location = "/login";
      }
      console.error("error error:", error);
      return Promise.reject(error);
    }
  );
};

export default axiosInterceptors;
