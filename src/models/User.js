const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    roles: [
      {
        type: ObjectId,
        ref: "Role",
      },
    ],
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
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
