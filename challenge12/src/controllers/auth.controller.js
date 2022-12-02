class AuthController {
  async register(req, res, next) {
    res.redirect('/')
  }

  async login(req, res, next) {
    res.redirect('/')
  }
}

module.exports = new AuthController()
