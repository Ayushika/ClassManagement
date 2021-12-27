import {
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_RESET,
  INSTRUCTOR_REGISTER_REQUEST,
  INSTRUCTOR_REGISTER_SUCCESS,
  INSTRUCTOR_REGISTER_FAIL,
} from "../constants/adminConstants";

export const uploadImageReducer = (state = { image: {} }, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { loading: true };
    case UPLOAD_IMAGE_SUCCESS:
      return { loading: false, image: action.payload };
    case UPLOAD_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    case UPLOAD_IMAGE_RESET:
      return { image: {} };
    default:
      return state;
  }
};

export const instructorRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case INSTRUCTOR_REGISTER_REQUEST:
      return { loading: true };
    case INSTRUCTOR_REGISTER_SUCCESS:
      return { loading: false, instructor: action.payload };
    case INSTRUCTOR_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
