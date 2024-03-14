const { body, validationResult } = require('express-validator')

const rules = [
  body('email')
    .if(body('email').exists())
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .if(body('password').exists())
    .isLength({ min: 4 })
    .withMessage('Password must be at least 4 characters long'),
  body('name')
    .if(body('name').exists())
    .notEmpty()
    .withMessage('Name must not be empty')
]

const resultCheck = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const validateFields = [...rules, resultCheck]

module.exports = validateFields
