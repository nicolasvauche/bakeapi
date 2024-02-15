exports.index = (req, res) => {
  res.json({ message: 'Bienvenue sur votre API !' })
}

exports.contact = (req, res) => {
  res.json({ message: 'Contactez-nous' })
}
