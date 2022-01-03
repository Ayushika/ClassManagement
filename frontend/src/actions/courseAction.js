/** @format */

import {
  COURSE_CREATE_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
} from "../constants/courseConstants";
import axios from "axios";
import { toast } from "react-toastify";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const courseCreate = (values) => async (dispatch) => {
  try {
    const { title, description, image, institute, branch, section, year } =
      values;

    console.log("VALUES  : ", values);
    dispatch({ type: COURSE_CREATE_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/api/instructor/course/create",
      { title, description, image, institute, branch, section, year },
      config,
    );
    dispatch({ type: COURSE_CREATE_SUCCESS, payload: data });
    toast.success("Created Successfully");
  } catch (error) {
    console.log(error);
    dispatch({
      type: COURSE_CREATE_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Creating,Try Again");
  }
};
