const auth = (req, res, next) => {
  const username = req.session?.username
  if (username) {
    return next()
  } else {
    return res.redirect('/login')
  }
}

module.exports = auth
