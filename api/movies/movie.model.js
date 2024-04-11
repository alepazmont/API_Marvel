const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true},
    poster: { type: String, trim: true, required: true },
    releaseYear: { type: Number, required: true },
    director: { type: String },
    characters: { type: Array },
    cast: { type: Array }, 
    description: { type: String },
    boxOfficeRevenue: { type: Number }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
