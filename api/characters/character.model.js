const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    realName: { type: Array, trim: true },
    img: { type: String, required: true, trim: true },
    abilities: { type: Array, required: true, trim: true },
    description: { type: String },
    alias: { type: Array, trim: true }, // Alternate names or aliases
    team: { type: Array }, // Team affiliation, e.g., Avengers, X-Men, etc.
    appearances: { type: Array }, // First appearance of the character
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;