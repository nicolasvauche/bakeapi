exports.helloGet = (req, res) => {
  res.send(`Bonjour ${req.params.name}`)
}

exports.helloPost = (req, res) => {
  res.send(`Bonjour ${req.body.name}`)
}
