/** @format */

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userVerifyEmailReducer,
  userForgotPasswordReducer,
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
  uploadImageReducer,
  instructorRegisterReducer,
  studentRegisterReducer,
  instructorDisplayReducer,
  studentDisplayReducer,
} from "./reducers/adminReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userVerifyEmail: userVerifyEmailReducer,
  userForgotPassword: userForgotPasswordReducer,
  createInstitute: createInstituteReducer,
  getAllInstitute: getAllInstituteReducer,
  deleteInstitute: deleteInstituteReducer,
  createBranch: createBranchReducer,
  getAllBranch: getAllBranchReducer,
  deleteBranch: deleteBranchReducer,
  createBatch: createBatchReducer,
  deleteBatch: deleteBatchReducer,
  getAllBatch: getAllBatchReducer,
  uploadImage: uploadImageReducer,
  instructorRegister: instructorRegisterReducer,
  studentRegister: studentRegisterReducer,
  instructorDisplay: instructorDisplayReducer,
  studentDisplay: studentDisplayReducer,
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
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
