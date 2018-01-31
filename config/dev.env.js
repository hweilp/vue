var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MERCHANT_SERVER_ADDR: '"http://192.1.17.77:8099"',
  // MERCHANT_SERVER_ADDR: '"http://192.1.17.24:8080"',
  // IMAGE_SERVER_ADDR: '""',
})
