/** @format */

import {
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  INSTRUCTOR_REGISTER_REQUEST,
  INSTRUCTOR_REGISTER_SUCCESS,
  INSTRUCTOR_REGISTER_FAIL,
  STUDENT_REGISTER_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
} from "../constants/adminConstants";

import Resizer from "react-image-file-resizer";
import axios from "axios";
import { toast } from "react-toastify";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const upload = (file) => async (dispatch) => {
  if (file) {
    Resizer.imageFileResizer(
      file,
      720,
      720,
      "JPEG",
      100,
      0,
      (uri) => {
        dispatch({ type: UPLOAD_IMAGE_REQUEST });
        axios
          .post(
            `http://localhost:5000/api/admin/upload-image`,
            { image: uri },
            config
          )
          .then((res) => {
            dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: res.data });
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: UPLOAD_IMAGE_FAIL,
              payload: error.response.data,
            });
            toast.error("Image Upload Fail,Try Again");
          });
      },
      "base64"
    );
  }
};

export const registerInstructor = (values, image) => async (dispatch) => {
  try {
    const { email, name, phone } = values;
    dispatch({ type: INSTRUCTOR_REGISTER_REQUEST });
    let { data } = await axios.post(
      `http://localhost:5000/api/admin/instructor/register`,
      { name, image, phone, email },
      config
    );
    dispatch({ type: INSTRUCTOR_REGISTER_SUCCESS, payload: data });
    toast.success("Register Successfully");
  } catch (error) {
    console.log(error);
    dispatch({
      type: INSTRUCTOR_REGISTER_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Creating,Try Again");
  }
};

export const registerStudent = (values) => async (dispatch) => {
  try {
    const { email, name, phone, image, institute, branch, section, year } =
      values;
    dispatch({ type: STUDENT_REGISTER_REQUEST });
    let { data } = await axios.post(
      `http://localhost:5000/api/admin/student/register`,
      { name, image, phone, email, institute, branch, section, year },
      config
    );
    dispatch({ type: STUDENT_REGISTER_SUCCESS, payload: data });
    toast.success("Register Successfully");
  } catch (error) {
    console.log(error);
    dispatch({
      type: STUDENT_REGISTER_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Creating,Try Again");
  }
};
