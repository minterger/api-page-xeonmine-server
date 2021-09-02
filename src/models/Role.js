const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
});

module.exports = model("Role", roleSchema);
