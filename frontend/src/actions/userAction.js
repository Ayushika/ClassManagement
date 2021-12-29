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
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const login = (email, password, history) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      "http://localhost:5000/api/user/login",
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    /* set data in localstorage without token */
    const setData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
    };

    window.localStorage.setItem("userInfo", JSON.stringify(setData));

    /* redirecting */
    if (data.role === "Admin") {
      history.push("/admin/dashboard");
    } else if (data.role === "Student") {
      history.push("/student/dashboard");
    } else if (data.role === "Instructor") {
      history.push("/instructor/dashboard");
    }
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data });
  }
};

export const verifyEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_EMAIL_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/api/user/verify-email",
      { email },
      config
    );
    dispatch({ type: USER_VERIFY_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: USER_VERIFY_EMAIL_FAIL, payload: error.response.data });
  }
};

export const forgotPassword = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/api/user/forgot-password",
      { email, password },
      config
    );
    dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: USER_FORGOT_PASSWORD_FAIL, payload: error.response.data });
  }
};

export const logout = (history) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5000/api/user/logout", {}, config);
    window.localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    history.push("/");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data);
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.post(
      `http://localhost:5000/api/user/${id}`,
      {},
      config
    );
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data });
    console.log(error);
    toast.error(error.response.data);
  }
};

export const updateUserProfile =
  (id, img, name, phone) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });

      const { data } = await axios.put(
        `http://localhost:5000/api/user/update-profile`,
        { img, name, phone },
        config
      );

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
      toast.success("Update Successfully");
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
