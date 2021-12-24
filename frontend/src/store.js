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

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userVerifyEmail: userVerifyEmailReducer,
  userForgotPassword: userForgotPasswordReducer,
  createInstitute: createInstituteReducer,
  getAllInstitute: getAllInstituteReducer,
  deleteInstitute: deleteInstituteReducer,
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
