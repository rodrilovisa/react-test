import {
  SEARCH_POSTS_START,
  SEARCH_PHOTOS_START,
  SEARCH_DETAIL_START,
} from "../../constants/actionTypes";

export const searchPosts = (payload) => ({
  type: SEARCH_POSTS_START,
  payload,
});

export const searchPhotos = (payload) => ({
  type: SEARCH_PHOTOS_START,
  payload,
});

export const searchDetail = (payload) => ({
  type: SEARCH_DETAIL_START,
  payload,
});
