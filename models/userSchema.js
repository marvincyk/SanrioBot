const mongoose = require("mongoose");
const Card = require("./cardSchema");

const userSchema = new mongoose.Schema({
  userID: { type: String, require: true, unique: true },
  serverID: { type: String, require: true },
  coins: { type: Number, default: 1000 },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: Card }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
