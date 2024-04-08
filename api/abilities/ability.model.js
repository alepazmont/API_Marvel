const mongoose = require("mongoose");

const abilitySchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    type: { type: String }, // Type of ability (e.g., Physical, Energy-based, etc.)
    characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }] // Cast members (reference to Character model)
});

const Ability = mongoose.model("Ability", abilitySchema);

module.exports = Ability;