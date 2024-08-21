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
      min: 8,
    },
    rate: {
      type: Number,
      min: 0,
      max: 100,
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
