const jwt = require("jsonwebtoken");

const fakeUsers = [
  {
    id: 1,
    name: "User 1",
    username: "user1",
    password: "user1",
  },
  {
    id: 2,
    name: "User 2",
    username: "user2",
    password: "user2",
  },
  {
    id: 3,
    name: "User 3",
    username: "user3",
    password: "user3",
  },
];

module.exports = {
  authenticate: function (req, res, next) {
    const { username, password } = JSON.parse(req.query.params);
    const user = fakeUsers.find(
      (user) => user.username == username && user.password == password
    );
    if (user) {
      const token = jwt.sign({ id: user.id }, req.app.get("secretKey"), {
        expiresIn: "1h",
      });
      res.json({
        error: null,
        message: "El usuario ha sido autenticado",
        data: { user, token: token },
      });
    } else {
      res.status(401).send("Invalid username/password");
    }
  },
};
