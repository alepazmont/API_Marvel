const Team = require("../teams/team.model");
// Se importa el modelo Team desde el archivo team.model.js.

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
// Se importa el objeto HTTPSTATUSCODE, que contiene códigos de estado HTTP, desde el archivo httpStatusCode.js.

const getTeam = async (req, res, next) => {
  try {
    // Se obtiene el ID proporcionado por el usuario en la solicitud.
    const id = req.params.id;
    // Se busca en la base de datos el pedido correspondiente al ID proporcionado y se popula el campo 'characters'.
    const team = await Team.findById(id).populate("characters");
    // Se responde con el pedido encontrado.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

const getTeams = async (req, res, next) => {
  try {
    // Se buscan todos los pedidos en la base de datos y se popula el campo 'characters'.
    const teams = await Team.find().populate("characters");
    // Se responde con la lista de pedidos encontrados.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: teams,
    });
  } catch (error) {
    next(error);
  }
};

const createTeam = async (req, res, next) => {
  try {
    // Se crea un nuevo pedido con los datos proporcionados por el usuario.
    const team = new Team(req.body);
    // Se guarda el nuevo pedido en la base de datos.
    await team.save();
    // Se responde confirmando la creación del pedido.
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

const updateTeam = async (req, res, next) => {
  try {
    // Se obtiene el ID del pedido que se va a modificar.
    const id = req.params.id;
    // Se recopilan los datos que el usuario desea modificar.
    const body = req.body;
    // Se actualiza el pedido en la base de datos con los nuevos datos proporcionados.
    const team = await Team.findByIdAndUpdate(id, body, { new: true });
    // Si el pedido no se encuentra, se responde con un código de estado 404.
    if (!team) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    // Se responde con el pedido modificado.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTeam = async (req, res, next) => {
  try {
    // Se obtiene el ID del pedido que se va a eliminar.
    const id = req.params.id;
    // Se elimina el pedido de la base de datos.
    const team = await Team.findByIdAndDelete(id);
    // Si el pedido no se encuentra, se responde con un mensaje de error personalizado.
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    // Se responde confirmando la eliminación del pedido.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: team,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTeam, getTeams, createTeam, updateTeam, deleteTeam };
// Se exportan las funciones definidas para su uso en otros archivos.
