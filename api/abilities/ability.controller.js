const Ability = require("../abilities/ability.model");
// Se importa el modelo Ability desde el archivo ability.model.js.

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
// Se importa el objeto HTTPSTATUSCODE, que contiene códigos de estado HTTP, desde el archivo httpStatusCode.js.

const getAbility = async (req, res, next) => {
  try {
    // Se obtiene el ID proporcionado por el usuario en la solicitud.
    const id = req.params.id;
    // Se busca en la base de datos el pedido correspondiente al ID proporcionado y se popula el campo 'characters'.
    const ability = await Ability.findById(id).populate("characters");
    // Se responde con el pedido encontrado.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: ability,
    });
  } catch (error) {
    next(error);
  }
};

const getAbilities = async (req, res, next) => {
  try {
    // Se buscan todos los pedidos en la base de datos y se popula el campo 'characters'.
    const abilities = await Ability.find().populate("characters");
    // Se responde con la lista de pedidos encontrados.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: abilities,
    });
  } catch (error) {
    next(error);
  }
};

const createAbilities = async (req, res, next) => {
  try {
    // Array de habilidades que deseas guardar en la base de datos
    const abilities = req.body;

    // Iterar sobre el array de habilidades
    for (let i = 0; i < abilities.length; i++) {
      const abilityData = abilities[i];
      
      // Verificar si se proporciona una lista de personajes
      if (abilityData.characters) {
        // Convertir la lista de personajes a un array de IDs
        const characterList = await convertToCharacterIds(abilityData.characters);
        abilityData.characters = characterList;
      }

      // Crear una nueva instancia de Ability con los datos de la habilidad actual
      const ability = new Ability(abilityData);
      
      // Guardar la habilidad en la base de datos
      await ability.save();
    }

    // Responder con un mensaje de éxito
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: abilities,
    });
  } catch (error) {
    next(error);
  }
};

// Función para convertir una lista de nombres de personajes a una lista de IDs de personajes
async function convertToCharacterIds(characterNames) {
  const characterIds = [];
  // Iterar sobre la lista de nombres de personajes
  for (let i = 0; i < characterNames.length; i++) {
    const characterName = characterNames[i];
    // Buscar el personaje en la base de datos por su nombre
    const character = await Character.findOne({ name: characterName });
    // Si se encuentra el personaje, agregar su ID a la lista de IDs
    if (character) {
      characterIds.push(character._id);
    } else {
      // Si no se encuentra el personaje, crearlo y agregar su ID a la lista de IDs
      const newCharacter = new Character({ name: characterName });
      await newCharacter.save();
      characterIds.push(newCharacter._id);
    }
  }
  return characterIds;
}


const updateAbility = async (req, res, next) => {
  try {
    // Se obtiene el ID del pedido que se va a modificar.
    const id = req.params.id;
    // Se recopilan los datos que el usuario desea modificar.
    const body = req.body;
    // Se actualiza el pedido en la base de datos con los nuevos datos proporcionados.
    const ability = await Ability.findByIdAndUpdate(id, body, { new: true });
    // Si el pedido no se encuentra, se responde con un código de estado 404.
    if (!ability) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    // Se responde con el pedido modificado.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: ability,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAbility = async (req, res, next) => {
  try {
    // Se obtiene el ID del pedido que se va a eliminar.
    const id = req.params.id;
    // Se elimina el pedido de la base de datos.
    const ability = await Ability.findByIdAndDelete(id);
    // Si el pedido no se encuentra, se responde con un mensaje de error personalizado.
    if (!ability) {
      return res.status(404).json({ message: "Ability not found" });
    }
    // Se responde confirmando la eliminación del pedido.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: ability,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAbility, getAbilities, createAbilities, updateAbility, deleteAbility };