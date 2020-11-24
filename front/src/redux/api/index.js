import axios from "axios";

// const baseURL = "https://jsonplaceholder.typicode.com/";
const baseURL = "http://localhost:8000/";

export const apiCall = (url, data, headers, method) => {
  const token = localStorage.getItem("auth");
  let auth = {};
  if (url != "users/login") {
    auth = { "x-access-token": `${token}` };
  }
  return axios({
    method,
    url: baseURL + url,
    params: data,
    headers: {
      ...auth,
      ...headers,
    },
  });
};
