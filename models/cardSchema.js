const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: String, required: true },
  image: String,
});

const Card = mongoose.model("Card", cardSchema);

cardSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = Card;
