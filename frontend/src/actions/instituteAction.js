/** @format */

import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_INSTITUTE_FAIL,
  CREATE_INSTITUTE_REQUEST,
  CREATE_INSTITUTE_SUCCESS,
  DELETE_INSTITUTE_FAIL,
  DELETE_INSTITUTE_REQUEST,
  DELETE_INSTITUTE_SUCCESS,
  GET_ALL_INSTITUTE_FAIL,
  GET_ALL_INSTITUTE_REQUEST,
  GET_ALL_INSTITUTE_SUCCESS,
} from "../constants/instituteConstants";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const createInstitute = (name) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_INSTITUTE_REQUEST });

    const { data } = await axios.post(
      "http://localhost:5000/api/admin/institute",
      { name },
      config,
    );

    dispatch({ type: CREATE_INSTITUTE_SUCCESS, payload: data });
    toast.success(`${name} created successfully`);
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: CREATE_INSTITUTE_FAIL, payload: error.response.data });
  }
};

export const getAllInstitute = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_INSTITUTE_REQUEST });

    const { data } = await axios.post(
      "http://localhost:5000/api/admin/institute/all",
      {},
      config,
    );

    dispatch({ type: GET_ALL_INSTITUTE_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: GET_ALL_INSTITUTE_FAIL, payload: error.response.data });
  }
};

export const deleteInstitute = (slug) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_INSTITUTE_REQUEST });
    
    const { data } = await axios.delete(
      `http://localhost:5000/api/admin/institute/${slug}`,
      config,
    );

    dispatch({ type: DELETE_INSTITUTE_SUCCESS });
    toast.success("Deleted Successfully");
  } catch (error) {
    toast.error(error.response.data);
    dispatch({ type: DELETE_INSTITUTE_FAIL, payload: error.response.data });
  }
};
