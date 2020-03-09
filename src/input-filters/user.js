const Joi = require('@hapi/joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
})
const disable_convert = { joi: { convert: false, abortEarly: false } }

exports.validate_user_input = validator.query({
}, { joi: { abortEarly: false } })
