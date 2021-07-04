const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  rank: { type: String, required: true },
  image: String,
});

cardSchema.plugin(AutoIncrement, { inc_field: "id" });

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
