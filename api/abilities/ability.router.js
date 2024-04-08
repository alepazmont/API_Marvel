const express = require("express")//EL ROUTER ES EL OBJETO QUE GUARDA TODAS LAS RUTAS.
const abilityRouter = express.Router();
//INSTANCIAMOS AL CONTROLADOR PARA USAR LAS FUNCIONES RELATIVAS A CADA RUTA
const {
  getAbility,
  getAbilities,
  createAbilities,
  updateAbility,
  deleteAbility,
} = require("../abilities/ability.controller");

const { isAuth } = require("../middleware/auth.middleware");

// LAS RUTAS
//nombreDelRouter.get('endpoint', <nombreDeLaFuncion>);

//OBTENER UNA CANCIÓN
abilityRouter.get("/get/:id", getAbility);

//OBTENER TODAS LAS CANCIONES
abilityRouter.get("/getAll", getAbilities);

//CREAR UNA CANCIÓN
abilityRouter.post("/create", [isAuth], createAbilities);

//UPDATE
abilityRouter.patch("/update", [isAuth], updateAbility);

//DELETE
abilityRouter.delete("/delete", [isAuth], deleteAbility);

module.exports = abilityRouter;
