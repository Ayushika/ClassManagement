/** @format */

import {
  COURSE_ADD_LESSON_FAIL,
  COURSE_ADD_LESSON_REQUEST,
  COURSE_ADD_LESSON_SUCCESS,
  COURSE_CREATE_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_GET_ALL_FAIL,
  COURSE_GET_ALL_REQUEST,
  COURSE_GET_ALL_SUCCESS,
  COURSE_GET_DETAILS_FAIL,
  COURSE_GET_DETAILS_REQUEST,
  COURSE_ADD_ANNOUNCEMENT_REQUEST,
  COURSE_ADD_ANNOUNCEMENT_FAIL,
  COURSE_ADD_ANNOUNCEMENT_SUCCESS,
  COURSE_GET_DETAILS_SUCCESS,
  DELETE_ANNOUNCEMENT_FAIL,
  DELETE_ANNOUNCEMENT_REQUEST,
  DELETE_ANNOUNCEMENT_SUCCESS,
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

export const getCourses = (value) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_GET_ALL_REQUEST });

    const { data } = await axios.post(
      `http://localhost:5000/api/${value}/course/get/all`,
      {},
      config,
    );

    dispatch({ type: COURSE_GET_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_GET_ALL_FAIL,
      payload: error.response,
    });
    toast.error("Error While Getting Courses ,Try Again");
  }
};

export const getCourseDetails = (slug, value) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_GET_DETAILS_REQUEST });

    const { data } = await axios.post(
      `http://localhost:5000/api/${value}/course/get`,
      { slug },
      config,
    );

    dispatch({ type: COURSE_GET_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_GET_DETAILS_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Getting Courses ,Try Again");
  }
};

export const addLesson = (slug, values) => async (dispatch) => {
  try {
    const { title, description, video } = values;

    dispatch({ type: COURSE_ADD_LESSON_REQUEST });

    const { data } = await axios.post(
      `http://localhost:5000/api/instructor/course/add-lesson`,
      { title, description, video, slug },
      config,
    );
    console.log(data);
    dispatch({ type: COURSE_ADD_LESSON_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: COURSE_ADD_LESSON_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Adding Lesson ,Try Again");
  }
};

export const addAnnouncement =
  (slug, announcementValues) => async (dispatch) => {
    try {
      const { description, file } = announcementValues;
      console.log("Desc", description);
      dispatch({ type: COURSE_ADD_ANNOUNCEMENT_REQUEST });

      const { data } = await axios.post(
        `http://localhost:5000/api/instructor/course/add-announcement`,
        { description, file, slug },
        config,
      );
      console.log(data);
      dispatch({ type: COURSE_ADD_ANNOUNCEMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: COURSE_ADD_ANNOUNCEMENT_FAIL,
        payload: error.response.data,
      });
      toast.error("Error While Adding Announcement ,Try Again");
    }
  };

export const deleteAnnouncement = (courseId, id) => async (dispatch) => {
  try {
    console.log("Course : ", courseId);
    dispatch({ type: DELETE_ANNOUNCEMENT_REQUEST });

    await axios.delete(
      `http://localhost:5000/api/instructor/course/delete-announcement`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { courseId: courseId, id: id },
      },
    );
    dispatch({ type: DELETE_ANNOUNCEMENT_SUCCESS });
    toast.success("Deleted ✔");
  } catch (error) {
    dispatch({
      type: DELETE_ANNOUNCEMENT_FAIL,
      payload: error.response.data,
    });
    toast.error("Error While Deleting Announcement ,Try Again");
  }
};
