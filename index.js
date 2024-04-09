// 1 IMPORTS > NPM; MÓDULOS PROPIOS

const express = require("express");
require("dotenv").config();
const userRouter = require("./api/user/user.routes")
const characterRouter = require("./api/characters/character.router");
const movieRouter = require("./api/movies/movie.router");
const abilityRouter = require("./api/abilities/ability.router");
const { connectMongo } = require("./utils/db");
const {
  notFoundHandler,
  errorHandler,
} = require("./api/middleware/error.middleware");

// 2 CONFIGURACIÓN

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

connectMongo();

// Ruta para servir archivos estáticos desde la carpeta 'img'
app.use('/img', express.static(path.join(__dirname, 'img')));

// 3  ENDPOINTS

app.get("/", (req, res) => {
  res.json({ message: "El servidor está funcionando" });
});

app.use("/user", userRouter); 
app.use("/characters", characterRouter);
app.use("/movies", movieRouter);
app.use("/abilities", abilityRouter);

// 4 MANEJO EXCEPCIONES / ERRORES

app.use(notFoundHandler);
app.use(errorHandler);

// 5 ACTIVAR

app.listen(PORT, () => {
  console.log(`El servidor se ha iniciado en el puerto ${PORT}`);
});
