const dotenv = require('dotenv')
const yargs = require('yargs')

dotenv.config()

const args = yargs(process.argv.slice(2))
  .default({
    port: 8080,
    mode: 'fork'
  })
  .alias({
    p: 'port',
    m: 'mode'
  }).argv

const config = {
  PORT: args.port,
  MODE: args.mode,
  MONGO_URI: process.env.MONGO_URI
}

module.exports = config
