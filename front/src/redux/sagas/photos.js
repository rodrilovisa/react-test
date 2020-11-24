import { put, call, takeLatest } from "redux-saga/effects";
import {
  SEARCH_PHOTOS_START,
  SEARCH_PHOTOS_ERROR,
  SEARCH_PHOTOS_COMPLETE,
} from "../../constants/actionTypes";

import { apiCall } from "../api";

export function* searchPhotos({ payload }) {
  try {
    const results = yield call(apiCall, "photos", payload, null, "GET");
    yield put({ type: SEARCH_PHOTOS_COMPLETE, results });
  } catch (error) {
    yield put({ type: SEARCH_PHOTOS_ERROR, error });
  }
}
// Watchers
export default function* search() {
  yield takeLatest(SEARCH_PHOTOS_START, searchPhotos);
}
