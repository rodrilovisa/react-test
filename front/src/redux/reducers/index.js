import { combineReducers } from "redux";
import login from "./login";

import searchPosts from "./posts";
import searchPhotos from "./photos";
import searchDetail from "./detail";

const rootReducer = combineReducers({
  login,
  searchPosts,
  searchPhotos,
  searchDetail,
});

export default rootReducer;
