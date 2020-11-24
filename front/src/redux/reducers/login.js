import {
  LOGIN_USER_START,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
} from "../../constants/actionTypes";

const initialState = {};

export default function (state = initialState, action) {
  const response = action.response;
  switch (action.type) {
    case LOGIN_USER_START:
      return { ...state, isLoading: true, response: null, error: null };
      brake;
    case LOGIN_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        response: null,
        error: action.error.response,
      };
      brake;
    }
    case LOGIN_USER_SUCCESS:
      return { ...state, isLoading: false, response, error: null };
      brake;
    default:
      return state;
  }
}
