import { put, call, takeLatest } from "redux-saga/effects";
import {
  SEARCH_POSTS_START,
  SEARCH_POSTS_ERROR,
  SEARCH_POSTS_COMPLETE,
} from "../../constants/actionTypes";

import { apiCall } from "../api";

export function* searchPosts({ payload }) {
  try {
    const results = yield call(apiCall, "posts", null, null, "GET");
    yield put({ type: SEARCH_POSTS_COMPLETE, results });
  } catch (error) {
    yield put({ type: SEARCH_POSTS_ERROR, error });
  }
}
// Watchers
export default function* search() {
  yield takeLatest(SEARCH_POSTS_START, searchPosts);
}
