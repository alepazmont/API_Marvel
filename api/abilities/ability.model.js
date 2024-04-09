const mongoose = require("mongoose");

const abilitySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true },
    type: { type: String, required: true }, 
    characters: { type: Array, required: true }
});

const Ability = mongoose.model("Ability", abilitySchema);

module.exports = Ability;