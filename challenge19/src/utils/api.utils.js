const successResponse = data => {
  return {
    success: true,
    data
  }
}

const errorResponse = message => {
  return {
    success: false,
    error: message
  }
}

class HttpError {
  constructor(status, message) {
    this.status = status
    this.message = message
  }
}

module.exports = { successResponse, errorResponse, HttpError }
