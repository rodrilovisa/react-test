const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const posts = require("./routes/posts");
const photos = require("./routes/photos");
const detail = require("./routes/detail");
const users = require("./routes/users");
const bodyParser = require("body-parser");

// const mongoose = require("./config/database"); //Importando la configuracion de conexion a la BD
var jwt = require("jsonwebtoken");
const app = express();
app.set("secretKey", "ClaveSecreta"); // Clave Secreta para nuestro JWT

// Conectando a la base de datos de Mongo
// mongoose.connection.on(
//   "error",
//   console.error.bind(console, "Error de conexion en MongoDB")
// );
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas publicas
app.use("/users", users);
// Rutas privadas que solo pueden ser consumidas con un token generado
app.use("/posts", validateUser, posts);
app.use("/posts/:id", validateUser, detail);
app.use("/photos", validateUser, photos);
app.use("/photos/:id", validateUser, detail);

// Middleware para validar al usuario.
function validateUser(req, res, next) {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    function (err, decoded) {
      if (err) {
        console.log("err", err);
        res.status(401).send("Token Expired");
      } else {
        req.body.userId = decoded.id;
        next();
      }
    }
  );
}
// Manejando errores HTTP 404 para solicitudes de contenido inexistente
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// Manejo de errores, respuestas con codigo HTTP 500, HTTP 404
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Error interno en el servidor!!" });
});
app.listen(8000, function () {
  console.log("El servidor ha sido inicializado: http://localhost:8000");
});
