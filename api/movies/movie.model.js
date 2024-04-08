const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, unique: true },
    poster: { type: String, trim: true },
    releaseYear: { type: Number, required: true },
    director: { type: String },
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }], // Cast members (reference to Character model)
    description: { type: String },
    boxOfficeRevenue: { type: Number },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
