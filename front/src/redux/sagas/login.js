import { put, call, takeLatest } from "redux-saga/effects";
import { apiCall } from "../api";

import {
  LOGIN_USER_START,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
} from "../../constants/actionTypes";

export function* loginSaga(payload) {
  try {
    const response = yield call(
      apiCall,
      "users/login",
      { params: payload.user },
      null,
      "POST"
    );
    yield put({
      type: LOGIN_USER_SUCCESS,
      response: response.data,
    });
  } catch (error) {
    yield put({
      type: LOGIN_USER_ERROR,
      error,
    });
  }
}

//WATCHERS
export default function* watchUserAuthentication() {
  yield takeLatest(LOGIN_USER_START, loginSaga);
}
