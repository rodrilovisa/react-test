const api_helper = require("./api_helper");
module.exports = {
  getPosts: function (req, res, next) {
    api_helper
      .make_API_call("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        console.log("error", error);
        res.send(error);
      });
  },
};
