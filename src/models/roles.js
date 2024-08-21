const mongoose = require('mongoose');

const { EMAIL_VALIDATION_SCHEMA } = require('../utils/validationSchemas');

const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Z]\w*/g,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (value) => EMAIL_VALIDATION_SCHEMA.isValidSync(value),
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
