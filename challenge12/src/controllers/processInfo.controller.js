const { HTTP_STATUS } = require('../constants/api.constants')
const { successResponse } = require('../utils/api.utils')
const { getProcessInfo } = require('../utils/process.utils')

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
