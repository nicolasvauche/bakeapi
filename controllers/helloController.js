exports.helloGet = (req, res) => {
  res.json({ message: `Bonjour ${req.params.name} !` })
}

exports.helloPost = (req, res) => {
  res.json({ message: `Bonjour ${req.body.name} !` })
}
