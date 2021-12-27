import {
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  INSTRUCTOR_REGISTER_REQUEST,
  INSTRUCTOR_REGISTER_SUCCESS,
  INSTRUCTOR_REGISTER_FAIL,
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

export const upload = (item, file) => async (dispatch) => {
  Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
    try {
      dispatch({ type: UPLOAD_IMAGE_REQUEST });
      let { data } = await axios.post(
        `http://localhost:5000/api/admin/${item}/upload-image`,
        {
          image: uri,
        },
        config
      );
      dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: UPLOAD_IMAGE_FAIL, payload: error.response.data });
      toast.error("Image Upload Fail,Try Again");
    }
  });
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
