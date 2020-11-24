import { get } from "lodash";

export const loginResult = (state) => get(state, "login.response");
export const loginResultError = (state) => get(state, "login.error");
export const isLoginLoading = (state) => get(state, "login.isLoading");

export const isSearchPostsLoading = (state) =>
  get(state, "searchPosts.isLoading");
export const postsResults = (state) => get(state, "searchPosts.posts");
export const postsResultsError = (state) => get(state, "searchPosts.error");

export const isSearchPhotosLoading = (state) =>
  get(state, "searchPhotos.isLoading");
export const photosResults = (state) => get(state, "searchPhotos.photos");
export const photosResultsError = (state) => get(state, "searchPhotos.error");

export const isSearchDetailLoading = (state) =>
  get(state, "searchDetail.isLoading");
export const detailResults = (state) => get(state, "searchDetail.detail");
export const detailResultsError = (state) => get(state, "searchDetail.error");
