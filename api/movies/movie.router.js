const express = require("express");
//EL ROUTER ES EL OBJETO QUE GUARDA TODAS LAS RUTAS.
const movieRouter = express.Router();
//INSTANCIAMOS AL CONTROLADOR PARA USAR LAS FUNCIONES RELATIVAS A CADA RUTA
const {
  getMovie,
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../movies/movie.controller");

const { isAuth } = require("../middleware/auth.middleware");

// LAS RUTAS
//nombreDelRouter.get('endpoint', <nombreDeLaFuncion>);

//OBTENER UNA CANCIÓN
movieRouter.get("/get/:id", getMovie);

//OBTENER TODAS LAS CANCIONES
movieRouter.get("/getAll", getMovies);

//CREAR UNA CANCIÓN
movieRouter.post("/create", [isAuth], createMovie);

//UPDATE
movieRouter.patch("/update/:id", [isAuth], updateMovie);

//DELETE
movieRouter.delete("/delete/:id", [isAuth], deleteMovie);

module.exports = movieRouter;
