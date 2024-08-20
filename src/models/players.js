const mongoose = require('mongoose');

const { Schema } = mongoose;

const playerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    address: {
      country: String,
      city: String,
      zipcode: Number,
    },
    brands: [String],
    roleId: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
