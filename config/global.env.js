const Servers = {
  Merchant: {
    BackEnd: {
      host: '192.1.17.24',
      port: '8080',
      http: 'http://',
      remoteAddr: function () {
        return this.http + this.host + (this.port ? ':' + this.port : '')
      }
    }
  }
}


module.exports = {
  Servers
}
