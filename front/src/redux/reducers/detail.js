import {
  SEARCH_DETAIL_START,
  SEARCH_DETAIL_COMPLETE,
  SEARCH_DETAIL_ERROR,
} from "../../constants/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_DETAIL_START:
      return { ...state, isLoading: true, detail: null, error: null };
      brake;
    case SEARCH_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        detail: null,
        error: action.error.response,
      };
      brake;
    case SEARCH_DETAIL_COMPLETE:
      return {
        ...state,
        isLoading: false,
        detail: action.results.data,
        error: null,
      };
      brake;
    default:
      return { ...state };
  }
}
