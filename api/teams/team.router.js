const express = require("express");
//EL ROUTER ES EL OBJETO QUE GUARDA TODAS LAS RUTAS.
const teamRouter = express.Router();
//INSTANCIAMOS AL CONTROLADOR PARA USAR LAS FUNCIONES RELATIVAS A CADA RUTA
const {
  getTeam,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} = require("../teams/team.controller");

const { isAuth } = require("../middlewares/auth.middleware");

// LAS RUTAS
//nombreDelRouter.get('endpoint', <nombreDeLaFuncion>);

//OBTENER UNA CANCIÓN
teamRouter.get("/get", getTeam);

//OBTENER TODAS LAS CANCIONES
teamRouter.get("/getAll", getTeams);

//CREAR UNA CANCIÓN
teamRouter.post("/create", [isAuth], createTeam);

//UPDATE
teamRouter.patch("/update", [isAuth], updateTeam);

//DELETE
teamRouter.delete("/delete", [isAuth], deleteTeam);

module.exports = teamRouter;
