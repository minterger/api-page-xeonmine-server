const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const commentSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    post: {
      type: ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

module.export = model("Comment", commentSchema);
