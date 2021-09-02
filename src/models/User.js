const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      ref: "Role",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
