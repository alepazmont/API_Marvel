const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    universe: { type: String, default: "Marvel" }, // Universe of the team
    headquarters: { type: String }, // Headquarters location
    leader: { type: String }, // Leader of the team
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }], // Members of the team (reference to Character model)
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;