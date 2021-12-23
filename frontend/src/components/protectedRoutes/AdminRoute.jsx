/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
// import LoadingToRedirect from "../LoadingToRedirect";
import { Route } from "react-router-dom";

const AdminRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const isValidAdmin = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/admin/isValid",
        {},
        config,
      );
      if (data.success === true) setOk(true);
    } catch (error) {
      console.log(error.message);
      setOk(false);
    }
  };

  useEffect(() => {
    isValidAdmin();
  }, []);

  return ok ? <Route {...rest} /> : "Loading...";
};

export default AdminRoute;
