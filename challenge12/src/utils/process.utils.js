const getProcessInfo = () => {
  const processInfo = {}

  processInfo.args = process.argv
  processInfo.os = process.platform
  processInfo.version = process.version
  processInfo.rss = process.memoryUsage.rss()
  processInfo.execPath = process.execPath
  processInfo.id = process.pid
  processInfo.dir = process.cwd()

  return processInfo
}

module.exports = {
  getProcessInfo
}
