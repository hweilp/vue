var merge = require('webpack-merge')
var proEnv = require('./prod.env')

//测试环境固定

module.exports = merge(proEnv, {
  MERCHANT_SERVER_ADDR: '"http://t-gs-adm-api.cngtxy.net"',
  IMAGE_SERVER_ADDR: '"http://t-img.cngtxy.net"',
})
