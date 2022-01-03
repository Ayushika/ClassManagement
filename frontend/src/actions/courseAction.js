/** @format */

import {
  COURSE_CREATE_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_GET_FAIL,
  COURSE_GET_REQUEST,
  COURSE_GET_SUCCESS,
} from "../constants/courseConstants";
import { toast } from "react-toastify";
import axios from "axios";

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

    dispatch({ type: COURSE_CREATE_REQUEST });

    const { data } = await axios.post(
      "http://localhost:5000/api/instructor/course/create",
      { title, description, image, institute, branch, section, year },
      config,
    );

    dispatch({ type: COURSE_CREATE_SUCCESS, payload: data });
    toast.success("Created Successfully");
  } catch (error) {
    dispatch({
      type: COURSE_CREATE_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Creating,Try Again");
  }
};

export const getCoursesByInstructor = () => async (dispatch) => {
  try {
    dispatch({ type: COURSE_GET_REQUEST });

    const { data } = await axios.post(
      "http://localhost:5000/api/instructor/course/get",
      {},
      config,
    );

    dispatch({ type: COURSE_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_GET_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Getting Courses ,Try Again");
  }
};
