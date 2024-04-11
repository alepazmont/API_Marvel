const Movie = require("../movies/movie.model");
const Character = require("../characters/character.model");
// Se importa el modelo Movie desde el archivo movie.model.js.

const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
// Se importa el objeto HTTPSTATUSCODE, que contiene códigos de estado HTTP, desde el archivo httpStatusCode.js.

const getMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id; // Obtener el ID de la película de la solicitud

    // Consultar la base de datos para obtener los datos de la película
    const movie = await Movie.findById(movieId).lean();

    // Si la película no se encuentra, devolver un mensaje de error
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Para cada entrada de personaje en el array characters, obtener los detalles del personaje correspondiente
    const charactersPromises = movie.characters.map(async (character) => {
      const characterDetails = await Character.findById(character._id).lean();
      return {
        _id: character._id,
        name: characterDetails.name // Obtener el nombre del personaje de la consulta a la base de datos
      };
    });

    // Esperar a que todas las consultas de personajes se completen
    const characters = await Promise.all(charactersPromises);

    // Actualizar el array de personajes en el objeto de la película con los detalles completos
    movie.characters = characters;

    // Devolver la película con los detalles de los personajes
    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
};



const getMovies = async (req, res, next) => {
  try {
    // Se buscan todos los pedidos en la base de datos y se popula el campo 'character'.
    const movies = await Movie.find().populate("characters");
    // Se responde con la lista de pedidos encontrados.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: movies,
    });
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    let moviesData = req.body;

    // Si el cuerpo de la solicitud no es un array, lo convertimos en un array con un solo elemento
    if (!Array.isArray(moviesData)) {
      moviesData = [moviesData];
    }

    // Creamos un array para almacenar las películas creadas
    const createdMovies = [];

    // Iteramos sobre cada objeto de película en el array
    for (const movieData of moviesData) {
      // Creamos una nueva instancia de la película con los datos proporcionados
      const movie = new Movie(movieData);
      // Guardamos la película en la base de datos
      await movie.save();
      // Añadimos la película creada al array de películas creadas
      createdMovies.push(movie);
    }

    // Respondemos con un código de estado 201 y el array de películas creadas
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: createdMovies,
    });
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    // Se obtiene el ID del pedido que se va a modificar.
    const id = req.params.id;
    // Se recopilan los datos que el usuario desea modificar.
    const body = req.body;
    // Se actualiza el pedido en la base de datos con los nuevos datos proporcionados.
    const movie = await Movie.findByIdAndUpdate(id, body, { new: true });
    // Si el pedido no se encuentra, se responde con un código de estado 404.
    if (!movie) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    // Se responde con el pedido modificado.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    // Se obtiene el ID del pedido que se va a eliminar.
    const id = req.params.id;
    // Se elimina el pedido de la base de datos.
    const movie = await Movie.findByIdAndDelete(id);
    // Si el pedido no se encuentra, se responde con un mensaje de error personalizado.
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    // Se responde confirmando la eliminación del pedido.
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMovie, getMovies, createMovie, updateMovie, deleteMovie };
// Se exportan las funciones definidas para su uso en otros archivos.
