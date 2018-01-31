var merge = require('webpack-merge')
var proEnv = require('./prod.env')

//本地环境固定

module.exports = merge(proEnv, {
  MERCHANT_SERVER_ADDR: '"http://192.1.17.24:8080"',
  IMAGE_SERVER_ADDR: '"http://192.1.17.24:8083"',
})
