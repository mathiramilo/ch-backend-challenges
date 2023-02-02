const { successResponse } = require('../utils/api.utils')
const { getProcessInfo } = require('../services/process.services')

class ProcessInfoController {
  getProcessInfo(req, res, next) {
    try {
      const processInfo = getProcessInfo()
      const response = successResponse(processInfo)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new ProcessInfoController()
