const api_helpers = require("./api_helper");
module.exports = {
  getPhotos: function (req, res, next) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.pageSize);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    api_helpers
      .make_API_call("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        const paginatedResponse = response.slice(startIndex, endIndex);
        results.photos = paginatedResponse;
        results.totalResults = response.length;
        results.totalPages = Math.ceil(response.length / limit);
        if (endIndex < response.length) {
          results.next = {
            page: page + 1,
            limit,
          };
        }
        res.json(results);
      })
      .catch((error) => {
        console.log("error", error);
        res.send(error);
      });
  },
};
