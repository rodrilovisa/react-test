import { all } from "redux-saga/effects";
import loginSaga from "./login";
import searchPosts from "./posts";
import searchPhotos from "./photos";
import searchDetail from "./detail";

export default function* rootSaga() {
  yield all([loginSaga(), searchPosts(), searchPhotos(), searchDetail()]);
}
