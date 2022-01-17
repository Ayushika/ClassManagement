/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import LoadingToRedirect from "../LoadingToRedirect";
import { Route } from "react-router-dom";

const UserRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const isValidUser = async () => {
    try {
      const { data } = await axios.post("/api/user/isvalid", {}, config);
      if (data.success === true) setOk(true);
    } catch (error) {
      console.log(error.message);
      setOk(false);
    }
  };

  useEffect(() => {
    isValidUser();
    // eslint-disable-next-line
  }, []);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
