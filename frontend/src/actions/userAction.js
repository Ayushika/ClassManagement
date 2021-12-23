/** @format */

import axios from "axios";
import { toast } from "react-toastify";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_VERIFY_EMAIL_FAIL,
  USER_VERIFY_EMAIL_REQUEST,
  USER_VERIFY_EMAIL_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
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
      config
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

export const verifyEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_EMAIL_REQUEST });
    const { data } = await axios.post(
      "/api/user/verify-email",
      { email },
      config
    );
    dispatch({ type: USER_VERIFY_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    toast.error(error.response.data);
    dispatch({ type: USER_VERIFY_EMAIL_FAIL, payload: error.response.data });
  }
};

export const forgotPassword = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post(
      "/api/user/forgot-password",
      { email, password },
      config
    );
    dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    toast.error(error.response.data);
    dispatch({ type: USER_FORGOT_PASSWORD_FAIL, payload: error.response.data });
  }
};
