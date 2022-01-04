/** @format */

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userVerifyEmailReducer,
  userForgotPasswordReducer,
  userDetailsReducer,
  userUpdateReducer,
  uploadImageReducer,
} from "./reducers/userReducer";
import {
  createInstituteReducer,
  getAllInstituteReducer,
  deleteInstituteReducer,
} from "./reducers/instituteReducer";
import {
  createBranchReducer,
  deleteBranchReducer,
  getAllBranchReducer,
} from "./reducers/branchReducer";
import {
  createBatchReducer,
  deleteBatchReducer,
  getAllBatchReducer,
} from "./reducers/batchReducer";
import {
  instructorRegisterReducer,
  studentRegisterReducer,
  instructorDisplayReducer,
  studentDisplayReducer,
} from "./reducers/adminReducer";
import {
  courseCreateReducer,
  courseGetReducer,
  courseAddLessonReducer,
} from "./reducers/courseReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userVerifyEmail: userVerifyEmailReducer,
  userForgotPassword: userForgotPasswordReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  uploadImage: uploadImageReducer,
  createInstitute: createInstituteReducer,
  getAllInstitute: getAllInstituteReducer,
  deleteInstitute: deleteInstituteReducer,
  createBranch: createBranchReducer,
  getAllBranch: getAllBranchReducer,
  deleteBranch: deleteBranchReducer,
  createBatch: createBatchReducer,
  deleteBatch: deleteBatchReducer,
  getAllBatch: getAllBatchReducer,
  instructorRegister: instructorRegisterReducer,
  studentRegister: studentRegisterReducer,
  instructorDisplay: instructorDisplayReducer,
  studentDisplay: studentDisplayReducer,
  courseCreate: courseCreateReducer,
  courseGet: courseGetReducer,
  courseAddLesson: courseAddLessonReducer,
});

const userInfoFromStorage = window.localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
