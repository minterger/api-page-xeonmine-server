const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const postSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
