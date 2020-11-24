import {
  SEARCH_POSTS_START,
  SEARCH_POSTS_ERROR,
  SEARCH_POSTS_COMPLETE,
} from "../../constants/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_POSTS_START:
      return { ...state, isLoading: true, error: null };
      brake;
    case SEARCH_POSTS_ERROR:
      return {
        ...state,
        isLoading: false,
        posts: null,
        error: action.error.response,
      };
      brake;
    case SEARCH_POSTS_COMPLETE:
      return {
        ...state,
        isLoading: false,
        posts: action.results.data,
        error: null,
      };
      brake;
    default:
      return { ...state };
  }
}
