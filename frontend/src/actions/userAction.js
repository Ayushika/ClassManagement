/** @format */

import axios from "axios";
import { toast } from "react-toastify";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from "../constants/userConstants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = (email, password, history) => async (dispatch) => {
  try {
    console.log("Request");
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      config,
    );

    console.log(data);
    alert("Login Successfully");
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    toast.error(error.response.data);
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data });
  }
};
