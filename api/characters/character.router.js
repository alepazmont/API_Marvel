const express = require("express");
const characterRouter = express.Router();
const {
    create,
    getOne,
    getAll,
    getOneByName,
    updateOne,
    deleteOne
} = require("./character.controller");
const { isAuth } = require("../middleware/auth.middleware");

// Rutas
characterRouter.post("/", [isAuth], create);
characterRouter.get("/:id", getOne); // Ruta para obtener un personaje por su ID
characterRouter.get("/", getAll); // Ruta para obtener todos los personajes
characterRouter.get("/search", getOneByName); // Ruta para buscar personajes por nombre
characterRouter.patch("/:id", [isAuth], updateOne); // Ruta para actualizar un personaje por su ID
characterRouter.delete("/:id", [isAuth], deleteOne); // Ruta para eliminar un personaje por su ID

module.exports = characterRouter;
