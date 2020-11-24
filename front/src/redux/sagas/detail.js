import { put, call, takeLatest } from "redux-saga/effects";
import {
  SEARCH_DETAIL_START,
  SEARCH_DETAIL_ERROR,
  SEARCH_DETAIL_COMPLETE,
} from "../../constants/actionTypes";

import { apiCall } from "../api";

export function* searchDetail({ payload }) {
  try {
    const results = yield call(apiCall, payload.url, payload, null, "GET");
    yield put({ type: SEARCH_DETAIL_COMPLETE, results });
  } catch (error) {
    yield put({ type: SEARCH_DETAIL_ERROR, error });
  }
}
// Watchers
export default function* search() {
  yield takeLatest(SEARCH_DETAIL_START, searchDetail);
}
