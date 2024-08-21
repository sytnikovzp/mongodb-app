const yup = require('yup');

module.exports.EMAIL_VALIDATION_SCHEMA = yup.string().email();

module.exports.PAGINATION_SCHEMA = yup.object.shape({
  limit: yup.number().min(1).max(100).required(),
  offset: yup.number().min(0).required(),
});
