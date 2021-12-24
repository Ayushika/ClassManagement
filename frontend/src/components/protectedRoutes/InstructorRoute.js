/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import LoadingToRedirect from "../LoadingToRedirect";
import { Route } from "react-router-dom";

const InstructorRoute = ({ children, ...rest }) => {
  const [ok, setOk] = useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const isValidInstructor = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/instructor/isvalid",
        {},
        config
      );
      if (data.success === true) setOk(true);
    } catch (error) {
      console.log(error.message);
      setOk(false);
    }
  };

  useEffect(() => {
    isValidInstructor();
    // eslint-disable-next-line
  }, []);

  return ok ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default InstructorRoute;
