import {
  SEARCH_PHOTOS_START,
  SEARCH_PHOTOS_ERROR,
  SEARCH_PHOTOS_COMPLETE,
} from "../../constants/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_PHOTOS_START:
      return { ...state, isLoading: true, photos: null, error: null };
      brake;
    case SEARCH_PHOTOS_ERROR:
      return {
        ...state,
        isLoading: false,
        photos: null,
        error: action.error.response,
      };
      brake;
    case SEARCH_PHOTOS_COMPLETE:
      return {
        ...state,
        isLoading: false,
        photos: action.results.data,
        error: null,
      };
      brake;
    default:
      return { ...state };
  }
}
