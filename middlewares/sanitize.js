const sanitizeHtml = require('sanitize-html')

const sanitize = (req, res, next) => {
  Object.keys(req.body).forEach(field => {
    if (typeof req.body[field] === 'string') {
      req.body[field] = sanitizeHtml(req.body[field])
    }
  })

  next()
}

module.exports = sanitize
