const { Schema, model } = require("mongoose");

const creationSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

const Creation = model("Creation", creationSchema);

module.exports = Creation;