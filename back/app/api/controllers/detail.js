const api_helper = require("./api_helper");
module.exports = {
  getDetail: function (req, res, next) {
    const url = req.query.url;
    api_helper
      .make_API_call(`https://jsonplaceholder.typicode.com/${url}`)
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        console.log("error", error);
        res.send(error);
      });
  },
};
